// import { error } from '@sveltejs/kit'
import { fail } from '@sveltejs/kit'
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

function formatSendError(error: unknown) {
  const message = error instanceof Error ? error.message : ''
  if (message.includes('Attachments too big')) {
    return languageTag() === 'en'
      ? 'Attachments are too large. Total size must be under 10 MB.'
      : 'Les fichiers joints sont trop volumineux. La taille totale doit être inférieure à 10 Mo.'
  }
  return languageTag() === 'en'
    ? 'Unable to send your message. Please try again.'
    : 'Impossible d\'envoyer votre message. Veuillez réessayer.'
}

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

    const to = (data.sujet === "Opportunités d'emploi" || data.sujet === 'Career Opportunities')
      ? 'talents@intervia.ca'
      : 'info@intervia.ca'

    try {
      return await send({
        ...data,
        fichiers
      } as { [k: string]: FormDataEntryValue; } & { fichiers?: FormDataEntryValue[] }, to)
    } catch (error) {
      return fail(422, { error: formatSendError(error) })
    }
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

    try {
      return await send({
        ...data,
        fichiers
      } as { [k: string]: FormDataEntryValue; } & { fichiers?: FormDataEntryValue[] }, 'talents@intervia.ca')
    } catch (error) {
      return fail(422, { error: formatSendError(error) })
    }
	},
}