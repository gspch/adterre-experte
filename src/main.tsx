import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, createRootRoute, createRoute, Link, Outlet } from '@tanstack/react-router'
import { ArrowRight, Boxes, GraduationCap, Map, Menu, Network, Search, Star, Users, X } from 'lucide-react'
import './styles.css'
import { chiffres, divisions, commandements, brigades } from './data/organisation'
import { regiments, armes } from './data/regiments'
import { grades } from './data/grades'
import { ecoles } from './data/ecoles'
import { glossaire } from './data/glossaire'
import { equipements } from './data/equipements'
import { operations, bilanEngagements } from './data/operations'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const L: any = Link

const liens = [
  ['/organisation', 'Organisation'], ['/regiments', 'Régiments'], ['/equipements', 'Équipements'], ['/operations', 'Opérations'],
  ['/grades', 'Grades'], ['/ecoles', 'Écoles'], ['/glossaire', 'Glossaire'],
] as const

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <L to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary text-primary-foreground"><span className="stencil text-xs">AT</span></span>
          <span className="leading-tight">
            <span className="stencil block text-sm">Terre Experte</span>
            <span className="rule-label block">Manuel interactif</span>
          </span>
        </L>
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {liens.map(([to, l]) => (
            <L key={to} to={to} activeProps={{ className: 'bg-secondary text-foreground' }} className="rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">{l}</L>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <L to="/recherche" aria-label="Recherche" className="flex h-9 items-center gap-2 rounded-sm border border-border px-3 text-sm text-muted-foreground hover:text-foreground">
            <Search className="h-4 w-4" /><span className="hidden md:inline">Rechercher</span>
          </L>
          <button type="button" aria-label="Ouvrir le menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-9 w-9 items-center justify-center rounded-sm border border-border lg:hidden">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">
          {liens.map(([to, l]) => (
            <L key={to} to={to} onClick={() => setOpen(false)} activeProps={{ className: 'bg-secondary text-foreground' }} className="block rounded-sm px-3 py-3 text-sm text-muted-foreground hover:bg-secondary">{l}</L>
          ))}
          <L to="/sources" onClick={() => setOpen(false)} className="block rounded-sm px-3 py-3 text-sm text-muted-foreground hover:bg-secondary">Sources</L>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-sand/60">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="stencil text-sm">Terre Experte, manuel interactif de l'armée de Terre</p>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Ressource pédagogique indépendante, rédigée à partir des pages publiques du ministère des Armées. Elle n'émane pas du ministère et n'a aucune valeur officielle. Les images sont créditées « © armée de Terre/Défense ».
        </p>
        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {liens.map(([to, l]) => <L key={to} to={to} className="hover:text-foreground">{l}</L>)}
          <L to="/sources" className="hover:text-foreground">Sources</L>
        </nav>
      </div>
    </footer>
  )
}

function Layout() {
  return (<div className="min-h-screen"><Header /><main><Outlet /></main><Footer /></div>)
}

const Page = ({ label, titre, intro, children }: { label: string; titre: string; intro?: string; children: React.ReactNode }) => (
  <div>
    <section className="field-grid border-b border-border bg-sand/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <p className="rule-label">{label}</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">{titre}</h1>
        {intro && <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>}
      </div>
    </section>
    <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
  </div>
)

function Photo({ src, alt, fit = 'cover' }: { src?: string; alt: string; fit?: 'cover' | 'contain' }) {
  const [ko, setKo] = useState(false)
  if (!src || ko) return null
  return (
    <figure className="border-b border-border bg-sand/60">
      <img src={src.replace('http://', 'https://')} alt={alt} loading="lazy" referrerPolicy="no-referrer" onError={() => setKo(true)}
        className={`aspect-video w-full ${fit === 'contain' ? 'object-contain p-3' : 'object-cover'}`} />
      <figcaption className="rule-label px-3 py-1 normal-case tracking-normal">© armée de Terre/Défense</figcaption>
    </figure>
  )
}

function Insigne({ nom }: { nom: string }) {
  const chev = nom === 'Soldat de 1re classe' ? 1 : nom === 'Caporal' ? 2 : nom === 'Caporal-chef' ? 3 : 0
  const bar = nom === 'Sous-lieutenant' ? 1 : nom === 'Lieutenant' ? 2 : nom === 'Capitaine' ? 3 : 0
  const star = nom === 'Général de brigade' ? 2 : nom === 'Général de division' ? 3 : nom === "Général de corps d'armée" ? 4 : nom === "Général d'armée" ? 5 : 0
  if (!chev && !bar && !star) return <div className="w-14 shrink-0" aria-hidden />
  return (
    <svg width="56" height="32" viewBox="0 0 56 32" className="shrink-0" role="img" aria-label={`${chev || bar || star} ${chev ? 'chevron(s)' : bar ? 'barrette(s)' : 'étoile(s)'}`}>
      <rect width="56" height="32" rx="3" fill="var(--primary)" />
      {Array.from({ length: chev }).map((_, i) => <path key={i} d={`M10 ${10 + i * 7} l18 -6 l18 6`} fill="none" stroke="var(--sand)" strokeWidth="3" />)}
      {Array.from({ length: bar }).map((_, i) => <rect key={i} x="10" y={7 + i * 8} width="36" height="4" fill="var(--sand)" />)}
      {Array.from({ length: star }).map((_, i) => <text key={i} x={28 + (i - (star - 1) / 2) * 9} y="21" fontSize="11" textAnchor="middle" fill="var(--sand)">★</text>)}
    </svg>
  )
}

const domaines = [
  { to: '/operations', icone: Map, titre: 'Opérations', resume: 'Sentinelle, Harpie, Daman, Aigle, Lynx : où et comment l\'armée de Terre est engagée.' },
  { to: '/organisation', icone: Network, titre: 'Organisation', resume: 'Deux divisions, des brigades interarmes et spécialisées, des commandements, et leurs unités.' },
  { to: '/regiments', icone: Users, titre: 'Régiments', resume: `${regiments.length} fiches vérifiées : garnison, histoire, devise et effectif.` },
  { to: '/equipements', icone: Boxes, titre: 'Équipements', resume: 'Blindés Scorpion, Leclerc, CAESAR, hélicoptères, HK 416 F et MMP, fiche par fiche.' },
  { to: '/grades', icone: Star, titre: 'Grades et insignes', resume: 'Du soldat au général d\'armée, avec chevrons, barrettes et étoiles.' },
  { to: '/ecoles', icone: GraduationCap, titre: 'Écoles', resume: 'Saint-Cyr, ENSOA, écoles d\'armes, centres de spécialisation.' },
] as const

function Accueil() {
  return (
    <div>
      <section className="field-grid border-b border-border bg-sand/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="rule-label">Manuel interactif · édition 2026</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-6xl">
            Comprendre l'armée de Terre française,<span className="text-primary"> jusque dans le détail</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Organisation, régiments, grades, équipements, écoles et opérations. Chaque fait vient d'une page officielle du ministère des Armées, avec le lien pour vérifier.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <L to="/organisation" className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
              Explorer l'organisation <ArrowRight className="h-4 w-4" />
            </L>
            <L to="/recherche" className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-5 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Search className="h-4 w-4" /> Rechercher
            </L>
          </div>
        </div>
      </section>
      <section className="border-b border-border bg-card">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-6">
          {chiffres.map(c => (
            <div key={c.label} className="bg-card px-4 py-6">
              <dt className="font-display text-2xl">{c.valeur}</dt>
              <dd className="rule-label mt-1 normal-case tracking-wide">{c.label}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="stencil text-sm text-muted-foreground">Les domaines</h2>
        <div className="mt-6 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {domaines.map(d => (
            <L key={d.to} to={d.to} className="group flex flex-col bg-card p-6 transition-colors hover:bg-secondary sm:p-8">
              <d.icone className="h-6 w-6 text-primary" />
              <h3 className="mt-5 text-2xl">{d.titre}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.resume}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">Consulter <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </L>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="rounded-sm border border-border bg-card p-6 sm:p-8">
          <h2 className="text-2xl">Par où commencer</h2>
          <ol className="mt-4 grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
            <li><span className="rule-label block">01 · La structure</span><p className="mt-2">Deux divisions et leurs brigades : la charpente. Commencez par <L to="/organisation" className="text-primary underline-offset-4 hover:underline">l'organisation</L>.</p></li>
            <li><span className="rule-label block">02 · Les unités</span><p className="mt-2">Chaque régiment a sa fiche, filtrable par arme, avec garnison, devise et histoire. <L to="/regiments" className="text-primary underline-offset-4 hover:underline">Voir les régiments</L>.</p></li>
            <li><span className="rule-label block">03 · Le vocabulaire</span><p className="mt-2">BB, BIMa, COMECIA, VBCI : le <L to="/glossaire" className="text-primary underline-offset-4 hover:underline">glossaire</L> décode les sigles.</p></li>
          </ol>
        </div>
      </section>
    </div>
  )
}

function Organisation() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <Page label="Structure" titre="Organisation" intro="Deux divisions, huit brigades interarmes ou d'aérocombat, des brigades spécialisées et des commandements. Ouvrez une brigade pour voir ses unités.">
      <div className="grid gap-px bg-border sm:grid-cols-2">
        {divisions.map(d => (
          <div key={d.id} className="bg-card p-6">
            <p className="rule-label">Division · {d.siege}</p>
            <h3 className="mt-2 text-2xl">{d.nom}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d.brigades.join(' · ')}</p>
          </div>))}
      </div>
      <h2 className="stencil mt-12 text-sm text-muted-foreground">Brigades</h2>
      <div className="mt-4 divide-y divide-border border border-border bg-card">
        {brigades.map(b => (
          <div key={b.id}>
            <button className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-secondary" onClick={() => setOpen(open === b.id ? null : b.id)} aria-expanded={open === b.id}>
              <span><span className="text-lg font-display">{b.nom}</span><span className="rule-label ml-3">{b.type}{b.division ? ` · ${b.division}` : ''}</span></span>
              <span aria-hidden className="text-primary">{open === b.id ? '−' : '+'}</span>
            </button>
            {open === b.id && (
              <div className="border-t border-border bg-background px-5 py-4 text-sm">
                <p className="text-muted-foreground">{b.resume}</p>
                <ul className="mt-3 grid list-disc gap-x-8 pl-5 sm:grid-cols-2 lg:grid-cols-3">
                  {b.unites.map(u => <li key={u.nom}>{u.nom}{u.lieu ? `, ${u.lieu}` : ''}{u.note ? <span className="text-muted-foreground"> ({u.note})</span> : null}</li>)}
                </ul>
              </div>)}
          </div>))}
      </div>
      <h2 className="stencil mt-12 text-sm text-muted-foreground">Commandements</h2>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">{commandements.map(c => <li key={c}>{c}</li>)}</ul>
    </Page>
  )
}

