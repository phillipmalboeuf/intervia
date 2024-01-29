<script lang="ts">
  import type { TypeFormulaireSkeleton, TypeParcoursSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { JsonArray } from 'type-fest'
  import { fade, fly } from 'svelte/transition'
  import { goto, preloadData, pushState } from '$app/navigation'

  import Popup from '../../routes/services/popup/+page.svelte'

  import { page } from '$app/stores'

  // import Document from '$lib/components/document/index.svelte'
  // import Media from './Media.svelte'

  export let item: Entry<TypeParcoursSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">

  const horizontal = item.fields.parcours[0].filter(p => p)
  const vertical = (item.fields.parcours as JsonArray).map(p => p[0]).filter(p => p)

  let selectedH: number = 1
  let selectedV: number = 0

  let open: string = undefined
</script>

<main id={item.fields.id} class={`${item.fields.couleur}`}>
  {#if item.fields.titre}
  <h6>{item.fields.titre}</h6>
  {/if}

  <form action="/{item.fields.id}/popup?s={encodeURIComponent(item.fields.parcours[selectedV + 1][selectedH + 1].join('|'))}" on:submit={async (e) => {
    e.preventDefault()
    const { action } = e.currentTarget
    goto(action)

    // const path = action + `?s=${encodeURIComponent(item.fields.parcours[selectedV + 1][selectedH + 1].join('|'))}`
    // const result = await preloadData(path)

    // console.log(result)
    
    // if (result.type === 'loaded' && result.status === 200) {
    //   pushState(path, { popup: result.data })
    // } else {
    //   goto(path)
    // }
  }}>
    <h1>
      {item.fields.separateurs[0]} <a on:click={() => open = "vertical"}><u>{vertical[selectedV]}</u></a> {item.fields.separateurs[1]} <a on:click={() => open = "horizontal"}><u>{horizontal[selectedH]}</u></a>.
    </h1>

    <button type="submit">{item.fields.bouton || "Voir mon parcous"}</button>
  </form>

  {#if open}
  <dialog class="open" transition:fly={{ duration: 666, opacity: 1, y: '-100%' }}>
    <h3>
    {#if open === "vertical"}
    {#each vertical as v, i}
    <a on:click={() => {
      open = undefined
      selectedV = i
    }}><u>{v}</u></a><br>
    {/each}
    {:else}
    {#each horizontal as v, i}
    <a on:click={() => {
      open = undefined
      selectedH = i
    }}><u>{v}</u></a><br>
    {/each}
    {/if}
    </h3>
  </dialog>
  {/if}

  <!-- {#if $page.state.popup}
  <dialog transition:fly={{ duration: 666, opacity: 1, y: '-100%' }}>
    <Popup data={$page.state.popup} />
  </dialog>
  {/if} -->
</main>



<style lang="scss">
  a {
    cursor: pointer;

    &:hover,
    &:focus {
      color: $black;
    }
  }

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
        a {
          cursor: pointer;
          text-transform: lowercase;

          &:hover,
          &:focus {
            color: $black;
          }
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

    &.open {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    u {
      cursor: pointer;
    }

    .Yellow & {
      color: $green-dark;
      background-color: $yellow-light;
    }
  }
</style>