<script lang="ts">
  // import Gallery from '../Gallery.svelte'
  import Media from '../Media.svelte'
  import Mark from './mark.svelte'
  import Scrollin from '../Scrollin.svelte'

  import { page } from '$app/stores'

  import type { TopLevelBlock } from '@contentful/rich-text-types'
  export let node: TopLevelBlock

  export let details = false
  export let i: number = 0
</script>

{#if node.nodeType === 'heading-1'}
  <h1><Scrollin>{#each node.content as mark}<Mark mark={mark} {i} />{/each}</Scrollin></h1>
{:else if node.nodeType === 'heading-2'}
  <h2><Scrollin>{#each node.content as mark}<Mark mark={mark} {i} />{/each}</Scrollin></h2>
{:else if node.nodeType === 'heading-3'}
  <h3><Scrollin>{#each node.content as mark}<Mark mark={mark} {i} />{/each}</Scrollin></h3>
{:else if node.nodeType === 'heading-4'}
  <h4><Scrollin>{#each node.content as mark}<Mark mark={mark} {i} />{/each}</Scrollin></h4>
{:else if node.nodeType === 'heading-5'}
  <h5><Scrollin>{#each node.content as mark}<Mark mark={mark} {i} />{/each}</Scrollin></h5>
{:else if node.nodeType === 'heading-6'}
  <h6><Scrollin>{#each node.content as mark}<Mark mark={mark} {i} />{/each}</Scrollin></h6>
{:else if node.nodeType === 'paragraph'}
  <p><Scrollin>{#each node.content as mark}<Mark mark={mark} {i} />{/each}</Scrollin></p>
{:else if node.nodeType === 'hr'}
  <hr />

{:else if node.nodeType === 'unordered-list'}
  <ul>
    {#each node.content as item}<li><Scrollin>{#each item.content as node}<svelte:self node={node} />{/each}</Scrollin></li>{/each}
  </ul>

{:else if node.nodeType === 'table'}
  {#if details && node.content[0].content[0].nodeType !== 'table-header-cell'}
  <section class="table">
    {#each node.content as item}<details>{#each item.content as node, i}<svelte:self node={node} details {i} />{/each}</details>{/each}
  </section>
  {:else}
  <table>
    {#each node.content as item}<tr style="--length: {item.content?.length}">{#each item.content as node}<svelte:self node={node} />{/each}</tr>{/each}
  </table>
  {/if}
{:else if node.nodeType === 'table-header-cell'}
  {#if details}
  {#if i === 0}
  <summary>{#each node.content as item}<svelte:self node={item} />{/each} <svg width="0.75em" height="0.75em" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"> <line x1="0.707107" y1="0.7072" x2="7.77817" y2="7.77827" stroke-width="2"/> <line x1="13.4337" y1="0.707107" x2="6.3626" y2="7.77817" stroke-width="2"/> </svg></summary>
  {:else}
  <main>{#each node.content as item}<svelte:self node={item} />{/each}</main>
  {/if}
  {:else}
  <th colspan="2">{#each node.content as item}<svelte:self node={item} />{/each}</th>
  {/if}
{:else if node.nodeType === 'table-cell'}
  {#if details}
  {#if i === 0}
  <summary>{#each node.content as item}<svelte:self node={item} />{/each} <svg width="0.75em" height="0.75em" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"> <line x1="0.707107" y1="0.7072" x2="7.77817" y2="7.77827" stroke-width="2"/> <line x1="13.4337" y1="0.707107" x2="6.3626" y2="7.77817" stroke-width="2"/> </svg></summary>
  {:else}
  <main>{#each node.content as item}<svelte:self node={item} />{/each}</main>
  {/if}
  {:else}
  <td>{#each node.content as item}<svelte:self node={item} />{/each}</td>
  {/if}

{:else if node.nodeType === 'blockquote'}
  <Scrollin><blockquote>{#each node.content as code}<svelte:self node={code} />{/each}</blockquote></Scrollin>

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

<style lang="scss">
  summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $gap;

    svg {
      transform: rotate(0);
      transition: transform 333ms;

      :global([open]) > & {
        transform: rotate(-180deg);
      }
    }
  }
</style>