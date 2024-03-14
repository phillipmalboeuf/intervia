<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';

  import Document from '$lib/components/document/index.svelte'
  import Media from './Media.svelte';
  import Scrollin from './Scrollin.svelte';

  export let item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<main id={item.fields.id} class={`${item.fields.couleur} ${item.fields.layout}`}>
  {#if item.fields.layout === 'Droite' && item.fields.media}
  <figure>
    <Media media={item.fields.media} small />
  </figure>
  {/if}

  {#if !item.fields.sansTitre}
  <h2 class:h6={item.fields.layout === 'Droite'}><Scrollin>{item.fields.titre}</Scrollin></h2>
  {/if}

  <section>
    {#if item.fields.corps}
    <Document details={item.fields.layout === 'Tableau'} body={item.fields.corps} />
    {:else if $$slots.corps}
    <slot name="corps" />
    {/if}
  </section>

  {#if item.fields.liens?.length}
  <nav>
    {#each item.fields.liens as lien}
    <Scrollin><a class="button" href={lien.fields.route} {...lien.fields.externe ? { rel: "external", target: "_blank" } : {}}>{lien.fields.titre}</a></Scrollin>
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

    @media (max-width: $mobile) {
      min-height: 0;
      padding: $gap 0;
    }    

    > :global(*) {
      max-width: $max;
    }

    section {
      display: flex;
      flex-direction: column;
      gap: $base;
      // overflow: hidden;
    }

    &.Centre {
      justify-content: center;
      text-align: center;
    }

    &.Droite {
      flex-direction: row;
      align-items: center;
      text-align: center;

      figure {
        height: 100%;
        width: calc(50% + $base);
        margin: ($base * -1);
        border-right: 1px solid;

        :global(img),
        :global(video) {
          height: 100%;
          object-fit: cover;
        }
      }

      section {
        width: 50%;
        padding-left: $base;
      }

      @media (max-width: $mobile) {
        flex-wrap: wrap;

        section {
          width: 100%;
        }

        figure {
          width: calc(100% + ($base * 2));
          margin-bottom: 0;
          border-right: none;
          border-bottom: 1px solid;
        }
      }
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: $gap * 0.5;
    }

    &.Tableau {
      flex-direction: row;
      align-items: stretch;

      @media (max-width: $mobile) {
        flex-wrap: wrap;
      }

      h2 {
        width: calc(100% / 3 * 1);

        @media (max-width: $mobile) {
          width: 100%;
          text-align: center;
        }
      }

      nav {
        @media (min-width: $mobile) {
          position: absolute;
          bottom: $base;
          left: $base;
        }

        @media (max-width: $mobile) {
          width: 100%;
          justify-content: center;
        }
      }

      section {
        padding: $base;
        width: calc((100% / 3 * 2) + ($base * 2));
        max-width: none;
        border-left: 1px solid;
        margin: ($base * -1) ($base * -1) ($base * -1) 0;

        @media (max-width: $mobile) {
          order: 99;
          width: calc((100%) + ($base * 2));
          margin: 0 ($base * -1);
          border-left: none;
          border-top: 1px solid;
        }

        :global(h6) {
          text-align: center;
        }

        :global(table) {
          width: calc(100% + ($base * 2));
          margin-left: ($base * -1);
        }

        :global(details) {
          margin: 0 ($base * -1);
          border-bottom: 1px solid;

          &:first-child {
            border-top: 1px solid;
            // margin-top: $base * 1;
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