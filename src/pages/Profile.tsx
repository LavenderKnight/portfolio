import { BriefcaseBusiness, Github, Linkedin, Mail } from 'lucide-react'
import { CopyButton, DownloadResume, ExternalLink, Widget } from '../components/common'
import { experience } from '../data/experience'
import { education, profile, skillGroups } from '../data/profile'
import { projects } from '../data/projects'

function WorkHistory() {
  return <ol className="work-history">
    {experience.map((job) => <li key={job.id} id={`info-${job.id}`}>
      <BriefcaseBusiness size={16} aria-hidden="true" />
      <div><h3>{job.role} · {job.company}</h3><p className="muted">{job.dates}</p><ul>{job.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
    </li>)}
  </ol>
}

function Skills() {
  return <dl className="skill-groups" id="info-skills">{skillGroups.map((group) => <div key={group.name}>
    <dt>{group.name}</dt>
    <dd className="tag-list">{group.skills.map((skill) => <span key={skill} className="tag">{skill}</span>)}</dd>
  </div>)}</dl>
}

function Education() {
  return <div className="education">
    <h3>{education.school}</h3>
    <p>{education.degree} <span className="muted">· {education.dates}</span></p>
    <p>{education.certification}</p>
  </div>
}

export function Info({ item }: { item: string }) {
  if (item && item !== 'skills' && !experience.some((job) => job.id === item)) {
    return <Widget title="Profile detail unavailable"><a href="#/info">Back to Info</a></Widget>
  }
  return <div className="page-stack">
    <Widget title="Basic Information"><dl className="detail-facts">
      <div><dt>Name</dt><dd>{profile.name}</dd></div>
      <div><dt>Location</dt><dd>{profile.location}</dd></div>
      <div><dt>Headline</dt><dd>{profile.headline}</dd></div>
      <div><dt>Experience</dt><dd>{profile.years}</dd></div>
    </dl></Widget>
    <Widget title="About Me">{profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</Widget>
    <Widget title="Work and Education"><WorkHistory /><Education /></Widget>
    <Widget title="Technical Skills"><Skills /></Widget>
    <Widget title="Technical Interests"><p>Distributed systems, backend architecture, databases, AI engineering, RAG, agentic AI, security, and system design.</p></Widget>
  </div>
}

export function Resume() {
  return <div className="page-stack">
    <Widget title="Résumé">
      <div className="resume-intro"><div><h3>{profile.name}</h3><p>{profile.role}</p></div><DownloadResume className="button primary" /></div>
      <p>{profile.about[0]}</p>
    </Widget>
    <Widget title="Skills"><Skills /></Widget>
    <Widget title="Employment History"><WorkHistory /></Widget>
    <Widget title="Selected Projects"><ul className="simple-links">
      {projects.filter((project) => ['gamification', 'notifications', 'rag-assistant', 'codecompass'].includes(project.id))
        .map((project) => <li key={project.id}><a href={`#/projects/${project.id}`}>{project.title}</a></li>)}
    </ul></Widget>
    <Widget title="Education & Certifications"><Education /></Widget>
  </div>
}

export function Contact() {
  return <Widget title="Contact">
    <p>{profile.availability}. Get in touch by email or LinkedIn.</p>
    <ul className="contact-list">
      <li><Mail size={17} aria-hidden="true" /><div><strong>Email</strong>
        {profile.email ? <><a href={`mailto:${profile.email}`}>{profile.email}</a><CopyButton value={profile.email} label="Copy email" message="Email copied." /></> : <span className="muted">Email unavailable</span>}
      </div></li>
      <li><Linkedin size={17} aria-hidden="true" /><div><strong>LinkedIn</strong><ExternalLink href={profile.linkedIn}>Connect on LinkedIn</ExternalLink></div></li>
      <li><Github size={17} aria-hidden="true" /><div><strong>GitHub</strong>
        {profile.github ? <ExternalLink href={profile.github}>View profile</ExternalLink> : <span className="muted">GitHub profile pending</span>}
        {projects.find((project) => project.id === 'codecompass')?.source && <a href="#/projects/codecompass">CodeCompass AI repository details</a>}
      </div></li>
    </ul>
  </Widget>
}
