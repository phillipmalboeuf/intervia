<script lang="ts">
  import type { TypeFormulaireSkeleton, TypeParcoursSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful'
  import type { JsonArray } from 'type-fest'
  import { fade, fly } from 'svelte/transition'

  import Document from '$lib/components/document/index.svelte'
  import Media from './Media.svelte'

  export let item: Entry<TypeParcoursSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">

  const horizontal = item.fields.parcours[0].filter(p => p)
  const vertical = (item.fields.parcours as JsonArray).map(p => p[0]).filter(p => p)

  let open: string = undefined
</script>

<main id={item.fields.id} class={`${item.fields.couleur}`}>
  {#if item.fields.titre}
  <h6>{item.fields.titre}</h6>
  {/if}

  <form action="">
    <h1>
      {item.fields.separateurs[0]} <span on:click={() => open = "vertical"}><u>{vertical[0]}</u></span> {item.fields.separateurs[1]} <span on:click={() => open = "horizontal"}><u>{horizontal[1]}</u></span>.
    </h1>

    <button type="submit">{item.fields.bouton || "Voir mon parcous"}</button>
  </form>

  {#if open}
<dialog transition:fly={{ duration: 333, opacity: 1, y: '-100%' }}>
  <h3>
  {#if open === "vertical"}
  {#each vertical as v}
  <u on:click={() => open = undefined}>{v}</u><br>
  {/each}
  {:else}
  {#each horizontal as v}
  <u on:click={() => open = undefined}>{v}</u><br>
  {/each}
  {/if}
  </h3>
</dialog>
{/if}
</main>



<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 88vh;

    text-align: center;

    h6 {
      width: 100%;
      border-bottom: 1px solid;
      padding-bottom: $base;
      margin: 0 ($base * -2);
    }

    form {
      max-width: $max;
      margin: auto 0;

      button {
        margin-top: $gap * 3;
      }

      h1 {
        span {
          cursor: pointer;
          text-transform: lowercase;
        }
      }
    }
  }

  dialog {
    border: none;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    u {
      cursor: pointer;
    }

    .Yellow & {
      color: $green-dark;
      background-color: $yellow-light;
    }
  }
</style>