'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bem-vindo, {session.user?.name}
        </h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Você está logado com {session.user?.email}
        </p>
        <button
          onClick={() => signOut()}
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Login
      </h1>
      <button
        onClick={() => signIn("google")}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Entrar com Google
      </button>
    </div>
  );
}
