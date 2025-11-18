'use client';

import { signIn, signOut, useSession } from "next-auth/react";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...props}>
      <path
        fill="#EA4335"
        d="M12 11h11c.1.6.2 1.1.2 1.8 0 6-4 10.2-11.2 10.2A11.9 11.9 0 0 1 0 12 11.9 11.9 0 0 1 12 .2c3.2 0 5.9 1.2 8 3.1l-3.3 3.2A7.6 7.6 0 0 0 12 4.8c-4 0-7.3 3.3-7.3 7.2s3.3 7.2 7.3 7.2c3.7 0 6.3-2.1 6.9-5.1H12z"
      />
    </svg>
  );
}

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 right-0 w-full md:ml-64 flex justify-end items-center px-6 py-4 bg-blue-950 text-white shadow-lg z-50">
      {session ? (
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-300 shadow-md"
        >
          <img
            src={session.user?.image || ""}
            alt="avatar"
            className="w-7 h-7 rounded-full border-2 border-white hover:scale-105 transition-transform"
          />
          <span className="font-medium">Sair</span>
        </button>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors duration-300 shadow-md"
        >
          <GoogleIcon />
          <span className="font-medium">Login</span>
        </button>
      )}
    </header>
  );
}
