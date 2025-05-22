// import { error } from '@sveltejs/kit'

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

async function send(data: { [k: string]: FormDataEntryValue; }, to: string) {
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
      ...(data.fichiers && (data.fichiers as File).size) ? { Attachments: [{
        Name: (data.fichiers as File).name,
        ContentID: `cid:${(data.fichiers as File).name}`,
        Content: Buffer.from((await (data.fichiers as File).arrayBuffer())).toString('base64'),
        ContentType: (data.fichiers as File).type
      }] } : {}
    })
}

export const actions = {
	contact: async (event) => {
    const data = Object.fromEntries(await event.request.formData())
    
    // Check if honeypot field is filled (spam detection)
    if (data.website) {
      return { success: true }; // Silently fail for bots
    }

    return send(data, 'info@intervia.ca')
	},
  postuler: async (event) => {
    const data = Object.fromEntries(await event.request.formData())
    
    // Check if honeypot field is filled (spam detection)
    if (data.website) {
      return { success: true }; // Silently fail for bots
    }

    return send(data, 'talents@intervia.ca')
	},
}