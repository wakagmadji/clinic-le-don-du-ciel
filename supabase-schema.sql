-- ============================================================
-- CLINIQUE LE DON DU CIEL — Schéma Supabase
-- Exécuter dans : Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. TABLE : rendez-vous
create table if not exists public.rendez_vous (
  id          uuid primary key default gen_random_uuid(),
  nom         text not null,
  prenom      text not null,
  telephone   text not null,
  service     text not null,
  date        date,
  motif       text,
  statut      text not null default 'en_attente',  -- en_attente | confirme | annule
  created_at  timestamptz not null default now()
);

-- 2. TABLE : équipe
create table if not exists public.equipe (
  id        uuid primary key default gen_random_uuid(),
  nom       text not null,
  role      text not null,
  initiales text not null,
  couleur   text not null default 'green',  -- green | gold
  ordre     int not null default 0,
  created_at timestamptz not null default now()
);

-- 3. TABLE : services
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  titre       text not null,
  description text not null,
  details     text[] not null default '{}',
  icone       text not null default 'Stethoscope',
  ordre       int not null default 0,
  created_at  timestamptz not null default now()
);

-- 4. Données initiales — équipe
insert into public.equipe (nom, role, initiales, couleur, ordre) values
  ('Dr. Mahamat Idriss', 'Médecin Directeur',       'MI', 'green', 1),
  ('Dr. Fatime Alio',    'Médecine Générale',        'FA', 'gold',  2),
  ('Dr. Saleh Oumar',    'Biologiste – Laboratoire', 'SO', 'green', 3),
  ('Mme. Amina Hassan',  'Pharmacienne en chef',     'AH', 'gold',  4);

-- 5. Données initiales — services
insert into public.services (titre, description, details, icone, ordre) values
  (
    'Médecine Générale',
    'Consultations, bilans de santé, suivi des maladies chroniques et prévention pour toute la famille.',
    array['Consultations médicales','Bilans de santé complets','Suivi des maladies chroniques','Médecine préventive','Certificats médicaux'],
    'Stethoscope', 1
  ),
  (
    'Laboratoire d''analyses',
    'Analyses biologiques complètes avec résultats rapides, interprétés par nos biologistes qualifiés.',
    array['Analyses sanguines','Examens urinaires','Microbiologie & parasitologie','Tests de grossesse','Résultats express'],
    'FlaskConical', 2
  ),
  (
    'Pharmacie interne',
    'Pharmacie sur place pour un accès immédiat à vos médicaments dès la fin de la consultation.',
    array['Médicaments sur ordonnance','Conseil pharmaceutique','Produits de parapharmacie','Disponibilité immédiate','Tarifs accessibles'],
    'Pill', 3
  );

-- 6. Row Level Security (RLS)
alter table public.rendez_vous enable row level security;
alter table public.equipe       enable row level security;
alter table public.services     enable row level security;

-- Lecture publique pour le site vitrine
create policy "public_read_services" on public.services  for select using (true);
create policy "public_read_equipe"   on public.equipe    for select using (true);

-- Insertion publique des rendez-vous (formulaire site)
create policy "public_insert_rdv" on public.rendez_vous for insert with check (true);

-- Lecture/modif des rendez-vous : admins authentifiés seulement
create policy "admin_all_rdv"      on public.rendez_vous for all    using (auth.role() = 'authenticated');
create policy "admin_all_equipe"   on public.equipe      for all    using (auth.role() = 'authenticated');
create policy "admin_all_services" on public.services    for all    using (auth.role() = 'authenticated');

-- ============================================================
-- CRÉER LE COMPTE ADMIN
-- Supabase Dashboard > Authentication > Users > Invite user
-- Email    : admin@ledondduciel.td
-- Password : [choisir un mot de passe fort]
-- ============================================================
