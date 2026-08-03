import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    css: true,
    // Rotas de API (app/api/**) não tocam o DOM — testes lá usam node.
    // Colocamos jsdom como padrão porque a maioria dos testes é de componentes.
    exclude: ['node_modules', '.next', 'e2e'],
    // Valores falsos só para satisfazer os `process.env.X!` lidos na hora do
    // import dos módulos (Resend, Supabase, NextAuth). Nenhuma chamada real
    // é feita nos testes — os SDKs são mockados nos próprios arquivos de teste.
    env: {
      NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
      SUPABASE_SERVICE_ROLE_KEY: 'test-service-role-key',
      RESEND_API_KEY: 'test-resend-key',
      CONTACT_EMAIL_USER: 'contato-teste@example.com',
      GOOGLE_CLIENT_ID: 'test-google-client-id',
      GOOGLE_CLIENT_SECRET: 'test-google-client-secret',
    },
  },
});
