<script lang="ts">
  import type { TypeListeSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';
  
  import Media from './Media.svelte'
  import Document from './document/index.svelte'

  export let item: Entry<TypeListeSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<main id={item.fields.id} class={`${item.fields.layout} ${item.fields.couleur}`}>
  {#if item.fields.titre}
  <h2>{item.fields.titre}</h2>
  {/if}

  <ol>
    {#each item.fields.items as i}
    <li>
      {#if i.sys.contentType.sys.id === 'text'}
      <h4>{i.fields.titre}</h4>
      {#if i.fields.media}
      <figure>
        <Media media={i.fields.media} small />
      </figure>
      {/if}
      {#if i.fields.corps}
      <Document body={i.fields.corps} />
      {/if}

      {#if item.fields.liens?.length}
      <nav>
        {#each item.fields.liens as lien}
        <a class="button" href={lien.fields.route} {...lien.fields.externe ? { rel: "external", target: "_blank" } : {}}>{lien.fields.titre}</a>
        {/each}
      </nav>
      {/if}


      {:else if i.sys.contentType.sys.id === 'service'}
      <h4>{i.fields.titre}</h4>
      {#if i.fields.illustration}
      <figure>
        <Media media={i.fields.illustration} small />
      </figure>
      {/if}
      {#if i.fields.description}
      <Document body={i.fields.description} />
      {/if}

      <nav>
        <a class="button" href="/services/{i.fields.id}">En savoir plus</a>
      </nav>
      {/if}
    </li>
    {/each}
  </ol>
</main>

<style lang="scss">
  main {
    display: flex;
    gap: $base;
    flex-direction: column;
    align-items: center;

    &.Cartes {
      justify-content: center;
      text-align: center;

      h2 {
        max-width: $max * 0.5;
        margin: ($gap * 2) 0;
      }
    }

    ol {
      list-style: none;
      display: flex;
      margin: 0 ($base * -1) ($base * -1);
      border-top: 1px solid;

      li {
        flex: 1;
        padding: $base;

        &:not(:last-child) {
          border-right: 1px solid;
        }

        figure {
          padding: $gap * 2;
        }

        nav {
          margin-top: $gap;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: $gap * 0.5;
        }
      }
    }
  }
</style>