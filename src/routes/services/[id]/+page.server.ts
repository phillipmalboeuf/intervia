import type { TypePageSkeleton, TypeProjetSkeleton, TypeServiceSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'
import { languageTag } from '$lib/paraglide/runtime'

export const load = (async ({ locals, url, params }) => {

  const [services, pages] = await Promise.all([
    content.getEntries<TypeServiceSkeleton>({ content_type: "service", include: 2, "fields.id": params.id, limit: 1, locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' }),
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": "parcours", locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' }),
  ])

  return {
    service: services.items[0],
    page: pages.items[0],
  }
})