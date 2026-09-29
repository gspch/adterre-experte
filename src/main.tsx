import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, createRootRoute, createRoute, Link, Outlet } from '@tanstack/react-router'
import './styles.css'
import { chiffres, divisions, commandements, brigades } from './data/organisation'
import { regiments } from './data/organisation'
import { grades } from './data/grades'
import { ecoles } from './data/ecoles'
import { glossaire } from './data/glossaire'
import { equipements } from './data/equipements'
import { operations, bilanEngagements } from './data/operations'

const IMG = 'https://www.defense.gouv.fr/sites/default/files/styles/16_9_md/public/terre/'
function Photo({ src, alt, credit }: { src?: string; alt: string; credit?: string }) {
  const [ko, setKo] = useState(false)
  if (!src || ko) return (
    <div className="aspect-video bg-sable/60 flex items-center justify-center text-kaki" role="img" aria-label={alt}>
      <svg width="64" height="64" viewBox="0 0 32 32" aria-hidden><path d="M4 24l9-13 5 7 3-4 7 10z" fill="currentColor" opacity=".5" /></svg>
    </div>)
  return (
    <figure>
      <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" onError={() => setKo(true)} className="w-full aspect-video object-cover bg-sable/40" />
      <figcaption className="text-[10px] opacity-60 px-1 py-0.5">{credit ?? '© armée de Terre/Défense'}</figcaption>
    </figure>)
}

