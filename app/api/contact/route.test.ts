// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: sendMock } };
  }),
}));

// Importado depois do mock (o mock do vi.mock é hoisted, então a ordem no
// arquivo não importa, mas o import só é resolvido aqui).
import { POST } from './route';

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('descarta silenciosamente quando o honeypot (campo "website") está preenchido', async () => {
    const res = await POST(
      makeRequest({ name: 'Bot', email: 'bot@spam.com', message: 'oi', website: 'http://spam.com' })
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('retorna 400 quando faltam campos obrigatórios', async () => {
    const res = await POST(makeRequest({ name: 'Juan', email: '', message: 'Olá' }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('envia o e-mail via Resend e retorna sucesso com dados válidos', async () => {
    sendMock.mockResolvedValueOnce({ data: { id: 'email-123' }, error: null });

    const res = await POST(
      makeRequest({ name: 'Juan', email: 'juan@example.com', message: 'Quero um orçamento' })
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true, id: 'email-123' });
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        replyTo: 'juan@example.com',
        subject: 'Contato de Juan',
      })
    );
  });

  it('retorna 500 quando o Resend responde com erro', async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: 'Falha no envio' } });

    const res = await POST(
      makeRequest({ name: 'Juan', email: 'juan@example.com', message: 'Teste' })
    );
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json).toEqual({ success: false, error: 'Falha no envio' });
  });

  it('retorna 500 quando req.json() lança (corpo malformado)', async () => {
    const badRequest = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: '{ isso não é json',
    });

    const res = await POST(badRequest);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
  });
});
