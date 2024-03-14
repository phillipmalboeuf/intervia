// import { error } from '@sveltejs/kit'

import type { TypeMembreSkeleton, TypePageSkeleton, TypeServiceSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'

export const load = (async ({ locals, url, params }) => {
  const [pages, membres] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": "a-propos" }),
    content.getEntries<TypeMembreSkeleton>({ content_type: "membre", include: 2, order: ["fields.nom"], limit: 100 }),
  ])

  return {
    page: pages.items[0],
    membres
  }
})