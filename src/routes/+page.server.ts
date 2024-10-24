// import { error } from '@sveltejs/kit'

import type { TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime'

export const load = (async ({ locals, url, params }) => {
  const [pages] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": "accueil", locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' }),
  ])

  return {
    page: pages.items[0],
  }
})