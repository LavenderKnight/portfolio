import { useEffect, useRef, useState } from 'react'
import { Hand, MapPin, UserRoundPlus } from 'lucide-react'
import { Header } from './components/Header'
import { Avatar, Widget } from './components/common'
import { LeftSidebar, RightSidebar } from './components/Sidebars'
import { profile } from './data/profile'
import { Notes, Projects } from './pages/Library'
import { Photos } from './pages/Photos'
import { Contact, Info, Resume } from './pages/Profile'
import { Wall } from './pages/Wall'
import { routeFrom, sections } from './routes'

function ProfileHeader({ current }: { current: string }) {
  const [poked, setPoked] = useState(false)
  return <div className="profile-head">
    <div className="profile-summary">
      <Avatar decorative className="mobile-avatar" />
      <div>
        <h1>{profile.name}</h1>
        <p className="headline">{profile.headline}</p>
        <p className="profile-location"><MapPin size={13} aria-hidden="true" /> {profile.location}<span aria-hidden="true">·</span>{profile.years} in engineering</p>
      </div>
    </div>
    <div className="profile-actions">
      <a href={profile.linkedIn} target="_blank" rel="noreferrer" className="button primary"><UserRoundPlus size={15} aria-hidden="true" /> Connect on LinkedIn</a>
      <button type="button" className="button" onClick={() => setPoked(true)}><Hand size={14} aria-hidden="true" /> Poke</button>
      {poked && <span className="poke-status" role="status">Poke received. Hello from the wall!</span>}
    </div>
    <nav className="profile-tabs" aria-label="Profile tabs">
      {sections.map(({ id, label }) => <a key={id} className={id === 'contact' || id === 'resume' ? 'extra-tab' : undefined}
        href={`#/${id}`} aria-current={current === id ? 'page' : undefined}>{label}</a>)}
    </nav>
  </div>
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash)
  const route = routeFrom(hash)
  const main = useRef<HTMLElement>(null)
  const previousHash = useRef(hash)

  useEffect(() => {
    function sync() { setHash(window.location.hash) }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    const changed = previousHash.current !== hash
    previousHash.current = hash
    const anchor = route.valid && route.section === 'info' && route.item ? document.getElementById(`info-${route.item}`) : null
    if (changed) {
      main.current?.focus({ preventScroll: true })
      document.documentElement.scrollTop = 0
    }
    if (anchor) {
      anchor.setAttribute('tabindex', '-1')
      anchor.focus({ preventScroll: true })
      anchor.scrollIntoView?.({ block: 'start' })
    }
  }, [hash, route.item, route.section, route.valid])

  const pages = {
    wall: <Wall item={route.item} />,
    info: <Info item={route.item} />,
    projects: <Projects item={route.item} />,
    photos: <Photos key={route.item} item={route.item} />,
    notes: <Notes item={route.item} />,
    resume: <Resume />,
    contact: <Contact />,
  }
  const valid = route.valid && !(route.item && (route.section === 'resume' || route.section === 'contact'))

  return <>
    <Header section={route.section} />
    <div className="site-shell">
      <LeftSidebar section={route.section} />
      <div className="profile-main">
        <ProfileHeader current={route.section} />
        <main id="main-content" tabIndex={-1} ref={main} aria-label={sections.find((entry) => entry.id === route.section)?.label}>
          {valid ? pages[route.section] : <Widget title="Page unavailable"><a href="#/wall">Back to the wall</a></Widget>}
        </main>
      </div>
      <RightSidebar />
    </div>
    <footer className="site-footer">
      <span><strong>{profile.brand}</strong> <span className="footer-divider" aria-hidden="true">·</span> {profile.name}</span>
      <nav aria-label="Footer navigation"><a href="#/info">Info</a><a href="#/projects">Projects</a><a href="#/contact">Contact</a></nav>
    </footer>
  </>
}
