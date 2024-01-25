// import { error } from '@sveltejs/kit'

import type { TypePageSkeleton, TypeServiceSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'

export const load = (async ({ locals, url, params }) => {
  const [pages, vedettes] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": "services" }),
    content.getEntries<TypeServiceSkeleton>({ content_type: "service", include: 2, "fields.vedette": true, order: ["fields.titre"], limit: 3 }),
  ])

  return {
    page: pages.items[0],
    vedettes
  }
})