import type { TypeArticleSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {

  const [article] = await Promise.all([
    content.getEntries<TypeArticleSkeleton>({ content_type: "article", include: 2, "fields.id": params.id, limit: 1 }),
  ])

  return {
    article: article.items[0],
    articles: article.items[0].fields.categorie && await content.getEntries<TypeArticleSkeleton>({ content_type: "article", include: 1, limit: 3, links_to_entry: article.items[0].fields.categorie.sys.id }),
  }
})