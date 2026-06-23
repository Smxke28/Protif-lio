[README-portfolio.md](https://github.com/user-attachments/files/29230101/README-portfolio.md)
#  Portfólio Pessoal

Site de portfólio pessoal desenvolvido com Next.js, TypeScript e Tailwind CSS, com animações via Framer Motion e envio de e-mails de contato.

##  Funcionalidades

- Apresentação de projetos e habilidades
- Formulário de contato com envio real de e-mail via **Nodemailer / Resend**
- Autenticação via **NextAuth**
- Animações fluidas com **Framer Motion**
- Design responsivo com **Tailwind CSS**

##  Tecnologias

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)

## 🚀 Como executar

```bash
git clone https://github.com/Smxke28/Protif-lio.git
cd Protif-lio
npm install
npm run dev
```
Acesse `http://localhost:3000`

## ⚙️ Variáveis de ambiente

Crie um `.env.local`:
```env
NEXTAUTH_SECRET=sua_secret
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=sua_chave_resend
```

##  Estrutura

```
├── app/           ← páginas (App Router)
├── components/    ← componentes reutilizáveis
├── public/        ← assets estáticos
└── tailwind.config.js
```
