// import { error } from '@sveltejs/kit'

import type { TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'

import UAParser from 'ua-parser-js'

export const load = (async ({ locals, url, params, request }) => {
  let parser: UAParser = request.headers.has('User-Agent') && new UAParser(request.headers.get('User-Agent'))
  // const [pages] = await Promise.all([
  //   content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": "accueil" }),
  // ])

  return {
    // page: pages.items[0],
    device: parser?.getDevice().type || 'desktop'
  }
})