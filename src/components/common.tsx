import { useId, useState, type ReactNode } from 'react'
import { ArrowDownToLine, ArrowUpRight, Bell, Bot, ChartNoAxesCombined, CodeXml, CreditCard, MapPin, Trophy } from 'lucide-react'
import { profile } from '../data/profile'
import type { Project } from '../data/projects'
import { asset } from '../portfolio'

const projectIcons = { trophy: Trophy, bot: Bot, bell: Bell, credit: CreditCard, map: MapPin, chart: ChartNoAxesCombined, code: CodeXml }

export function Widget({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return <section className="widget">
    <div className="widget-heading"><h2>{title}</h2>{action}</div>
    <div className="widget-body">{children}</div>
  </section>
}

export function Avatar({ className = '', decorative = false }: { className?: string; decorative?: boolean }) {
  return <img className={`avatar ${className}`} src={asset(profile.avatar)} alt={decorative ? '' : profile.name} width="180" height="180" />
}

export function DownloadResume({ className = 'button' }: { className?: string }) {
  if (!profile.resume) return <p className="muted">Résumé PDF unavailable.</p>
  return <a className={className} href={asset(profile.resume)} download><ArrowDownToLine size={14} /> Download résumé</a>
}

export function ProjectIcon({ project }: { project: Project }) {
  const Icon = projectIcons[project.icon]
  return <span className={`project-icon ${project.icon}`}><Icon size={18} aria-hidden="true" /></span>
}

export function ProjectPreview({ project }: { project: Project }) {
  const grid = useId()
  const label = useId()
  const TitleIcon = projectIcons[project.icon]
  const Steps = [CodeXml, TitleIcon, ChartNoAxesCombined]
  return <div className={`project-preview ${project.icon}`}>
    <svg className="preview-grid" width="100%" height="100%" aria-hidden="true">
      <defs><pattern id={grid} width="15" height="15" patternUnits="userSpaceOnUse"><path d="M15 0H0V15" fill="none" stroke="currentColor" strokeOpacity=".16" /></pattern></defs>
      <rect width="100%" height="100%" fill={`url(#${grid})`} />
    </svg>
    <svg className="preview-flow" viewBox="0 0 358 70" role="img" aria-labelledby={label}>
      <title id={label}>{project.architecture.map((step) => step.label).join(' → ')}</title>
      {project.architecture.map((step, index) => {
        const Icon = Steps[index]
        return <g className="preview-segment" transform={`translate(${index * 125 + 4} 5)`} key={step.label}>
          {index > 0 && <path className="preview-arrow" d="M-19 29h12m-4-4 4 4-4 4" />}
          <rect className="preview-shadow" x="2" y="3" width="100" height="58" />
          <rect className="preview-node" width="100" height="58" />
          <Icon x="40" y="9" size={20} aria-hidden="true" />
          <text x="50" y="45" textAnchor="middle">{step.label}</text>
        </g>
      })}
    </svg>
  </div>
}

export function Architecture({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0)
  const title = useId()
  return <section className="architecture" aria-labelledby={title}>
    <h3 id={title}>Architecture</h3>
    <ProjectPreview project={project} />
    <div className="diagram-controls" aria-label="Architecture stages">
      {project.architecture.map((step, index) =>
        <button key={step.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{step.label}</button>,
      )}
    </div>
    <p aria-live="polite">{project.architecture[selected].detail}</p>
    <div className="tag-list">{project.stack.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
  </section>
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children} <ArrowUpRight size={12} className="inline-icon" aria-hidden="true" /></a>
}

export async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      // Some browser contexts expose the API without granting clipboard access.
    }
  }
  const target = document.createElement('textarea')
  const focused = document.activeElement
  target.value = value
  target.readOnly = true
  target.className = 'clipboard-fallback'
  document.body.append(target)
  target.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    target.remove()
    if (focused instanceof HTMLElement) focused.focus()
  }
}

export function CopyButton({ value, label, message, className = 'button' }: { value: string; label: string; message: string; className?: string }) {
  const [status, setStatus] = useState('')
  return <span className="copy-control">
    <button type="button" className={className} onClick={async () => setStatus(await copyText(value) ? message : 'Select and copy the text below.')}>{label}</button>
    <span className="copy-status" role="status">{status}</span>
    {status.startsWith('Select') && <input className="copy-value" readOnly aria-label="Text to copy" value={value} onFocus={(event) => event.currentTarget.select()} />}
  </span>
}

export function shareUrl(path: string) {
  const url = new URL(window.location.href)
  url.hash = path
  return url.href
}
