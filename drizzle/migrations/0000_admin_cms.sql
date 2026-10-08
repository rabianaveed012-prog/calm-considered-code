create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- The very first account created becomes the admin; later sign-ups get no access.
create or replace function public.assign_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;
create trigger on_auth_user_created_assign_admin after insert on auth.users
  for each row execute function public.assign_first_admin();

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end;
$$;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 200),
  short_description text not null default '',
  category text not null default 'Web Design',
  tags text[] not null default '{}',
  year text not null default '',
  cover_image text not null default '',
  orientation text not null default 'web' check (orientation in ('web','mobile','branding')),
  role text not null default '',
  overview text not null default '',
  problem text not null default '',
  goals text[] not null default '{}',
  research text not null default '',
  ux_process text not null default '',
  solution text not null default '',
  design_details text not null default '',
  results text not null default '',
  metrics jsonb not null default '[]',
  tools text[] not null default '{}',
  gallery text[] not null default '{}',
  live_url text not null default '',
  behance_url text not null default '',
  figma_url text not null default '',
  github_url text not null default '',
  case_study_path text not null default '',
  card_variant text not null default '',
  image_position text not null default '',
  status text not null default 'draft' check (status in ('draft','published')),
  visible boolean not null default true,
  featured boolean not null default false,
  featured_order integer not null default 0,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.projects to anon;
grant select, insert, update, delete on public.projects to authenticated;
grant all on public.projects to service_role;
alter table public.projects enable row level security;
create policy "Public reads published projects" on public.projects for select to anon, authenticated
  using (status = 'published' and visible);
create policy "Admins read all projects" on public.projects for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins insert projects" on public.projects for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update projects" on public.projects for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete projects" on public.projects for delete to authenticated using (public.has_role(auth.uid(), 'admin'));
create trigger projects_touch before update on public.projects for each row execute function public.touch_updated_at();

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  role text not null default '',
  company text not null default '',
  quote text not null check (char_length(quote) between 1 and 2000),
  photo_url text not null default '',
  logo_url text not null default '',
  enabled boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.testimonials to anon;
grant select, insert, update, delete on public.testimonials to authenticated;
grant all on public.testimonials to service_role;
alter table public.testimonials enable row level security;
create policy "Public reads enabled testimonials" on public.testimonials for select to anon, authenticated using (enabled);
create policy "Admins read all testimonials" on public.testimonials for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins insert testimonials" on public.testimonials for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update testimonials" on public.testimonials for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete testimonials" on public.testimonials for delete to authenticated using (public.has_role(auth.uid(), 'admin'));
create trigger testimonials_touch before update on public.testimonials for each row execute function public.touch_updated_at();

create table public.site_settings (
  key text primary key check (key in ('socials','contact')),
  value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
grant select on public.site_settings to anon;
grant select, insert, update, delete on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "Public reads settings" on public.site_settings for select to anon, authenticated using (true);
create policy "Admins insert settings" on public.site_settings for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update settings" on public.site_settings for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger settings_touch before update on public.site_settings for each row execute function public.touch_updated_at();

-- Media bucket: public read, admin-only writes, images only.
create policy "Public reads media" on storage.objects for select to anon, authenticated using (bucket_id = 'media');
create policy "Admins upload media" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.has_role(auth.uid(), 'admin') and lower(storage.extension(name)) in ('jpg','jpeg','png','webp'));
create policy "Admins update media" on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'))
  with check (bucket_id = 'media' and public.has_role(auth.uid(), 'admin') and lower(storage.extension(name)) in ('jpg','jpeg','png','webp'));
create policy "Admins delete media" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));

-- Seed current portfolio content
insert into public.site_settings (key, value) values
('socials', '{"linkedin":"https://www.linkedin.com/in/rabianaveed012/","behance":"https://www.behance.net/rabianaveed2","upwork":"https://www.upwork.com/freelancers/~012d4726a0419ab017?mp_source=share","github":"https://github.com/rabianaveed012-prog"}'),
('contact', '{"email":"rabianaveed012@gmail.com","location":"Gujranwala, Pakistan","availability":"Available for freelance","cta_eyebrow":"Have something in mind?","cta_title":"Your next idea,","cta_highlight":"thoughtfully designed.","cta_text":"A new product, a fresh look, or a better experience. Let''s talk about what you want to create."}');

