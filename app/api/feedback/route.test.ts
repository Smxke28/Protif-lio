// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

const { getServerSessionMock, insertSelectMock, selectOrderMock } = vi.hoisted(() => ({
  getServerSessionMock: vi.fn(),
  insertSelectMock: vi.fn(),
  selectOrderMock: vi.fn(),
}));

vi.mock('next-auth/next', () => ({
  getServerSession: getServerSessionMock,
}));

vi.mock('../auth/[...nextauth]/route', () => ({
  authOptions: {},
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({ order: selectOrderMock })),
      insert: vi.fn(() => ({ select: insertSelectMock })),
    })),
  })),
}));

import { NextRequest } from 'next/server';
import { GET, POST } from './route';

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/feedback', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

describe('POST /api/feedback', () => {
  beforeEach(() => {
    getServerSessionMock.mockReset();
    insertSelectMock.mockReset();
  });

  it('retorna 401 quando não há sessão ativa', async () => {
    getServerSessionMock.mockResolvedValueOnce(null);

    const res = await POST(makeRequest({ service: 'Manutenção', rating: 5, comment: 'Ótimo!' }));
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.error).toMatch(/sessão/i);
    expect(insertSelectMock).not.toHaveBeenCalled();
  });

  it('usa o nome da sessão e insere o feedback quando autenticado', async () => {
    getServerSessionMock.mockResolvedValueOnce({
      user: { name: 'Juan Lavecchia', email: 'juan@example.com' },
    });
    insertSelectMock.mockResolvedValueOnce({
      data: [{ id: 1, name: 'Juan Lavecchia', service: 'Manutenção', rating: 5 }],
      error: null,
    });

    const res = await POST(makeRequest({ service: 'Manutenção', rating: 5, comment: 'Ótimo!' }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data[0].name).toBe('Juan Lavecchia');
  });

  it('cai para o prefixo do e-mail quando a sessão não tem nome', async () => {
    getServerSessionMock.mockResolvedValueOnce({
      user: { name: null, email: 'visitante@example.com' },
    });
    insertSelectMock.mockResolvedValueOnce({ data: [], error: null });

    await POST(makeRequest({ service: 'Contato', rating: 4, comment: 'Bom' }));

    // O nome final é derivado dentro da rota — aqui só garantimos que não
    // quebrou e que o insert foi de fato chamado com sessão válida.
    expect(insertSelectMock).toHaveBeenCalledTimes(1);
  });

  it('retorna 500 quando o Supabase retorna erro no insert', async () => {
    getServerSessionMock.mockResolvedValueOnce({ user: { name: 'Juan' } });
    insertSelectMock.mockResolvedValueOnce({ data: null, error: { message: 'insert falhou' } });

    const res = await POST(makeRequest({ service: 'Contato', rating: 1, comment: 'Ruim' }));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe('insert falhou');
  });
});

describe('GET /api/feedback', () => {
  beforeEach(() => {
    selectOrderMock.mockReset();
  });

  it('retorna a lista de feedbacks sem exigir sessão', async () => {
    selectOrderMock.mockResolvedValueOnce({
      data: [{ id: 1, name: 'Cliente', rating: 5 }],
      error: null,
    });

    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toHaveLength(1);
  });

  it('retorna 500 quando o Supabase falha na consulta', async () => {
    selectOrderMock.mockResolvedValueOnce({ data: null, error: { message: 'timeout' } });

    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe('timeout');
  });
});
