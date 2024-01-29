<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'

  import Service from '../[id]/+page.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  export let data: PageData
</script>


<h2>Voici votre parcours de services</h2>

<main>
  {#each data.services.items as service}
  <Service data={{ service }} open={false} />
  {/each}
</main>


<style lang="scss">
  h2 {
    padding: ($base * 3) $base;
    text-align: center;
  }

  main {
    border-top: 1px solid;

    > :global(details) {
      // &:nth-child(3n + 2) {
      //   color: $green-light;
      //   background-color: $green-dark;
      // }

      &:nth-child(2n) {
        background-color: $yellow-light;
      }
    }
  }
</style>