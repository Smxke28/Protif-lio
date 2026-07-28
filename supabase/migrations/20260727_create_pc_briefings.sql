-- Tabela de briefings de triagem para o serviço de Montagem/Consultoria de Hardware
create table if not exists public.pc_briefings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  tipo_atendimento text not null check (tipo_atendimento in ('pc_novo', 'upgrade')),
  specs_atuais text,

  objetivos text[] not null check (
    objetivos <@ array['jogos', 'programacao', 'escritorio', 'estudos', 'edicao', 'geral', 'outros']::text[]
    and array_length(objetivos, 1) > 0
  ),
  objetivo_outros text,
  jogos_casuais text,
  jogos_competitivos text,

  preferencia_gpu text not null check (
    preferencia_gpu in ('nvidia', 'amd', 'intel', 'sem_preferencia')
  ),
  preferencia_cpu text not null check (
    preferencia_cpu in ('nvidia', 'amd', 'intel', 'sem_preferencia')
  ),

  display text not null check (display in ('monitor', 'tv', 'ja_tenho')),
  perifericos text not null check (
    perifericos in ('so_pc', 'com_perifericos', 'pc_mais_monitor')
  ),

  orcamento_faixa text,
  prazo_compra text,

  nome text not null,
  contato text not null
);

-- Habilita RLS: a tabela guarda dados de leads, então só a rota de API
-- (via service role/dashboard) deve conseguir ler; o público só pode inserir.
alter table public.pc_briefings enable row level security;

create policy "Permitir insercao publica de briefings"
  on public.pc_briefings
  for insert
  to anon
  with check (true);

-- Nenhuma policy de select para "anon" -> leitura fica restrita ao
-- dashboard do Supabase (ou a uma rota autenticada, se você criar uma depois).

create index if not exists pc_briefings_created_at_idx
  on public.pc_briefings (created_at desc);
