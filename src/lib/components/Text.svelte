<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';

  import Document from '$lib/components/document/index.svelte'

  export let item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<main id={item.fields.id} class={`${item.fields.couleur} ${item.fields.layout}`}>
  {#if !item.fields.sansTitre}
  <h2>{item.fields.titre}</h2>
  {/if}

  {#if item.fields.corps}
  <Document body={item.fields.corps} />
  {/if}

  {#if item.fields.liens?.length}
  <nav>
    {#each item.fields.liens as lien}
    <a class="button" href={lien.fields.route} {...lien.fields.externe ? { rel: "external", target: "_blank" } : {}}>{lien.fields.titre}</a>
    {/each}
  </nav>
  {/if}
</main>

<style lang="scss">
  main {
    display: flex;
    gap: $base;
    flex-direction: column;
    align-items: center;
    min-height: 50vh;

    > :global(*) {
      max-width: $max;
    }

    &.Centre {
      justify-content: center;
      text-align: center;
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      gap: $gap * 0.5;
    }
  }
</style>