// import { error } from '@sveltejs/kit'
import { waitUntil } from '@vercel/functions'

import type { TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { email } from '$lib/clients/postmark'
import { languageTag } from '$lib/paraglide/runtime'

export const load = (async ({ locals, url, params }) => {
  const [pages] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": params.page, locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' }),
  ])

  return {
    page: pages.items[0],
  }
})

async function send(data: { [k: string]: FormDataEntryValue; } & { fichiers?: FormDataEntryValue[] }, to: string) {
  console.log(data)
  return await email.sendEmailWithTemplate({
      From: 'phil@phils.computer',
      To: to || 'sleblanc@intervia.ca',
      MessageStream: 'broadcast',
      ReplyTo:  data.email as string,
      TemplateAlias: 'base',
      TemplateModel: {
        subject: `Message de la part de ${data.nom}`,
        body: JSON.stringify(data, null, 2),
        product_url: "https://intervia.ca",
        product_name: "https://intervia.ca",
        company_name: "Intervia",
        company_address: "Intervia"
      },
      ...(data.fichiers && data.fichiers.length > 0) ? { Attachments: await Promise.all(data.fichiers.map(async (fichier: File) => ({
        Name: fichier.name,
        ContentID: `cid:${fichier.name}`,
        Content: Buffer.from((await fichier.arrayBuffer())).toString('base64'),
        ContentType: fichier.type
      }))) } : {}
    })
}

export const actions = {
	contact: async (event) => {
    const request = await event.request.formData()
    const fichiers = request.getAll('fichiers')
    const data = Object.fromEntries(request)

    // waitUntil(fetch('https://api.impreciseanalysis.com/api/spam', {
    //   method: 'POST',
    //   body: JSON.stringify({ query: data.message }),
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }))
    
    // Check if honeypot field is filled (spam detection)
    if (data.website) {
      return { success: true }; // Silently fail for bots
    }

    return send({
      ...data,
      fichiers
    } as { [k: string]: FormDataEntryValue; } & { fichiers?: FormDataEntryValue[] }, 'info@intervia.ca')
	},
  postuler: async (event) => {
    const request = await event.request.formData()
    const fichiers = request.getAll('fichiers')
    const data = Object.fromEntries(request)

    // waitUntil(fetch('https://api.impreciseanalysis.com/api/spam', {
    //   method: 'POST',
    //   body: JSON.stringify({ query: data.message }),
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }))
    
    // Check if honeypot field is filled (spam detection)
    if (data.website) {
      return { success: true }; // Silently fail for bots
    }

    return send({
      ...data,
      fichiers
    } as { [k: string]: FormDataEntryValue; } & { fichiers?: FormDataEntryValue[] }, 'talents@intervia.ca')
	},
}