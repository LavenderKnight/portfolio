import { experience } from './data/experience'
import { notes } from './data/notes'
import { posts } from './data/posts'
import { profile, skillGroups } from './data/profile'
import { projects } from './data/projects'

export const asset = (path: string) => import.meta.env.BASE_URL + path

const searchEntries = [
  ...projects.map((project) => ({ title: project.title, label: 'Project', path: `#/projects/${project.id}`, text: [project.summary, ...project.stack].join(' ') })),
  ...skillGroups.flatMap((group) => group.skills.map((skill) => ({ title: skill, label: 'Skill', path: '#/info/skills', text: group.name }))),
  ...experience.map((job) => ({ title: `${job.role} · ${job.company}`, label: 'Experience', path: `#/info/${job.id}`, text: job.details.join(' ') })),
  ...posts.map((post) => ({ title: post.category, label: 'Wall post', path: `#/wall/${post.id}`, text: post.text })),
  ...notes.map((note) => ({ title: note.title, label: 'Note', path: `#/notes/${note.id}`, text: note.summary })),
]

export function searchPortfolio(query: string) {
  const search = query.trim().toLowerCase()
  if (!search) return []
  const words = search.split(/\s+/)
  return searchEntries
    .filter(({ title, label, text }) => words.every((word) => `${title} ${label} ${text}`.toLowerCase().includes(word)))
    .sort((first, second) => Number(second.title.toLowerCase().includes(search)) - Number(first.title.toLowerCase().includes(search)))
    .slice(0, 8)
}

export type GalleryItem =
  | { kind: 'diagram'; project: typeof projects[number] }
  | { kind: 'image'; image: string; title: string; caption: string }
  | { kind: 'journey'; title: string; caption: string }
  | { kind: 'certificate'; title: string; caption: string }

type Album = { id: string; title: string; items: GalleryItem[] }

function diagram(id: string): GalleryItem {
  const project = projects.find((entry) => entry.id === id)
  if (!project) throw new Error(`Album refers to an unknown project: ${id}`)
  return { kind: 'diagram', project }
}
export const albums: Album[] = [
  { id: 'architecture', title: 'System Architecture', items: [diagram('gamification'), diagram('rag-assistant'), diagram('notifications')] },
  { id: 'engineering', title: 'Engineering Projects', items: [diagram('codecompass'), diagram('workforce'), diagram('merchant-lending'), diagram('loss-ratio')] },
  { id: 'journey', title: 'My Development Journey', items: [{ kind: 'journey', title: 'From Android to backend', caption: 'Android → React Native → Django → Technical Leadership' }] },
  { id: 'certifications', title: 'Certifications', items: [{ kind: 'certificate', title: 'Associate Android Developer', caption: 'Google Associate Android Developer Certification' }] },
  { id: 'beyond', title: 'Beyond the Code', items: [
    { kind: 'image', image: profile.casualPhoto, title: 'Beyond the Code', caption: `A casual portrait of ${profile.name}.` },
    { kind: 'image', image: profile.avatar, title: 'Profile portrait', caption: `${profile.name} in a light blue shirt.` },
  ] },
]

export function galleryTitle(item: GalleryItem) {
  return item.kind === 'diagram' ? item.project.title : item.title
}
