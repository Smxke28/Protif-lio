create table if not exists public.manutencao_briefings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  itens text[] not null check (
    itens <@ array[
      'limpeza_fisica', 'limpeza_software', 'backup', 'recuperacao_dados',
      'otimizacao', 'antivirus', 'atualizacao_drivers', 'diagnostico_hardware',
      'config_rede', 'formatacao', 'pasta_termica', 'outro'
    ]::text[]
    and array_length(itens, 1) > 0
  ),
  outro_detalhe text,

  atendimento text not null check (atendimento in ('remoto', 'presencial', 'nao_sei')),
  urgencia text not null check (urgencia in ('urgente', 'sem_pressa')),

  nome text not null,
  contato text not null
);

alter table public.manutencao_briefings enable row level security;

create policy "Permitir insercao publica de solicitacoes de manutencao"
  on public.manutencao_briefings
  for insert
  to anon
  with check (true);

create index if not exists manutencao_briefings_created_at_idx
  on public.manutencao_briefings (created_at desc);
