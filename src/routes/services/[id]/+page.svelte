<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import { year } from '$lib/formatters'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  export let data: PageData

  export let open = true
</script>


<details {open}>
  <summary><h2>{data.service.fields.titre}</h2></summary>
  <main>
    <figure>
      {#if data.service.fields.illustration}<Media media={data.service.fields.illustration} small />{/if}
    </figure>

    <section>
      {#if data.service.fields.corps}
      <Document body={data.service.fields.corps} details />
      {/if}
    </section>
  </main>
</details>



<style lang="scss">
  details {
    background-color: $green-light;
    border-bottom: 1px solid;

    &[open] {
      summary {
        border-bottom: 1px solid;
      }
    }

    summary {
      padding: $base;
    }

    main {
      display: flex;

      figure {
        width: calc(100% / 5 * 2);
        padding: ($base * 6);
      }

      section {
        padding: $base;
        width: calc(100% / 5 * 3);
        border-left: 1px solid;

        :global(details) {
          margin: 0 ($base * -1);
          border-bottom: 1px solid;

          &:first-child {
            margin-top: $base * -1;
          }

          :global(summary) {
            padding: ($base * 0.5) ($base);

            &:hover,
            &:focus {
              background-color: $yellow-dark;
            }
          }

          :global(main) {
            padding: ($base * 2) $base;
            max-width: $max * 0.5;
            margin: 0 auto;
          }
        }

        :global(details[open]) {
          :global(summary) {
            border-bottom: 1px solid;
          }
        }
      }
    }
  }
</style>