insert into public.testimonials (name, role, quote, photo_url, sort_order) values
('Goran Karanovic','Upwork Client • Strategy Specialist','Rabia turned complex project requirements into a seamless design solution. Exceptional UX understanding and execution.','asset:goran',1),
('Damir Kovacevic','Product Lead • Long-term Client','Demonstrates an exceptional understanding of user-centric design principles and visual hierarchy. Her ability to translate complex logic into intuitive interfaces makes her a standout designer.','asset:damir',2),
('Ali Hassan','AI & Full-Stack Developer','Working with Rabia on UI/UX integration was seamless. She delivers pixel-perfect designs, structured Figma components, and edge-case layouts.','asset:ali',3),
('Kinza Shafique','Design Mentor','Rabia has an exceptional creative drive and an impressive ability to turn complex design challenges into intuitive, user-friendly experiences.','asset:kinza',4);

insert into public.projects (title, short_description, category, tags, year, cover_image, orientation, role, goals, tools, metrics, case_study_path, card_variant, image_position, status, featured, featured_order, sort_order) values
('Little Paradise Budva — Responsive Stay Website','Coastal Mediterranean resort landing page with a scenic hero image and a multi-device preview.','Web Design','{"Landing Page","Hospitality","Montenegro Resort"}','2025','asset:littleParadise','web','End-to-end UI/UX design, responsive layout system, and developer handover.','{"Make the seaside location the first thing a guest feels","Direct booking enquiries above the fold on every device","Room gallery that stays readable on small screens"}','{"Figma Auto Layout","Components & Variants","Responsive Prototype"}','[{"value":"3","label":"Breakpoints designed"},{"value":"12","label":"Reusable components"},{"value":"1 wk","label":"Design turnaround"}]','/work/little-paradise','','','published',true,2,1),
('Marketeria Digital — B2B Growth Website','Modern dark navy theme with high-contrast amber buttons, warm desk setup, and checklist notes.','Web Design','{"Landing Page","B2B","Fractional Partner"}','2025','asset:marketeria','web','Positioning-led landing page design, visual identity direction, and CTA strategy.','{"Communicate a fractional growth offer in one screen","High-contrast CTAs that survive dark backgrounds","A three-step process block that removes buying friction"}','{"Figma","Design Tokens","Interactive Prototype"}','[{"value":"1","label":"Primary conversion path"},{"value":"6","label":"Sections designed"},{"value":"AA","label":"Contrast target"}]','/work/marketeria','','','published',true,3,2),
('Bliss Haven Spa — Wellness Website','Soft warm beige aesthetic with elegant serif typography, category icons, and a cozy spa mood.','Web Design','{"Landing Page","Wellness","Luxury Spa"}','2025','asset:spa','web','Brand-aligned web design, typographic system, and icon set direction.','{"Translate a calm in-person experience into a screen","Make treatment categories scannable in one glance","Build trust with social proof near the booking CTA"}','{"Figma","Type Scale","Icon Library"}','[{"value":"4","label":"Service categories"},{"value":"2","label":"Device layouts"},{"value":"500+","label":"Clients highlighted"}]','/work/bliss-haven','','','published',true,4,3),
('Freela — Freelance Client Management App','Modern handheld iPhone mockup showing a Project Details dashboard with a vibrant blue gradient header.','App Design','{"Mobile App","Dashboard","Productivity"}','2025','asset:freela','mobile','Product UX, dashboard information design, and mobile design system.','{"Show project health — budget, deadline, progress — at a glance","Keep milestones, files, and chat one tap apart","Design a system that scales past ten project types"}','{"Figma","Auto Layout","Prototype Flows"}','[{"value":"4","label":"Core tabs"},{"value":"18","label":"Screens designed"},{"value":"1","label":"Token-based theme"}]','/work/freela','','','published',true,5,4),
('Artify — Art Discovery Mobile App','Elegant dark burgundy/plum header UI showcasing famous artist cards — Vermeer, Raphael, Da Vinci.','App Design','{"Mobile App","Art & Culture","Discovery"}','2025','asset:artify','mobile','Discovery UX, browsing taxonomy, and editorial visual language.','{"Make exploring art feel like walking a gallery","Offer three ways in: style, medium, subject","Balance rich imagery with readable long-form text"}','{"Figma","Type Hierarchy","Card Components"}','[{"value":"3","label":"Browse dimensions"},{"value":"15","label":"Screens designed"},{"value":"1","label":"Editorial card system"}]','/work/artify','','','published',false,0,5),
('Brida Stone Inc — Natural Stone E-commerce Website','Clean earth-tone aesthetic with olive green highlights, product categories, and a sleek desktop mockup.','Web Design','{"E-commerce","Product Showcase","Natural Stone"}','2024','asset:brida','web','E-commerce UX, category architecture, and product showcase design.','{"Let material texture lead the shopping experience","Simplify browsing across a wide product catalogue","Surface value props right under the hero"}','{"Figma","Component Library","E-commerce Patterns"}','[{"value":"4","label":"Value pillars"},{"value":"6","label":"Catalogue sections"},{"value":"2","label":"Checkout entry points"}]','/work/brida-stone','','center 42%','published',false,0,6),
('AgriNova — Smart Agriculture Mobile App','Dual floating dark-frame smartphones featuring a rice seed marketplace with prices, specs, and green branding.','App Design','{"Mobile App","AgriTech","E-commerce"}','2024','asset:agriNova','mobile','Marketplace UX, product detail design, and accessibility-minded typography.','{"Make seed and tool buying simple for low-literacy users","Put stock, rating, and price in one confident block","Keep the consultation call-to-action always reachable"}','{"Figma","Design System","Usability Testing"}','[{"value":"4","label":"Product categories"},{"value":"22","label":"Screens designed"},{"value":"16px","label":"Minimum body size"}]','/work/agrinova','','','published',false,0,7),
('ConsultEase — Doctor Consultation App','ConsultEase mobile interfaces for doctor discovery, appointment booking and consultation management in teal, mint and white.','App Design','{"Healthcare","Mobile App","Booking UX"}','2024','asset:consultEase','mobile','UX flows, wireframes, mobile UI and a reusable design system.','{"Discover doctors","Book appointments","Manage consultations"}','{}','[]','/work/consultease','','','published',false,0,8),
('Meridian Realty Group','Responsive real estate website design featuring property discovery, services, agents and market insights.','Web Design','{"Real Estate","Responsive Design"}','','/case-studies/meridian/showcase.png','web','UI/UX Designer','{}','{}','[]','/work/meridian-realty','meridian','','published',true,1,9),
('Burgundy Bakery Social Media Showcase','Burgundy and cream bakery social media designs featuring cupcakes, tartlets, cakes, cookies and donuts.','Social Media Posts','{"Social Media","Bakery"}','','/burgundy-bakery-thumbnail.png','branding','','{}','{}','[]','/work/bakery','','','published',false,0,10),
('COTHM Culinary Event Standee Design','Four COTHM culinary event standees featuring regional dishes, landmarks and yellow panels in a warm event setting.','Event Design / Print Design','{"Event Standee","Print Design","Visual Storytelling"}','','/case-studies/cothm/culinary-standees.png','branding','Visual Storytelling','{}','{}','[]','/work/cothm','cothm','','published',true,6,11),
('Destinify — Logo Design','A navy and orange Destinify symbol and wordmark presented on a rounded white tile.','Logo & Branding','{"Logo Design","Brand Mark"}','','asset:destinify','branding','','{}','{}','[]','/work/destinify','','','published',false,0,12),
('Artify — Visual Identity','The original Artify symbol, wordmark and Explore Engage Enjoy tagline.','Logo & Branding','{"Logo Design","Visual Identity"}','','/case-studies/artify-identity/original-logo.jpg','branding','','{}','{}','[]','/work/artify-identity','','','published',false,0,13),
('Fidato — Logo & Brand Identity','Logo and brand identity for the Fidato app, presented on a mobile home screen.','Logo & Branding','{"Logo Design","Brand Identity"}','','asset:fidato','branding','','{}','{}','[]','/work/fidato','','','published',false,0,14),
('SunnySide — Logo Design','A sun-inspired symbol and SunnySide wordmark with the tagline Brighter Tomorrows.','Logo & Branding','{"Logo Design","Brand Identity"}','','asset:sunnySide','branding','','{}','{}','[]','/work/sunny-side','','','published',false,0,15),
('TechDose by Kinza — Logo & Brand Identity','Logo design and brand identity for TechDose by Kinza, presented on dark stationery with an iridescent finish.','Logo & Branding','{"Logo Design","Brand Identity"}','','asset:byKinza','branding','','{}','{}','[]','/work/techdose','','','published',false,0,16);