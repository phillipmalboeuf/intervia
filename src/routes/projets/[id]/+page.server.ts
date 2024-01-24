import type { TypeProjetSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {

  const [projet] = await Promise.all([
    content.getEntries<TypeProjetSkeleton>({ content_type: "projet", include: 2, "fields.id": params.id, limit: 1 }),
  ])

  return {
    projet: projet.items[0],
    // projets: projet.items[0].fields.services?.length && await content.getEntries<TypeProjetSkeleton>({ content_type: "projet", include: 1, "fields.id[ne]": params.id, limit: 3, links_to_entry: projet.items[0].fields.services[0].sys.id }),
    projets: projet.items[0].fields.services?.length && await content.getEntries<TypeProjetSkeleton>({ content_type: "projet", include: 1, limit: 3, links_to_entry: projet.items[0].fields.services[0].sys.id }),
    // services: Object.values(services).sort((a, b) => b.count - a.count)
  }
})