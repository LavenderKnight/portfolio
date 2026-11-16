import { ArrowLeft, ChevronRight, NotebookPen } from 'lucide-react'
import { Architecture, CopyButton, ExternalLink, ProjectIcon, shareUrl, Widget } from '../components/common'
import { notes } from '../data/notes'
import { projects, type Project } from '../data/projects'
import { profile } from '../data/profile'

function CaseStudy({ project }: { project: Project }) {
  const before = [
    ['Business problem', project.problem],
    ['Engineering requirements', project.requirements],
  ]
  const after = [
    ['My contribution', project.contribution],
    ['Technical challenges', project.challenge],
    ['Architectural trade-offs', project.tradeoff],
    ['Outcome', project.outcome],
    ['Lessons learned', project.lesson],
  ]
  return <article className="reading-pane">
    <a className="back-link" href="#/projects"><ArrowLeft size={14} /> All projects</a>
    <header className="article-header"><ProjectIcon project={project} /><div>
      <h2>{project.title}</h2><p>{project.category}</p>
    </div></header>
    <p className="context">{project.context}</p>
    <div className="article-actions">
      <CopyButton value={shareUrl(`/projects/${project.id}`)} label="Copy project link" message="Project link copied." />
      {project.source && <ExternalLink href={project.source}>View source repository</ExternalLink>}
    </div>
    <section><h3>Overview</h3><p>{project.summary}</p></section>
    {before.map(([heading, text]) => <section key={heading}><h3>{heading}</h3><p>{text}</p></section>)}
    <Architecture key={project.id} project={project} />
    {after.map(([heading, text]) => <section key={heading}><h3>{heading}</h3><p>{text}</p></section>)}
  </article>
}

export function Projects({ item }: { item: string }) {
  const project = projects.find((entry) => entry.id === item)
  if (project) return <CaseStudy project={project} />
  if (item) return <Widget title="Project unavailable"><a href="#/projects">See all projects</a></Widget>
  return <Widget title="Projects">
    <ul className="directory">{projects.map((entry) => <li key={entry.id}>
      <a href={`#/projects/${entry.id}`}>
        <ProjectIcon project={entry} />
        <span><strong>{entry.title}</strong><small>{entry.category}</small><span>{entry.summary}</span></span>
        <ChevronRight size={15} aria-hidden="true" />
      </a>
    </li>)}</ul>
  </Widget>
}

export function Notes({ item }: { item: string }) {
  const note = notes.find((entry) => entry.id === item)
  if (note) return <article className="reading-pane">
    <a className="back-link" href="#/notes"><ArrowLeft size={14} /> All notes</a>
    <header className="article-header">
      <span className="project-icon"><NotebookPen size={18} aria-hidden="true" /></span>
      <div><h2>{note.title}</h2><p>{profile.name} · {note.topic} · {note.time}</p></div>
    </header>
    <p className="context">{note.summary}</p>
    {note.sections.map((section) => <section key={section.heading}><h3>{section.heading}</h3><p>{section.body}</p></section>)}
  </article>
  if (item) return <Widget title="Note unavailable"><a href="#/notes">See all notes</a></Widget>
  return <Widget title="Notes"><ul className="directory">{notes.map((entry) => <li key={entry.id}>
    <a href={`#/notes/${entry.id}`}>
      <span className="project-icon"><NotebookPen size={18} aria-hidden="true" /></span>
      <span><strong>{entry.title}</strong><small>{entry.topic} · {entry.time}</small><span>{entry.summary}</span></span>
      <ChevronRight size={15} aria-hidden="true" />
    </a>
  </li>)}</ul></Widget>
}
