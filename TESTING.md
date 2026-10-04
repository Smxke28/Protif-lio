# Testes automatizados

Guia rápido de como rodar e escrever os testes unitários do projeto.
Faz parte da **Etapa 1** do plano de testes (Vitest → Playwright → GitHub Actions).

## Stack

- **Vitest** — test runner
- **@testing-library/react** — testes de componente
- **jsdom** — ambiente de DOM simulado (para componentes)
- Rotas de API rodam em ambiente `node` (não precisam de DOM)

## Comandos

```bash
npm run test         # roda a suíte inteira uma vez (usar antes de commit/PR)
npm run test:watch   # modo watch — re-roda ao salvar (usar durante o desenvolvimento)
```

Rodar só um arquivo:
```bash
npx vitest run app/api/contact/route.test.ts
```

Rodar só os testes cujo nome bate com um texto (útil quando um arquivo tem muitos `it`):
```bash
npx vitest run -t "honeypot"
```

## O que já está coberto

| Arquivo testado | Teste | O que valida |
|---|---|---|
| `app/api/contact/route.ts` | `app/api/contact/route.test.ts` | honeypot, campos obrigatórios, envio via Resend, erro 500 |
| `app/api/feedback/route.ts` | `app/api/feedback/route.test.ts` | exige sessão no POST (401 sem login), GET público |
| `app/api/pc-briefing/route.ts` | `app/api/pc-briefing/route.test.ts` | honeypot, validação de enums, Supabase + PDF + WhatsApp + e-mail |
| `app/api/manutencao-briefing/route.ts` | `app/api/manutencao-briefing/route.test.ts` | idem, incluindo o campo condicional `outro_detalhe` |
| `next.config.ts` | `test/next-config.test.ts` | headers de segurança presentes (regressão do bug do CSP) |
| `components/Card.tsx` | `components/Card.test.tsx` | renderização condicional, wrapper de `Link` |

**Ainda não coberto (continuação da Etapa 1):** `Navbar`, `MaintenanceBriefingForm`, `PCBriefingWizard`, `FeedbackSection`, `WhatsAppFloatButton`, `ThemeToggle`.

**Etapas 2 (Playwright/E2E) e 3 (GitHub Actions/CI)** do plano ainda não foram implementadas.

## Quando rodar

- **Antes de todo commit/PR** — `npm run test`, pra não subir nada quebrado.
- **Ao mexer numa rota de API existente** — roda o teste daquela rota primeiro; se ela já cobre validação/honeypot/erro, qualquer regressão aparece na hora.
- **Ao corrigir um bug** — escreve primeiro um teste que reproduz o bug (deve falhar), corrige o código, roda de novo (deve passar). Foi assim que o bug do CSP no `next.config.ts` foi pego e travado com `test/next-config.test.ts`.
- **Ao criar um componente ou rota nova** — copia a estrutura de um teste parecido como ponto de partida (ver padrões abaixo).

## Padrões usados (para escrever um teste novo)

**Mockar módulos externos (Resend, Supabase, `notifyWhatsApp`, `generateBriefingPdf`):**
sempre com `vi.mock` + `vi.hoisted`, porque `vi.mock` é hoisted para o topo do arquivo — uma `const` normal declarada antes dele ainda dá erro de "cannot access before initialization":

```ts
const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: sendMock } };
  }),
}));
```

Repare que o mock do construtor usa `function () {}`, não arrow function — `new Resend()` não funciona com arrow function.

**Rotas que recebem `NextRequest`** (a maioria em `app/api/**`, exceto `contact`, que usa `Request` puro):
```ts
import { NextRequest } from 'next/server';

const req = new NextRequest('http://localhost/api/pc-briefing', {
  method: 'POST',
  body: JSON.stringify(payload),
});
```

**Ambiente `node` em vez de `jsdom`** — todo arquivo de teste de rota de API começa com:
```ts
// @vitest-environment node
```

**Componentes client** — usam `render`/`screen` do Testing Library normalmente, já com `jsdom` (padrão do `vitest.config.ts`) e o mock de `next/navigation` do `test/setup.ts`.

## Observação sobre o lint

O `eslint.config.mjs` do projeto ainda não tem o parser de TypeScript configurado — `npm run lint` falha hoje em qualquer arquivo `.ts` (inclusive os que já existiam antes desses testes, como o próprio `next.config.ts`). Não afeta o `npm run test`, mas vale corrigir antes de configurar a Etapa 3 (CI), senão o step de lint do workflow vai quebrar.
