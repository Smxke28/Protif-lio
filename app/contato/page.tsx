'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';

export default function ContatoPage() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session?.user?.email || !session?.user?.name) {
      setFeedback({ type: 'error', message: 'Você precisa estar logado com Google para enviar.' });
      return;
    }

    setLoading(true);
    setFeedback(null);

    const data = {
      name: session.user.name,
      email: session.user.email,
      message,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setLoading(false);

      if (res.ok && result.success) {
        setFeedback({ type: 'success', message: 'Mensagem enviada com sucesso!' });
        setMessage('');
      } else {
        setFeedback({ type: 'error', message: result.error || 'Erro ao enviar mensagem!' });
      }
    } catch {
      setLoading(false);
      setFeedback({ type: 'error', message: 'Falha de rede ao enviar. Tente novamente.' });
    }
  }

  if (status === 'loading') {
    return <p className="text-center">Carregando...</p>;
  }

  if (!session) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold">Contato</h1>
        <p className="text-gray-700">Você precisa estar logado para enviar uma mensagem.</p>
        <button
          onClick={() => signIn('google')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar com Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Contato</h1>
      <p className="text-gray-700">
        Olá, <strong>{session.user?.name ?? 'Usuário'}</strong> ({session.user?.email ?? 'sem email'})
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          name="message"
          placeholder="Digite sua mensagem"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
        {feedback?.type === 'success' && <p className="text-green-600">✔ {feedback.message}</p>}
        {feedback?.type === 'error' && <p className="text-red-600">✖ {feedback.message}</p>}
      </form>
    </div>
  );
}
