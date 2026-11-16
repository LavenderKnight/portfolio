import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Award, ChevronLeft, ChevronRight, CodeXml, X } from 'lucide-react'
import { Architecture, ProjectPreview, Widget } from '../components/common'
import { albums, asset, galleryTitle, type GalleryItem } from '../portfolio'

function GalleryVisual({ item, expanded = false }: { item: GalleryItem; expanded?: boolean }) {
  if (item.kind === 'diagram') return expanded ? <Architecture project={item.project} /> : <ProjectPreview project={item.project} />
  if (item.kind === 'image') return <img className="album-photo" src={asset(item.image)} alt={item.caption} loading={expanded ? 'eager' : 'lazy'} />
  return <div className={`album-illustration ${item.kind}`}>
    {item.kind === 'certificate' ? <Award size={34} aria-hidden="true" /> : <CodeXml size={34} aria-hidden="true" />}
    <strong>{item.title}</strong>
    {expanded && <p>{item.caption}</p>}
  </div>
}

function Lightbox({ items, initialIndex, onClose }: { items: GalleryItem[]; initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex)
  const dialog = useRef<HTMLDialogElement>(null)
  const item = items[index]

  useEffect(() => {
    const element = dialog.current
    const trigger = document.activeElement
    element?.showModal()
    return () => {
      element?.close()
      if (trigger instanceof HTMLElement && document.contains(trigger)) trigger.focus()
    }
  }, [])

  function move(offset: number) {
    setIndex((current) => (current + offset + items.length) % items.length)
  }

  return <dialog className="lightbox" ref={dialog} aria-labelledby="lightbox-title"
    onCancel={(event) => { event.preventDefault(); onClose() }}
    onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    onKeyDown={(event) => {
      if (items.length < 2) return
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
    }}>
    <div className="lightbox-shell">
      <header><h2 id="lightbox-title">{galleryTitle(item)}</h2><button type="button" aria-label="Close photo viewer" onClick={onClose}><X size={19} /></button></header>
      <div className="lightbox-body"><GalleryVisual key={index} item={item} expanded /></div>
      <footer>
        <button type="button" className="button" disabled={items.length < 2} aria-label="Previous image" onClick={() => move(-1)}><ChevronLeft size={15} /> Previous</button>
        <span role="status">{index + 1} of {items.length}</span>
        <button type="button" className="button" disabled={items.length < 2} aria-label="Next image" onClick={() => move(1)}>Next <ChevronRight size={15} /></button>
      </footer>
    </div>
  </dialog>
}

export function Photos({ item }: { item: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const album = albums.find((entry) => entry.id === item)
  if (album) return <Widget title={album.title}>
    <a className="back-link" href="#/photos"><ArrowLeft size={14} /> All albums</a>
    <ul className="album-grid">{album.items.map((entry, index) => <li key={galleryTitle(entry)}>
      <button className="album-cover" type="button" onClick={() => setOpenIndex(index)}>
        <GalleryVisual item={entry} />
        <span className="album-label"><strong>{galleryTitle(entry)}</strong></span>
      </button>
    </li>)}</ul>
    {openIndex !== null && <Lightbox items={album.items} initialIndex={openIndex} onClose={() => setOpenIndex(null)} />}
  </Widget>
  if (item) return <Widget title="Album unavailable"><a href="#/photos">See all albums</a></Widget>
  return <Widget title="Photo Albums"><ul className="album-grid">
    {albums.map((entry) => <li key={entry.id}><a className="album-cover" href={`#/photos/${entry.id}`}>
      <GalleryVisual item={entry.items[0]} />
      <span className="album-label"><strong>{entry.title}</strong><small>{entry.items.length} {entry.items.length === 1 ? 'item' : 'items'}</small></span>
    </a></li>)}
  </ul></Widget>
}
