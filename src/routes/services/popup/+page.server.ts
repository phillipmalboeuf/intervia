import type { TypeProjetSkeleton, TypeServiceSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {

  const titres = url.searchParams.get("s")?.split("|")
  console.log(titres)

  const [services] = await Promise.all([
    content.getEntries<TypeServiceSkeleton>({ content_type: "service", include: 2, "fields.titre[in]": titres, limit: 30 }),
  ])

  return {
    services
  }
})