<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';

  import Document from '$lib/components/document/index.svelte'

  export let item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<main id={item.fields.id} class={`${item.fields.couleur} ${item.fields.layout}`}>
  {#if !item.fields.sansTitre}
  <h2 class:h6={item.fields.layout === 'Droite'}>{item.fields.titre}</h2>
  {/if}

  <section>
    {#if item.fields.corps}
    <Document details={item.fields.layout === 'Tableau'} body={item.fields.corps} />
    {/if}
  </section>

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

    section {
      display: flex;
      flex-direction: column;
      gap: $base;
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

    &.Tableau {
      flex-direction: row;
      align-items: flex-start;

      h2 {
        width: calc(100% / 3 * 1);
      }

      section {
        padding: $base;
        width: calc(100% / 3 * 2);
        max-width: none;
        border-left: 1px solid;
        margin: ($base * -1) 0;

        :global(table) {
          width: calc(100% + ($base * 3));
          margin-left: ($base * -1);
        }

        :global(details) {
          margin: 0 ($base * -1);
          border-bottom: 1px solid;

          &:first-child {
            border-top: 1px solid;
            margin-top: $base * 1;
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