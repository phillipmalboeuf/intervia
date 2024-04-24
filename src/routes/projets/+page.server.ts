import type { TypeProjetSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  const filter = url.searchParams.get("service")

  const all = await content.getEntries<TypeProjetSkeleton>({ content_type: "projet", include: 1, select: ["fields.services"], order: ["-fields.date"], limit: 200 })

  let services: {[id: string]: {
    id: string,
    sys: string,
    titre: string,
    count: number
  }} = {}

  all.items.forEach(projet => {
    projet.fields.services?.forEach(service => {
      if (services[service.fields.id]) {
        services[service.fields.id].count += 1
      } else {
        services[service.fields.id] = {
          id: service.fields.id,
          sys: service.sys.id,
          titre: service.fields.titre,
          count: 1
        }
      }
    })
  })

  const [vedettes, projets] = await Promise.all([
    content.getEntries<TypeProjetSkeleton>({ content_type: "projet", include: 2, "fields.vedette": true, order: ["-fields.date"], limit: 3, ...filter ? { links_to_entry: services[filter].sys } : {} }),
    content.getEntries<TypeProjetSkeleton>({ content_type: "projet", include: 2, order: ["-fields.date"],  limit: 30, ...filter ? { links_to_entry: services[filter].sys } : {} }),
  ])

  return {
    service: filter && services[filter],
    vedettes,
    projets,
    services: Object.values(services).sort((a, b) => b.count - a.count)
  }
})