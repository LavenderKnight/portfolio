export const sections = [
  { id: 'wall', label: 'Wall' },
  { id: 'info', label: 'Info' },
  { id: 'projects', label: 'Projects' },
  { id: 'photos', label: 'Photos' },
  { id: 'notes', label: 'Notes' },
  { id: 'resume', label: 'Résumé' },
  { id: 'contact', label: 'Contact' },
] as const

export type Section = typeof sections[number]['id']
export type Route = { section: Section; item: string; valid: boolean }

export function routeFrom(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/')
  const [name, item = ''] = parts
  const section = sections.find((entry) => entry.id === name)
  return { section: section?.id ?? 'wall', item, valid: !hash || hash === '#/' || Boolean(section && parts.length <= 2) }
}
