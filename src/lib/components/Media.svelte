<script lang="ts">
  import type { Asset } from 'contentful'

  export let media: Asset<"WITHOUT_UNRESOLVABLE_LINKS">
  export let small = false
  export let noDescription = false
  export let ar: number = undefined
  export let eager = false
  export let video: HTMLVideoElement = undefined

  function cdn(url: string) {
    // return url.replace('https://images.ctfassets.net/vgc87z7vc7p3', 'https://quebecsolidaire-images.imgix.net')
    return url
  }
</script>

<style>
  img,
  video,
  audio {
    display: block;
    width: 100%;
    object-fit: cover;
  }

  video {
    background-color: var(--background-inverse);
    cursor: pointer;
  }
 
  audio::-webkit-media-controls-enclosure {
    background-color: var(--background-inverse);
  }
</style>

{#if media}
{#if typeof media !== 'string'}
{#if media.fields.file.contentType.startsWith('video/')}
<!-- svelte-ignore a11y-media-has-caption -->
<video src="{cdn(media.fields.file.url)}" controls={!eager} bind:this={video} autoplay={eager} muted={eager} loop={eager} playsinline />
{:else if media.fields.file.contentType.startsWith('audio/')}
<!-- {#if !noDescription && media}
<small>{media}</small>
{/if} -->
<!-- svelte-ignore a11y-media-has-caption -->
<audio src="{cdn(media.fields.file.url)}" controls />
{:else}
<!-- {JSON.stringify(media, null, 2)} -->
<picture>
  {#if small}
  <source srcSet="{cdn(media.fields.file.url)}?w=400{ar ? `&fit=fill&h=${Math.round(400 * ar)}` : ''}" media="(max-width: 900px)" />
  <source srcSet="{cdn(media.fields.file.url)}?w=600{ar ? `&fit=fill&h=${Math.round(600 * ar)}` : ''}" media="(max-width: 1200px)" />
  <img src="{cdn(media.fields.file.url)}?w=800{ar ? `&fit=fill&h=${Math.round(800 * ar)}` : ''}"
    style={ar ? `aspect-ratio: 800 / ${Math.round(ar * 800) + 2}` : ''}
    alt="{media.fields.title}" loading={eager ? "eager" : "lazy"} />
  {:else}
  <source srcSet="{cdn(media.fields.file.url)}?w=900{ar ? `&fit=fill&h=${Math.round(900 * ar)}` : ''}" media="(max-width: 900px)" />
  <source srcSet="{cdn(media.fields.file.url)}?w=1200{ar ? `&fit=fill&h=${Math.round(1200 * ar)}` : ''}" media="(max-width: 1200px)" />
  <img src="{cdn(media.fields.file.url)}?w=1800{ar ? `&fit=fill&h=${Math.round(1800 * ar)}` : ''}"
    style={ar ? `aspect-ratio: 1800 / ${Math.round(ar * 1800) + 2}` : ''}
    alt="{media.fields.title}" loading={eager ? "eager" : "lazy"} />
  {/if}
</picture>

<!-- {#if !noDescription && media.caption}
<small><Rich text={media.caption} /></small>
{/if} -->
{/if}
{:else}
<picture>
  <img src="{cdn(media)}?w=100{ar ? `&fit=fill&h=${Math.round(100 * ar)}` : ''}"
    style={ar ? `aspect-ratio: 100 / ${Math.round(ar * 100)}` : ''}
    alt="" loading={eager ? "eager" : "lazy"} />
</picture>
{/if}
{/if}