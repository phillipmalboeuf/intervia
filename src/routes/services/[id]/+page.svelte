<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Calendly from '$lib/components/Calendly.svelte'
  import Document from '$lib/components/document/index.svelte'
  import { year } from '$lib/formatters'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  export let data: PageData

  export let open = true
</script>

<details {open}>
  <summary><h2>{data.service.fields.titre}</h2> <h2><svg width="1em" height="1em" viewBox="0 0 64 68" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.4708 -1.2445e-06L28.4708 54.55L5.02146 31.3522L-1.38479e-06 36.3198L32.0237 68L64 36.3198L58.9785 31.3522L35.5766 54.55L35.5766 -1.5551e-06L28.4708 -1.2445e-06Z"/></svg></h2></summary>
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

<Calendly />

<style lang="scss">
  details {
    background-color: $green-light;
    border-bottom: 1px solid;

    &:last-child {
      margin-bottom: -1px;

      &:first-child {
        svg {
          display: none;
        }
      }
    }

    &[open] {
      > summary {
        border-bottom: 1px solid;

        svg {
          transform: rotate(-180deg);
        }
      }
    }

    summary {
      padding: ($gap * 1.5) $base;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: $gap;

      svg {
        transform: rotate(0);
        transition: transform 333ms;
      }
    }

    main {
      display: flex;

      @media (max-width: $mobile) {
        flex-wrap: wrap;
      }

      figure {
        width: calc(100% / 5 * 2);
        padding: ($base * 6);

        @media (max-width: $mobile) {
          width: 100%;
          padding: ($base * 3);
        }
      }

      section {
        padding: $base;
        width: calc(100% / 5 * 3);
        border-left: 1px solid;

        @media (max-width: $mobile) {
          width: 100%;
          border-top: 1px solid;
          border-left: none;
        }

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

        > :global(section + p) {
          margin: $base 0;
        }

        :global(details[open]) {
          :global(summary) {
            border-bottom: 1px solid;
          }
        }
      
        :global(p + section > details:first-child) {
          border-top: 1px solid;
          margin-top: 0;
        }
      }
    }
  }
</style>