function Insigne({ nom }: { nom: string }) {
  const chev = nom === 'Soldat de 1re classe' ? 1 : nom === 'Caporal' ? 2 : nom === 'Caporal-chef' ? 3 : 0
  const bar = nom === 'Sous-lieutenant' ? 1 : nom === 'Lieutenant' ? 2 : nom === 'Capitaine' ? 3 : 0
  const star = nom === 'Général de brigade' ? 2 : nom === 'Général de division' ? 3 : nom === "Général de corps d'armée" ? 4 : nom === "Général d'armée" ? 5 : 0
  if (!chev && !bar && !star) return <div className="w-14" aria-hidden />
  return (
    <svg width="56" height="32" viewBox="0 0 56 32" className="shrink-0" role="img" aria-label={`${chev || bar || star} ${chev ? 'chevron(s)' : bar ? 'barrette(s)' : 'étoile(s)'}`}>
      <rect width="56" height="32" rx="3" fill="#374a2f" />
      {Array.from({ length: chev }).map((_, i) => <path key={i} d={`M10 ${10 + i * 7} l18 -6 l18 6`} fill="none" stroke="#d9d2b8" strokeWidth="3" />)}
      {Array.from({ length: bar }).map((_, i) => <rect key={i} x="10" y={7 + i * 8} width="36" height="4" fill="#d9d2b8" />)}
      {Array.from({ length: star }).map((_, i) => <text key={i} x={28 + (i - (star - 1) / 2) * 9} y="21" fontSize="11" textAnchor="middle" fill="#d9d2b8">★</text>)}
    </svg>)
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const L: any = Link
const nav = [
  ['/', 'Accueil'], ['/organisation', 'Organisation'], ['/regiments', 'Régiments'], ['/equipements', 'Équipements'], ['/operations', 'Opérations'],
  ['/grades', 'Grades'], ['/ecoles', 'Écoles'], ['/glossaire', 'Glossaire'], ['/recherche', 'Recherche'], ['/sources', 'Sources'],
] as const

function Layout() {
  return (
    <div className="min-h-screen">
      <header className="bg-kaki text-fond">
        <div className="mx-auto max-w-5xl px-4 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <L to="/" className="font-serif text-xl font-bold tracking-wide">TERRE EXPERTE</L>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {nav.slice(1).map(([to, l]) => (
              <L key={to} to={to} className="opacity-80 hover:opacity-100 [&.active]:underline [&.active]:opacity-100">{l}</L>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8"><Outlet /></main>
      <footer className="border-t border-sable mt-12 py-6 text-center text-xs opacity-70">
        Site indépendant, non officiel. Données issues des pages du ministère des Armées. Voir <L to="/sources" className="underline">Sources</L>.
      </footer>
    </div>
  )
}
const H = ({ children }: { children: React.ReactNode }) => <h1 className="font-serif text-3xl font-bold mb-2">{children}</h1>
const Intro = ({ children }: { children: React.ReactNode }) => <p className="mb-6 max-w-2xl opacity-80">{children}</p>

function Accueil() {
  return (<>
    <H>L'armée de Terre en clair</H>
    <Intro>Encyclopédie interactive de l'armée de Terre française : organisation, régiments, grades, écoles et vocabulaire.</Intro>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
      {chiffres.map(c => (
        <div key={c.label} className="border border-sable bg-white/50 p-4">
          <div className="font-serif text-3xl font-bold text-kaki">{c.valeur}</div>
          <div className="text-sm font-semibold">{c.label}</div>
          <div className="text-xs opacity-60 mt-1">{c.note}</div>
        </div>))}
    </div>
    <h2 className="font-serif text-xl font-bold mb-3">Explorer</h2>
    <div className="grid md:grid-cols-4 gap-3">
      {nav.slice(1, 8).map(([to, l]) => <L key={to} to={to} className="border border-kaki p-4 hover:bg-kaki hover:text-fond font-semibold">{l}</L>)}
    </div>
  </>)
}

function Organisation() {
  const [open, setOpen] = useState<string | null>(null)
  return (<>
    <H>Organisation</H>
    <Intro>Deux divisions, huit brigades interarmes ou d'aérocombat, des brigades spécialisées et des commandements. Clique sur une brigade pour voir ses unités.</Intro>
    <div className="grid md:grid-cols-2 gap-3 mb-8">
      {divisions.map(d => (
        <div key={d.id} className="border border-sable p-4 bg-white/50">
          <div className="font-serif font-bold text-lg">{d.nom} <span className="text-sm font-normal opacity-60">({d.siege})</span></div>
          <div className="text-sm mt-1">{d.brigades.join(', ')}</div>
        </div>))}
    </div>
    <div className="space-y-2 mb-8">
      {brigades.map(b => (
        <div key={b.id} className="border border-sable bg-white/50">
          <button className="w-full text-left p-3 flex justify-between gap-3" onClick={() => setOpen(open === b.id ? null : b.id)} aria-expanded={open === b.id}>
            <span><span className="font-semibold">{b.nom}</span> <span className="text-xs opacity-60">{b.type}{b.division ? ', ' + b.division : ''}</span></span>
            <span aria-hidden>{open === b.id ? '−' : '+'}</span>
          </button>
          {open === b.id && (
            <div className="px-3 pb-3 text-sm">
              <p className="opacity-80 mb-2">{b.resume}</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 list-disc pl-5">
                {b.unites.map(u => <li key={u.nom}>{u.nom}{u.lieu ? `, ${u.lieu}` : ''}{u.note ? <span className="opacity-60"> ({u.note})</span> : null}</li>)}
              </ul>
            </div>)}
        </div>))}
    </div>
    <h2 className="font-serif text-xl font-bold mb-2">Commandements</h2>
    <ul className="list-disc pl-5 text-sm space-y-1">{commandements.map(c => <li key={c}>{c}</li>)}</ul>
  </>)
}

function Regiments() {
  const [q, setQ] = useState('')
  const list = useMemo(() => regiments.filter(r => (r.sigle + r.nom + r.garnison + r.brigade).toLowerCase().includes(q.toLowerCase())), [q])
  return (<>
    <H>Régiments</H>
    <Intro>14 fiches vérifiées sur les pages officielles. Les 90 régiments figurent dans les brigades ; les fiches s'ajoutent au fil des vérifications.</Intro>
    <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher (sigle, ville, brigade)" aria-label="Rechercher un régiment" className="border border-kaki bg-white px-3 py-2 w-full max-w-md mb-6" />
    <div className="grid md:grid-cols-2 gap-3">
      {list.map(r => (
        <article key={r.sigle} className="border border-sable bg-white/50">
          {r.image && <Photo src={IMG + r.image} alt={`${r.sigle}, ${r.nom}`} />}
          <div className="p-4">
          <h3 className="font-serif font-bold text-lg">{r.sigle}</h3>
          <div className="text-sm opacity-70">{r.nom}</div>
          <div className="text-sm mt-1">{r.garnison}, {r.brigade}</div>
          {r.devise && <div className="italic text-sm mt-2 text-rouille">« {r.devise} »</div>}
          <p className="text-sm mt-2">{r.fait}</p>
          </div>
        </article>))}
      {list.length === 0 && <p>Aucun résultat.</p>}
    </div>
  </>)
}

function Grades() {
  const corps = [...new Set(grades.map(g => g.corps))]
  return (<>
    <H>Grades</H>
    <Intro>Du soldat au général d'armée. Les insignes dessinés sont schématiques (chevrons, barrettes, étoiles) et ne couvrent que les grades dont le nombre est confirmé.</Intro>
    {corps.map(c => (
      <section key={c} className="mb-6">
        <h2 className="font-serif text-lg font-bold border-b border-kaki mb-2">{c}</h2>
        <ul className="divide-y divide-sable">
          {grades.filter(g => g.corps === c).map(g => <li key={g.nom} className="py-2 flex items-center gap-4"><Insigne nom={g.nom} /><span className="font-semibold flex-1">{g.nom}</span><span className="text-sm opacity-70 text-right">{g.note}</span></li>)}
        </ul>
      </section>))}
  </>)
}

function Ecoles() {
  return (<>
    <H>Écoles</H>
    <Intro>Formation des officiers, sous-officiers et spécialistes.</Intro>
    <div className="grid md:grid-cols-2 gap-3">
      {ecoles.map(e => (
        <article key={e.sigle} className="border border-sable bg-white/50 p-4">
          <h3 className="font-serif font-bold text-lg">{e.sigle}</h3>
          <div className="text-sm opacity-70">{e.nom}</div>
          <div className="text-sm mt-1 font-semibold">{e.lieu}</div>
          <p className="text-sm mt-2">{e.fait}</p>
        </article>))}
    </div>
  </>)
}

function Glossaire() {
  return (<>
    <H>Glossaire</H>
    <Intro>Sigles et termes courants.</Intro>
    <dl className="divide-y divide-sable">
      {glossaire.map(g => <div key={g.terme} className="py-2"><dt className="font-bold text-kaki">{g.terme}</dt><dd className="text-sm">{g.def}</dd></div>)}
    </dl>
  </>)
}

function Equipements() {
  const cats = ['Toutes', ...new Set(equipements.map(e => e.categorie))]
  const [c, setC] = useState('Toutes')
  const list = equipements.filter(e => c === 'Toutes' || e.categorie === c)
  return (<>
    <H>Équipements</H>
    <Intro>Dix matériels majeurs. Chaque chiffre vient de la fiche officielle liée sous la carte. Quand une fiche ne donne pas une information, elle n'apparaît pas.</Intro>
    <div className="flex flex-wrap gap-2 mb-6">
      {cats.map(k => <button key={k} onClick={() => setC(k)} className={`px-3 py-1 border text-sm ${c === k ? 'bg-kaki text-fond border-kaki' : 'border-kaki'}`}>{k}</button>)}
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      {list.map(e => (
        <article key={e.id} className="border border-sable bg-white/50">
          <Photo src={e.image} alt={e.nom} />
          <div className="p-4">
            <div className="text-xs uppercase tracking-wide text-rouille">{e.categorie}</div>
            <h3 className="font-serif font-bold text-xl">{e.nom}</h3>
            <p className="text-sm mt-1 mb-3">{e.role}</p>
            <dl className="text-sm divide-y divide-sable">
              {e.specs.map(([k, v]) => <div key={k} className="py-1 grid grid-cols-3 gap-2"><dt className="opacity-60">{k}</dt><dd className="col-span-2">{v}</dd></div>)}
            </dl>
            <a href={e.source} target="_blank" rel="noreferrer" className="text-xs underline text-kaki mt-3 inline-block">Fiche officielle</a>
          </div>
        </article>))}
    </div>
  </>)
}

function Operations() {
  return (<>
    <H>Opérations</H>
    <Intro>Ce que l'armée de Terre fait en ce moment, en France et à l'étranger.</Intro>
    <div className="grid grid-cols-3 gap-3 mb-8">
      {bilanEngagements.map(c => (
        <div key={c.label} className="border border-sable bg-white/50 p-3">
          <div className="font-serif text-2xl font-bold text-kaki">{c.valeur}</div>
          <div className="text-sm font-semibold">{c.label}</div>
          <div className="text-xs opacity-60">{c.note}</div>
        </div>))}
    </div>
    <div className="space-y-3">
      {operations.map(o => (
        <article key={o.id} className="border border-sable bg-white/50 p-4">
          <h3 className="font-serif font-bold text-xl">{o.nom} <span className="text-sm font-normal opacity-60">{o.lieu}</span></h3>
          <div className="text-sm text-rouille">{o.cadre}</div>
          <ul className="list-disc pl-5 text-sm mt-2">{o.faits.map(f => <li key={f}>{f}</li>)}</ul>
          <a href={o.source} target="_blank" rel="noreferrer" className="text-xs underline text-kaki mt-2 inline-block">Source officielle</a>
        </article>))}
    </div>
  </>)
}

function Recherche() {
  const [q, setQ] = useState('')
  const t = q.trim().toLowerCase()
  const idx = useMemo(() => [
    ...regiments.map(r => ({ type: 'Régiment', to: '/regiments', titre: r.sigle, texte: `${r.nom} ${r.garnison} ${r.brigade} ${r.fait}` })),
    ...brigades.flatMap(b => b.unites.map(u => ({ type: 'Unité', to: '/organisation', titre: u.nom, texte: `${b.nom} ${u.lieu ?? ''} ${u.note ?? ''}` }))),
    ...equipements.map(e => ({ type: 'Équipement', to: '/equipements', titre: e.nom, texte: `${e.role} ${e.specs.map(x => x.join(' ')).join(' ')}` })),
    ...operations.map(o => ({ type: 'Opération', to: '/operations', titre: o.nom, texte: `${o.lieu} ${o.cadre} ${o.faits.join(' ')}` })),
    ...grades.map(g => ({ type: 'Grade', to: '/grades', titre: g.nom, texte: `${g.corps} ${g.note ?? ''}` })),
    ...ecoles.map(e => ({ type: 'École', to: '/ecoles', titre: e.sigle, texte: `${e.nom} ${e.lieu} ${e.fait}` })),
    ...glossaire.map(g => ({ type: 'Glossaire', to: '/glossaire', titre: g.terme, texte: g.def })),
  ], [])
  const res = t.length < 2 ? [] : idx.filter(i => (i.titre + ' ' + i.texte).toLowerCase().includes(t)).slice(0, 60)
  return (<>
    <H>Recherche</H>
    <Intro>Un mot, un sigle, une ville, un matériel.</Intro>
    <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="ex. Griffon, Calvi, caporal" aria-label="Recherche" className="border border-kaki bg-white px-3 py-2 w-full max-w-md mb-6" />
    <ul className="divide-y divide-sable">
      {res.map((r, i) => <li key={i} className="py-2"><L to={r.to} className="font-semibold underline text-kaki">{r.titre}</L> <span className="text-xs uppercase opacity-60 ml-2">{r.type}</span><div className="text-sm opacity-80 line-clamp-2">{r.texte}</div></li>)}
    </ul>
    {t.length >= 2 && res.length === 0 && <p>Aucun résultat.</p>}
  </>)
}

function Sources() {
  const s = [
    ['Armée de Terre, présentation et brigades', 'https://www.defense.gouv.fr/terre'],
    ['Unités de l\'armée de Terre', 'https://www.defense.gouv.fr/terre/unites-larmee-terre'],
    ['Missions et opérations de l\'armée de Terre', 'https://www.defense.gouv.fr/terre/engagements-larmee-terre/missions-operations-larmee-terre'],
    ['Équipements de l\'armée de Terre', 'https://www.defense.gouv.fr/terre/nos-materiels/nos-equipements-terre'],
    ['Livret chiffres clés 2025', 'https://www.defense.gouv.fr/terre'],
    ['Carrières militaires (recrutement)', 'https://www.carrieresmilitaires.fr'],
  ]
  return (<>
    <H>Sources et limites</H>
    <Intro>Chaque fait de ce site vient des pages officielles du ministère des Armées, consultées en 2026. Ce que je n'ai pas pu confirmer a été retiré plutôt que deviné.</Intro>
    <ul className="list-disc pl-5 space-y-1 mb-6">{s.map(([l, u]) => <li key={l}><a className="underline text-kaki" href={u} target="_blank" rel="noreferrer">{l}</a></li>)}</ul>
    <p className="text-sm opacity-80 mb-2">Photos : chargées depuis le site defense.gouv.fr, crédit « © armée de Terre/Défense » indiqué sous chaque image. Si le ministère déplace une image, elle est remplacée par un pictogramme.</p>
    <p className="text-sm opacity-80">Les insignes de grades sont des schémas originaux. Les fiches équipements et opérations renvoient chacune à leur page officielle. Ce site est indépendant et n'engage pas le ministère des Armées.</p>
  </>)
}

const root = createRootRoute({ component: Layout, notFoundComponent: () => <><H>Page introuvable</H><L to="/" className="underline">Retour à l'accueil</L></> })
const r = (path: string, component: () => React.JSX.Element) => createRoute({ getParentRoute: () => root, path, component })
const routeTree = root.addChildren([
  r('/', Accueil), r('/organisation', Organisation), r('/regiments', Regiments), r('/grades', Grades),
  r('/ecoles', Ecoles), r('/glossaire', Glossaire), r('/equipements', Equipements), r('/operations', Operations), r('/recherche', Recherche), r('/sources', Sources),
])
const router = createRouter({ routeTree, basepath: '/adterre-experte' })
declare module '@tanstack/react-router' { interface Register { router: typeof router } }

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><RouterProvider router={router} /></React.StrictMode>)
