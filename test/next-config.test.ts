// @vitest-environment node
import { describe, it, expect } from 'vitest';
import nextConfig from '../next.config';

describe('next.config.ts — headers de segurança', () => {
  it('aplica os headers de segurança esperados em todas as rotas', async () => {
    const result = await nextConfig.headers!();
    const globalRule = result.find((rule) => rule.source === '/(.*)');

    expect(globalRule).toBeDefined();

    const keys = globalRule!.headers.map((h) => h.key);
    expect(keys).toEqual(
      expect.arrayContaining([
        'X-Frame-Options',
        'X-Content-Type-Options',
        'Referrer-Policy',
        'Strict-Transport-Security',
        'Permissions-Policy',
        'Content-Security-Policy',
      ])
    );
  });

  it('define um Content-Security-Policy restritivo (default-src self)', async () => {
    const result = await nextConfig.headers!();
    const globalRule = result.find((rule) => rule.source === '/(.*)');
    const csp = globalRule!.headers.find((h) => h.key === 'Content-Security-Policy');

    expect(csp).toBeDefined();
    expect(csp!.value).toContain("default-src 'self'");
  });
});
