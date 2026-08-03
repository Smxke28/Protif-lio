// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

const { insertSelectMock, insertMock, sendMock, notifyWhatsAppMock, generateBriefingPdfMock } = vi.hoisted(
  () => {
    const insertSelectMock = vi.fn();
    return {
      insertSelectMock,
      insertMock: vi.fn((_records: Record<string, unknown>[]) => ({ select: insertSelectMock })),
      sendMock: vi.fn(),
      notifyWhatsAppMock: vi.fn(),
      generateBriefingPdfMock: vi.fn(),
    };
  }
);

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({ insert: insertMock })),
  })),
}));

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: sendMock } };
  }),
}));

vi.mock('@/app/lib/notifyWhatsApp', () => ({
  notifyWhatsApp: notifyWhatsAppMock,
}));

vi.mock('@/app/lib/generateBriefingPdf', () => ({
  generateBriefingPdf: generateBriefingPdfMock,
}));

import { NextRequest } from 'next/server';
import { POST } from './route';

const validPayload = {
  itens: ['limpeza_fisica', 'backup'],
  atendimento: 'remoto',
  urgencia: 'sem_pressa',
  nome: 'Juan',
  contato: '32988887777',
};

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/manutencao-briefing', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

describe('POST /api/manutencao-briefing', () => {
  beforeEach(() => {
    insertSelectMock.mockReset();
    insertMock.mockClear();
    sendMock.mockReset();
    notifyWhatsAppMock.mockReset().mockResolvedValue(true);
    generateBriefingPdfMock.mockReset().mockResolvedValue(new Uint8Array());
  });

  it('descarta silenciosamente quando o honeypot está preenchido', async () => {
    const res = await POST(makeRequest({ ...validPayload, website: 'http://spam.com' }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
    expect(insertSelectMock).not.toHaveBeenCalled();
  });

  it.each([
    ['itens vazio', { itens: [] }],
    ['item fora do enum', { itens: ['item_inexistente'] }],
    ['atendimento inválido', { atendimento: 'via_pombo_correio' }],
    ['urgencia inválida', { urgencia: 'ontem' }],
    ['nome muito curto', { nome: 'J' }],
    ['contato muito curto', { contato: '1' }],
  ])('retorna 400 quando %s', async (_desc, override) => {
    const res = await POST(makeRequest({ ...validPayload, ...override }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(insertSelectMock).not.toHaveBeenCalled();
  });

  it('grava "outro_detalhe" apenas quando "outro" está entre os itens', async () => {
    insertSelectMock.mockResolvedValueOnce({ data: [{ id: 1 }], error: null });
    sendMock.mockResolvedValueOnce({ data: { id: 'email-1' }, error: null });

    await POST(
      makeRequest({ ...validPayload, itens: ['outro'], outroDetalhe: 'Trocar pasta térmica' })
    );

    // insertMock é chamado como .insert([record]) — pegamos o record inserido.
    const [record] = insertMock.mock.calls[0][0];
    expect(record.outro_detalhe).toBe('Trocar pasta térmica');
  });

  it('salva no Supabase, notifica WhatsApp e envia e-mail com PDF quando os dados são válidos', async () => {
    insertSelectMock.mockResolvedValueOnce({ data: [{ id: 1 }], error: null });
    sendMock.mockResolvedValueOnce({ data: { id: 'email-1' }, error: null });

    const res = await POST(makeRequest(validPayload));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(notifyWhatsAppMock).toHaveBeenCalledTimes(1);
    expect(generateBriefingPdfMock).toHaveBeenCalledTimes(1);
  });

  it('retorna 500 quando o insert no Supabase falha', async () => {
    insertSelectMock.mockResolvedValueOnce({ data: null, error: { message: 'db fora do ar' } });

    const res = await POST(makeRequest(validPayload));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe('db fora do ar');
  });
});
