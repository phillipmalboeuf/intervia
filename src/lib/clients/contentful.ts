import contentful from 'contentful'

const preview = true
export const content = contentful.createClient({
  space: 'ewssfmtpsbbm',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'dinFHZI1hIR7Ke837Yu1Z08ISSHlCoJD1lNvqmOE-88' : '7sFqrARdWdfa8nt4sT2_qX7CFuL7UMjTKGcTY73zyMU',
}).withoutUnresolvableLinks