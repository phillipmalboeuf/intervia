import type { TypeArticleSkeleton, TypeProjetSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  const filter = url.searchParams.get("categorie")

  const all = await content.getEntries<TypeArticleSkeleton>({ content_type: "article", include: 1, select: ["fields.categorie"], "fields.date[exists]": true, order: ["-fields.date"], limit: 200 })

  let categories: {[id: string]: {
    id: string,
    sys: string,
    titre: string,
    count: number
  }} = {}

  all.items.forEach(article => {
    if (article.fields?.categorie?.fields) {
      if (categories[article.fields.categorie.fields.id]) {
        categories[article.fields.categorie.fields.id].count += 1
      } else {
        categories[article.fields.categorie.fields.id] = {
          id: article.fields.categorie.fields.id,
          sys: article.fields.categorie.sys.id,
          titre: article.fields.categorie.fields.titre,
          count: 1
        }
      }
    }
  })

  const [vedettes, articles] = await Promise.all([
    content.getEntries<TypeArticleSkeleton>({ content_type: "article", include: 2, "fields.vedette": true, order: ["-fields.date"], limit: 3, ...filter ? { links_to_entry: categories[filter].sys } : {} }),
    content.getEntries<TypeArticleSkeleton>({ content_type: "article", include: 2, order: ["-fields.date"],  limit: 12, ...filter ? { links_to_entry: categories[filter].sys } : {} }),
  ])

  return {
    categorie: filter && categories[filter],
    vedettes,
    articles,
    categories: Object.values(categories).sort((a, b) => b.count - a.count)
  }
})