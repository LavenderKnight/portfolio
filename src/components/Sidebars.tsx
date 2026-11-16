import { ArrowUpRight, BriefcaseBusiness, ChevronRight, FileText, Github, Images, Info, Linkedin, Mail, MapPin, NotebookPen, PanelsTopLeft } from 'lucide-react'
import { siDjango, siDocker, siFastapi, siMysql, siPython, siReact, siRedis, siTypescript } from 'simple-icons'
import { experience } from '../data/experience'
import { featuredSkills, profile } from '../data/profile'
import { projects } from '../data/projects'
import { sections, type Section } from '../routes'
import { Avatar, DownloadResume, ProjectIcon, Widget } from './common'

const sectionIcons = { wall: PanelsTopLeft, info: Info, projects: BriefcaseBusiness, photos: Images, notes: NotebookPen, resume: FileText, contact: Mail }
const technologyIcons = [siPython, siDjango, siRedis, siMysql, siDocker, siReact, siTypescript, siFastapi]
const recommended = projects.filter((project) => ['gamification', 'rag-assistant', 'codecompass'].includes(project.id))

export function LeftSidebar({ section }: { section: Section }) {
  return <aside className="left-sidebar" aria-label="Profile sidebar">
    <div className="portrait-card">
      <a href="#/info" aria-label={`About ${profile.name}`}><Avatar /></a>
      <div className="portrait-caption"><strong>{profile.name}</strong><span>{profile.role}</span></div>
    </div>
    <nav className="side-nav" aria-label="Profile navigation">
      {sections.map(({ id, label }) => {
        const Icon = sectionIcons[id]
        return <a key={id} href={`#/${id}`} aria-current={id === section ? 'page' : undefined}>
          <Icon size={15} aria-hidden="true" />{label}{id === section && <ChevronRight className="nav-chevron" size={13} aria-hidden="true" />}
        </a>
      })}
    </nav>
    <Widget title="Developer Facts">
      <dl className="facts">
        <div><dt>Experience</dt><dd>{profile.years}</dd></div>
        <div><dt>Location</dt><dd>{profile.location}</dd></div>
        <div><dt>Specialization</dt><dd>{profile.specialization}</dd></div>
        <div><dt>Interested in</dt><dd>{profile.interests}</dd></div>
      </dl>
    </Widget>
    <Widget title="Find me online">
      <ul className="online-links">
        <li><a href={profile.linkedIn} target="_blank" rel="noreferrer"><Linkedin size={14} />LinkedIn<ArrowUpRight size={12} /></a></li>
        <li>{profile.github
          ? <a href={profile.github} target="_blank" rel="noreferrer"><Github size={14} />GitHub<ArrowUpRight size={12} /></a>
          : <span className="muted"><Github size={14} />GitHub profile pending</span>}</li>
      </ul>
    </Widget>
  </aside>
}

export function RightSidebar() {
  return <aside className="right-sidebar" aria-label="Professional highlights">
    <Widget title="Currently">
      <div className="available"><span className="status-dot" />Available for opportunities</div>
      <p className="availability-copy">{profile.availability}.</p>
      <p className="location"><MapPin size={13} aria-hidden="true" />{profile.location}</p>
    </Widget>
    <Widget title="Technical skills" action={<a href="#/info/skills">See all</a>}>
      <div className="tag-list">{featuredSkills.map((skill) => <a className="tag" href="#/info/skills" key={skill}>{skill}</a>)}</div>
    </Widget>
    <Widget title="Recently worked on">
      <a className="recent" href="#/info/kula"><span className="work-icon"><BriefcaseBusiness size={15} /></span><span><strong>Tenant-aware audit logging</strong><small>{experience[0].company} · Backend engineering</small></span></a>
    </Widget>
    <Widget title="Recommended projects" action={<a href="#/projects">See all</a>}>
      <ul className="recommended-list">{recommended.map((project) => <li key={project.id}>
        <a href={`#/projects/${project.id}`}><ProjectIcon project={project} /><span><strong>{project.title}</strong><small>{project.category}</small></span></a>
      </li>)}</ul>
    </Widget>
    <Widget title="Technologies I work with">
      <ul className="technology-grid">{technologyIcons.map((technology) => <li key={technology.slug}>
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: `#${technology.hex}` }}><path fill="currentColor" d={technology.path} /></svg>
        <span>{technology.title}</span>
      </li>)}</ul>
    </Widget>
    <Widget title="Résumé & contact">
      <div className="sidebar-contact">
        <DownloadResume />
        <a href="#/contact"><Mail size={14} aria-hidden="true" /> Contact information <ChevronRight size={13} aria-hidden="true" /></a>
      </div>
    </Widget>
  </aside>
}
