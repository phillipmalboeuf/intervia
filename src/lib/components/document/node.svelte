<script lang="ts">
  // import Gallery from '../Gallery.svelte'
  import Media from '../Media.svelte'
  import Mark from './mark.svelte'

  import { page } from '$app/stores'

  import type { TopLevelBlock } from '@contentful/rich-text-types'
  export let node: TopLevelBlock

  export let details = false
  export let i: number = undefined
</script>

{#if node.nodeType === 'heading-1'}
  <h1>{#each node.content as mark}<Mark mark={mark} />{/each}</h1>
{:else if node.nodeType === 'heading-2'}
  <h2>{#each node.content as mark}<Mark mark={mark} />{/each}</h2>
{:else if node.nodeType === 'heading-3'}
  <h3>{#each node.content as mark}<Mark mark={mark} />{/each}</h3>
{:else if node.nodeType === 'heading-4'}
  <h4>{#each node.content as mark}<Mark mark={mark} />{/each}</h4>
{:else if node.nodeType === 'heading-5'}
  <h5>{#each node.content as mark}<Mark mark={mark} />{/each}</h5>
{:else if node.nodeType === 'heading-6'}
  <h6>{#each node.content as mark}<Mark mark={mark} />{/each}</h6>
{:else if node.nodeType === 'paragraph'}
  <p>{#each node.content as mark}<Mark mark={mark} />{/each}</p>
{:else if node.nodeType === 'hr'}
  <hr />

{:else if node.nodeType === 'unordered-list'}
  <ul>
    {#each node.content as item}<li>{#each item.content as node}<svelte:self node={node} />{/each}</li>{/each}
  </ul>

{:else if node.nodeType === 'table'}
  {#if details}
  <section class="table">
    {#each node.content as item}<details>{#each item.content as node, i}<svelte:self node={node} details {i} />{/each}</details>{/each}
  </section>
  {:else}
  <table>
    {#each node.content as item}<tr>{#each item.content as node}<svelte:self node={node} />{/each}</tr>{/each}
  </table>
  {/if}
{:else if node.nodeType === 'table-header-cell'}
  {#if details}
  {#if i === 0}
  <summary>{#each node.content as item}<svelte:self node={item} />{/each}</summary>
  {:else}
  <main>{#each node.content as item}<svelte:self node={item} />{/each}</main>
  {/if}
  {:else}
  <th>{#each node.content as item}<svelte:self node={item} />{/each}</th>
  {/if}
{:else if node.nodeType === 'table-cell'}
  {#if details}
  {#if i === 0}
  <summary>{#each node.content as item}<svelte:self node={item} />{/each}</summary>
  {:else}
  <main>{#each node.content as item}<svelte:self node={item} />{/each}</main>
  {/if}
  {:else}
  <td>{#each node.content as item}<svelte:self node={item} />{/each}</td>
  {/if}

{:else if node.nodeType === 'blockquote'}
  <blockquote>{#each node.content as code}<svelte:self node={code} />{/each}</blockquote>

{:else if node.nodeType === 'embedded-asset-block'}
<Media media={node.data.target} />
{:else if node.nodeType === 'embedded-entry-block'}
  <!-- {#if node.data.target.sys.contentType.sys.id === 'collaboratorSlider'}
  {#if !$page.data.isMobile}
  <Gallery images={node.data.target.fields.collaborators.map(collaborator => ({
    thumbnail: collaborator.fields.photo,
    content: collaborator.fields,
    href: collaborator.fields.tagIdentifier && `films?director=${collaborator.fields.tagIdentifier}`
  }))}>
    <h6 slot="content" let:content={content}>
      {#if content.tagIdentifier}<a href={`films?director=${content.tagIdentifier}`}>{content.name}</a>{:else}{content.name}{/if}<br />
      {content.profession}<br />
    </h6>
  </Gallery>
  {:else}
  <div style="margin: 2rem 0">
  {#each node.data.target.fields.collaborators as collaborator}
  <a href="{collaborator.fields.tagIdentifier && `films?director=${collaborator.fields.tagIdentifier}`}">
    <h2>{collaborator.fields.name}</h2>
  </a>
  {/each}
  </div>
  {/if}
  {/if} -->
{/if}