// import { error } from '@sveltejs/kit'

import type { TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'

export const load = (async ({ locals, url, params }) => {
  const [pages] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": "accueil" }),
  ])

  return {
    page: pages.items[0],
  }
})