function Regiments() {
  const [q, setQ] = useState('')
  const [arme, setArme] = useState('Toutes')
  const present = armes.filter(a => regiments.some(r => r.arme === a))
  const list = useMemo(() => regiments.filter(r => (arme === 'Toutes' || r.arme === arme) && (r.sigle + r.nom + r.garnison + r.brigade).toLowerCase().includes(q.toLowerCase())), [q, arme])
  return (
    <Page label="Unités" titre="Régiments" intro={`${regiments.length} fiches d'après les pages officielles de chaque unité. Les infos absentes de la fiche officielle ne sont pas affichées.`}>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {['Toutes', ...present].map(k => (
          <button key={k} onClick={() => setArme(k)} className={`rounded-sm border px-3 py-1.5 text-sm ${arme === k ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}>{k}</button>))}
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Sigle, ville, brigade" aria-label="Rechercher un régiment" className="ml-auto w-full rounded-sm border border-border bg-card px-3 py-2 text-sm sm:w-64" />
      </div>
      <p className="rule-label mb-4">{list.length} résultat{list.length > 1 ? 's' : ''}</p>
      <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
        {list.map(r => (
          <article key={r.sigle} className="flex flex-col bg-card">
            <Photo src={r.image} alt={`Insigne ou visuel du ${r.sigle}`} fit="contain" />
            <div className="flex flex-1 flex-col p-5">
              <p className="rule-label">{r.arme} · {r.brigade}</p>
              <h3 className="mt-1 text-2xl">{r.sigle}</h3>
              <p className="text-sm text-muted-foreground">{r.nom}</p>
              <p className="mt-2 text-sm font-medium">{r.garnison}</p>
              {r.devise && <p className="mt-2 text-sm italic text-accent">« {r.devise} »</p>}
              {r.histoire && <p className="mt-2 text-sm">{r.histoire}</p>}
              {r.effectif && <p className="mt-2 text-xs text-muted-foreground">Effectif : {r.effectif}</p>}
              <a href={r.source} target="_blank" rel="noreferrer" className="mt-auto inline-block pt-3 text-xs text-primary underline-offset-4 hover:underline">Fiche officielle</a>
            </div>
          </article>))}
      </div>
      {list.length === 0 && <p>Aucun résultat.</p>}
    </Page>
  )
}

function Equipements() {
  const cats = ['Toutes', ...new Set(equipements.map(e => e.categorie))]
  const [c, setC] = useState('Toutes')
  const list = equipements.filter(e => c === 'Toutes' || e.categorie === c)
  return (
    <Page label="Matériels" titre="Équipements" intro="Dix matériels majeurs. Chaque chiffre vient de la fiche officielle liée sous la carte.">
      <div className="mb-6 flex flex-wrap gap-2">
        {cats.map(k => <button key={k} onClick={() => setC(k)} className={`rounded-sm border px-3 py-1.5 text-sm ${c === k ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}>{k}</button>)}
      </div>
      <div className="grid gap-px bg-border md:grid-cols-2">
        {list.map(e => (
          <article key={e.id} className="bg-card">
            <Photo src={e.image} alt={e.nom} />
            <div className="p-5">
              <p className="rule-label">{e.categorie}</p>
              <h3 className="mt-1 text-2xl">{e.nom}</h3>
              <p className="mt-1 mb-3 text-sm text-muted-foreground">{e.role}</p>
              <dl className="divide-y divide-border text-sm">
                {e.specs.map(([k, v]) => <div key={k} className="grid grid-cols-3 gap-2 py-1.5"><dt className="rule-label normal-case tracking-wide">{k}</dt><dd className="col-span-2">{v}</dd></div>)}
              </dl>
              <a href={e.source} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-primary underline-offset-4 hover:underline">Fiche officielle</a>
            </div>
          </article>))}
      </div>
    </Page>
  )
}

function Operations() {
  return (
    <Page label="Engagements" titre="Opérations" intro="Ce que l'armée de Terre fait en ce moment, en France et à l'étranger.">
      <dl className="mb-10 grid gap-px bg-border sm:grid-cols-3">
        {bilanEngagements.map(c => (
          <div key={c.label} className="bg-card px-5 py-6">
            <dt className="font-display text-3xl text-primary">{c.valeur}</dt>
            <dd className="mt-1 text-sm font-medium">{c.label}</dd>
            <dd className="rule-label mt-1 normal-case tracking-wide">{c.note}</dd>
          </div>))}
      </dl>
      <div className="grid gap-px bg-border md:grid-cols-2">
        {operations.map(o => (
          <article key={o.id} className="bg-card p-6">
            <p className="rule-label">{o.lieu}</p>
            <h3 className="mt-1 text-2xl">{o.nom}</h3>
            <p className="mt-1 text-sm text-accent">{o.cadre}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{o.faits.map(f => <li key={f}>{f}</li>)}</ul>
            <a href={o.source} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-primary underline-offset-4 hover:underline">Source officielle</a>
          </article>))}
      </div>
    </Page>
  )
}

function Grades() {
  const corps = [...new Set(grades.map(g => g.corps))]
  return (
    <Page label="Hiérarchie" titre="Grades" intro="Du soldat au général d'armée. Les insignes dessinés sont schématiques et ne couvrent que les grades dont le nombre est confirmé.">
      {corps.map(c => (
        <section key={c} className="mb-8">
          <h2 className="stencil border-b border-border pb-2 text-sm text-muted-foreground">{c}</h2>
          <ul className="divide-y divide-border bg-card">
            {grades.filter(g => g.corps === c).map(g => (
              <li key={g.nom} className="flex items-center gap-4 px-4 py-3"><Insigne nom={g.nom} /><span className="flex-1 font-display text-lg">{g.nom}</span><span className="text-right text-sm text-muted-foreground">{g.note}</span></li>))}
          </ul>
        </section>))}
    </Page>
  )
}

function Ecoles() {
  return (
    <Page label="Formation" titre="Écoles" intro="Formation des officiers, sous-officiers et spécialistes.">
      <div className="grid gap-px bg-border md:grid-cols-2">
        {ecoles.map(e => (
          <article key={e.sigle} className="bg-card p-6">
            <p className="rule-label">{e.lieu}</p>
            <h3 className="mt-1 text-2xl">{e.sigle}</h3>
            <p className="text-sm text-muted-foreground">{e.nom}</p>
            <p className="mt-3 text-sm">{e.fait}</p>
          </article>))}
      </div>
    </Page>
  )
}

function Glossaire() {
  return (
    <Page label="Vocabulaire" titre="Glossaire" intro="Sigles et termes courants.">
      <dl className="divide-y divide-border border border-border bg-card">
        {glossaire.map(g => <div key={g.terme} className="grid gap-1 px-5 py-3 sm:grid-cols-4"><dt className="font-display text-lg text-primary">{g.terme}</dt><dd className="text-sm sm:col-span-3">{g.def}</dd></div>)}
      </dl>
    </Page>
  )
}

function Recherche() {
  const [q, setQ] = useState('')
  const t = q.trim().toLowerCase()
  const idx = useMemo(() => [
    ...regiments.map(r => ({ type: 'Régiment', to: '/regiments', titre: r.sigle, texte: `${r.nom} ${r.garnison} ${r.brigade} ${r.histoire ?? ''} ${r.devise ?? ''}` })),
    ...brigades.flatMap(b => b.unites.map(u => ({ type: 'Unité', to: '/organisation', titre: u.nom, texte: `${b.nom} ${u.lieu ?? ''} ${u.note ?? ''}` }))),
    ...equipements.map(e => ({ type: 'Équipement', to: '/equipements', titre: e.nom, texte: `${e.role} ${e.specs.map(x => x.join(' ')).join(' ')}` })),
    ...operations.map(o => ({ type: 'Opération', to: '/operations', titre: o.nom, texte: `${o.lieu} ${o.cadre} ${o.faits.join(' ')}` })),
    ...grades.map(g => ({ type: 'Grade', to: '/grades', titre: g.nom, texte: `${g.corps} ${g.note ?? ''}` })),
    ...ecoles.map(e => ({ type: 'École', to: '/ecoles', titre: e.sigle, texte: `${e.nom} ${e.lieu} ${e.fait}` })),
    ...glossaire.map(g => ({ type: 'Glossaire', to: '/glossaire', titre: g.terme, texte: g.def })),
  ], [])
  const res = t.length < 2 ? [] : idx.filter(i => (i.titre + ' ' + i.texte).toLowerCase().includes(t)).slice(0, 60)
  return (
    <Page label="Recherche globale" titre="Recherche" intro="Un mot, un sigle, une ville, un matériel.">
      <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="ex. Griffon, Calvi, caporal" aria-label="Recherche" className="mb-6 w-full max-w-md rounded-sm border border-border bg-card px-3 py-2" />
      <ul className="divide-y divide-border border-y border-border bg-card">
        {res.map((r, i) => <li key={i} className="px-4 py-3"><L to={r.to} className="font-display text-lg text-primary underline-offset-4 hover:underline">{r.titre}</L><span className="rule-label ml-3">{r.type}</span><div className="line-clamp-2 text-sm text-muted-foreground">{r.texte}</div></li>)}
      </ul>
      {t.length >= 2 && res.length === 0 && <p>Aucun résultat.</p>}
    </Page>
  )
}

function Sources() {
  const s = [
    ['Armée de Terre, présentation', 'https://www.defense.gouv.fr/terre'],
    ['Unités de l\'armée de Terre', 'https://www.defense.gouv.fr/terre/unites-larmee-terre'],
    ['Brigades', 'https://www.defense.gouv.fr/terre/unites-larmee-terre/nos-brigades'],
    ['Régiments', 'https://www.defense.gouv.fr/terre/unites-larmee-terre/nos-regiments'],
    ['Missions et opérations', 'https://www.defense.gouv.fr/terre/engagements-larmee-terre/missions-operations-larmee-terre'],
    ['Équipements', 'https://www.defense.gouv.fr/terre/nos-materiels/nos-equipements-terre'],
    ['Carrières militaires (recrutement)', 'https://www.carrieresmilitaires.fr'],
  ]
  return (
    <Page label="Méthode" titre="Sources et limites" intro="Chaque fait vient des pages officielles du ministère des Armées, consultées en septembre 2026. Ce qui n'a pas pu être confirmé a été retiré plutôt que deviné.">
      <ul className="mb-8 list-disc space-y-1 pl-5">{s.map(([l, u]) => <li key={l}><a className="text-primary underline-offset-4 hover:underline" href={u} target="_blank" rel="noreferrer">{l}</a></li>)}</ul>
      <p className="mb-2 max-w-2xl text-sm text-muted-foreground">Photos et visuels : chargés depuis defense.gouv.fr, crédit « © armée de Terre/Défense ». Si le ministère déplace une image, elle disparaît de la fiche sans casser la page.</p>
      <p className="max-w-2xl text-sm text-muted-foreground">Les insignes de grades sont des schémas originaux. Les données de certaines pages officielles se contredisent (par exemple les effectifs de Sentinelle) : le choix retenu est signalé sur la fiche. Ce site est indépendant.</p>
    </Page>
  )
}

const root = createRootRoute({ component: Layout, notFoundComponent: () => <Page label="404" titre="Page introuvable"><L to="/" className="text-primary underline">Retour à l'accueil</L></Page> })
const r = (path: string, component: () => React.JSX.Element) => createRoute({ getParentRoute: () => root, path, component })
const routeTree = root.addChildren([
  r('/', Accueil), r('/organisation', Organisation), r('/regiments', Regiments), r('/equipements', Equipements), r('/operations', Operations),
  r('/grades', Grades), r('/ecoles', Ecoles), r('/glossaire', Glossaire), r('/recherche', Recherche), r('/sources', Sources),
])
const router = createRouter({ routeTree, basepath: '/adterre-experte' })
declare module '@tanstack/react-router' { interface Register { router: typeof router } }

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><RouterProvider router={router} /></React.StrictMode>)
