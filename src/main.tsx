import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, createRootRoute, createRoute, Link, Outlet } from '@tanstack/react-router'
import './styles.css'
import { chiffres, divisions, commandements, brigades } from './data/organisation'
import { regiments } from './data/organisation'
import { grades } from './data/grades'
import { ecoles } from './data/ecoles'
import { glossaire } from './data/glossaire'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const L: any = Link
const nav = [
  ['/', 'Accueil'], ['/organisation', 'Organisation'], ['/regiments', 'Régiments'], ['/grades', 'Grades'],
  ['/ecoles', 'Écoles'], ['/glossaire', 'Glossaire'], ['/sources', 'Sources'],
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
    <div className="grid md:grid-cols-3 gap-3">
      {nav.slice(1, 6).map(([to, l]) => <L key={to} to={to} className="border border-kaki p-4 hover:bg-kaki hover:text-fond font-semibold">{l}</L>)}
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
    <Intro>Fiches vérifiées sur les pages officielles. Le catalogue complet des 90 régiments s'enrichit au fil des vérifications.</Intro>
    <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher (sigle, ville, brigade)" aria-label="Rechercher un régiment" className="border border-kaki bg-white px-3 py-2 w-full max-w-md mb-6" />
    <div className="grid md:grid-cols-2 gap-3">
      {list.map(r => (
        <article key={r.sigle} className="border border-sable bg-white/50 p-4">
          <h3 className="font-serif font-bold text-lg">{r.sigle}</h3>
          <div className="text-sm opacity-70">{r.nom}</div>
          <div className="text-sm mt-1">{r.garnison}, {r.brigade}</div>
          {r.devise && <div className="italic text-sm mt-2 text-rouille">« {r.devise} »</div>}
          <p className="text-sm mt-2">{r.fait}</p>
        </article>))}
      {list.length === 0 && <p>Aucun résultat.</p>}
    </div>
  </>)
}

function Grades() {
  const corps = [...new Set(grades.map(g => g.corps))]
  return (<>
    <H>Grades</H>
    <Intro>Du soldat au général d'armée.</Intro>
    {corps.map(c => (
      <section key={c} className="mb-6">
        <h2 className="font-serif text-lg font-bold border-b border-kaki mb-2">{c}</h2>
        <ul className="divide-y divide-sable">
          {grades.filter(g => g.corps === c).map(g => <li key={g.nom} className="py-2 flex justify-between gap-4"><span className="font-semibold">{g.nom}</span><span className="text-sm opacity-70 text-right">{g.note}</span></li>)}
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

function Sources() {
  const s = [
    ['Armée de Terre, présentation et brigades', 'https://www.defense.gouv.fr/terre'],
    ['Unités de l\'armée de Terre', 'https://www.defense.gouv.fr/terre/unites-larmee-terre'],
    ['Livret chiffres clés 2025', 'https://www.defense.gouv.fr/terre'],
    ['Carrières militaires (recrutement)', 'https://www.carrieresmilitaires.fr'],
  ]
  return (<>
    <H>Sources et limites</H>
    <Intro>Chaque fait de ce site vient des pages officielles du ministère des Armées, consultées en 2026. Ce que je n'ai pas pu confirmer a été retiré plutôt que deviné.</Intro>
    <ul className="list-disc pl-5 space-y-1 mb-6">{s.map(([l, u]) => <li key={l}><a className="underline text-kaki" href={u} target="_blank" rel="noreferrer">{l}</a></li>)}</ul>
    <p className="text-sm opacity-80">Les photos de l'ancienne version n'ont pas été reprises (licences et crédits non vérifiables). Les rubriques équipements et opérations sont retirées le temps d'être re-sourcées.</p>
  </>)
}

const root = createRootRoute({ component: Layout, notFoundComponent: () => <><H>Page introuvable</H><L to="/" className="underline">Retour à l'accueil</L></> })
const r = (path: string, component: () => React.JSX.Element) => createRoute({ getParentRoute: () => root, path, component })
const routeTree = root.addChildren([
  r('/', Accueil), r('/organisation', Organisation), r('/regiments', Regiments), r('/grades', Grades),
  r('/ecoles', Ecoles), r('/glossaire', Glossaire), r('/sources', Sources),
])
const router = createRouter({ routeTree, basepath: '/adterre-experte' })
declare module '@tanstack/react-router' { interface Register { router: typeof router } }

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><RouterProvider router={router} /></React.StrictMode>)
