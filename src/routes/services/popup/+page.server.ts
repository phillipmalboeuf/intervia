import type { TypePageSkeleton, TypeProjetSkeleton, TypeServiceSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {

  const titres = url.searchParams.get("s")?.split("|")

  const [services, pages] = await Promise.all([
    content.getEntries<TypeServiceSkeleton>({ content_type: "service", include: 2, "fields.titre[in]": titres, limit: 30 }),
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": "parcours" }),
  ])

  return {
    services,
    page: pages.items[0],
  }
})