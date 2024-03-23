import type { TypePageSkeleton, TypeProjetSkeleton, TypeServiceSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {

  const [services, pages] = await Promise.all([
    content.getEntries<TypeServiceSkeleton>({ content_type: "service", include: 2, "fields.id": params.id, limit: 1 }),
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": "parcours" }),
  ])

  return {
    service: services.items[0],
    page: pages.items[0],
  }
})