import { useEffect, useRef, useState } from 'react'
import { Bell, CodeXml, Mail, Search } from 'lucide-react'
import { profile } from '../data/profile'
import { searchPortfolio } from '../portfolio'
import type { Section } from '../routes'

export function Header({ section }: { section: Section }) {
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const search = useRef<HTMLFormElement>(null)
  const activity = useRef<HTMLDivElement>(null)
  const activityButton = useRef<HTMLButtonElement>(null)
  const results = searchPortfolio(query)
  const links = [
    { label: 'Home', href: 'wall' },
    { label: 'Profile', href: 'info' },
    { label: 'Projects', href: 'projects' },
    { label: 'Résumé', href: 'resume' },
  ]

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!(event.target instanceof Node)) return
      if (!activity.current?.contains(event.target)) setNotifications(false)
      if (!search.current?.contains(event.target)) setSearchOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [])

  function select(path: string) {
    setSearchOpen(false)
    setQuery('')
    window.location.hash = path
  }

  return <header className="topbar">
    <a className="skip-link" href="#main-content" onClick={(event) => {
      event.preventDefault()
      document.getElementById('main-content')?.focus()
    }}>Skip to content</a>
    <div className="topbar-inner">
      <a href="#/wall" className="wordmark"><span><CodeXml size={17} strokeWidth={2.3} aria-hidden="true" /></span>{profile.brand}</a>
      <form ref={search} className="search" role="search" onSubmit={(event) => {
        event.preventDefault()
        if (results[0]) select(results[0].path)
      }} onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setSearchOpen(false)
      }} onKeyDown={(event) => {
        if (event.key === 'Escape') {
          search.current?.querySelector('input')?.focus()
          setSearchOpen(false)
        }
      }}>
        <input aria-label="Search portfolio" aria-controls={searchOpen && query.trim() ? 'search-results' : undefined}
          type="search" placeholder="Search devbook" value={query} autoComplete="off"
          onFocus={() => setSearchOpen(true)} onChange={(event) => { setQuery(event.target.value); setSearchOpen(true) }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' && results.length && searchOpen) {
              event.preventDefault()
              search.current?.querySelector<HTMLAnchorElement>('.search-result')?.focus()
            }
          }} />
        <button aria-label="Open first search result" type="submit"><Search size={15} aria-hidden="true" /></button>
        {searchOpen && query.trim() && <div className="top-popup search-results" id="search-results">
          <p className="popup-title" role="status">{results.length ? 'Search results' : 'No matching results'}</p>
          {results.map((result) => <a className="search-result" key={result.label + result.title} href={result.path}
            onClick={() => { setQuery(''); setSearchOpen(false) }}><span>{result.title}</span><small>{result.label}</small></a>)}
        </div>}
      </form>
      <nav className="top-nav" aria-label="Main navigation">
        {links.map((link) => <a key={link.href} href={`#/${link.href}`} aria-current={section === link.href ? 'page' : undefined}>{link.label}</a>)}
      </nav>
      <div className="top-actions">
        <a className="top-icon" href="#/contact" aria-label="Contact"><Mail size={17} aria-hidden="true" /></a>
        <div ref={activity} className="activity" onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setNotifications(false)
        }} onKeyDown={(event) => {
          if (event.key === 'Escape') { setNotifications(false); activityButton.current?.focus() }
        }}>
          <button ref={activityButton} type="button" className="top-icon" aria-label="Notifications" aria-expanded={notifications}
            aria-controls="activity-panel" onClick={() => setNotifications(!notifications)}><Bell size={17} aria-hidden="true" /></button>
          <div className="top-popup activity-panel" id="activity-panel" hidden={!notifications}>
            <p className="popup-title">Portfolio activity</p>
            <a href="#/projects/codecompass" onClick={() => setNotifications(false)}>Explore CodeCompass AI</a>
            <a href="#/notes/idempotency" onClick={() => setNotifications(false)}>Read the note on idempotency</a>
          </div>
        </div>
      </div>
      <a className="top-identity" href="#/info">{profile.name}</a>
    </div>
  </header>
}
