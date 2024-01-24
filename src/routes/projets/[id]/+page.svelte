<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import { year } from '$lib/formatters'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  export let data: PageData

  let tab: string = 'mandat'

  $: {
    tab = $page.url.searchParams.get('t') || 'mandat'
  }
</script>


<section>
  <header>
    <h2>{data.projet.fields.titre}</h2>
    <aside>
      <div>
        <h5>Client</h5>
        {data.projet.fields.client}
      </div>
      <div>
        <h5>Année</h5>
        {year(data.projet.fields.date)} – {data.projet.fields.status}
      </div>
    </aside>
    <figure>
      <Media media={data.projet.fields.thumbnail} />
    </figure>
  </header>
  <main>
    <nav>
      <a href="?t=mandat" class="button" class:active={tab === 'mandat'}>Mandat</a>
      <a href="?t=contexte" class="button" class:active={tab === 'contexte'}>Contexte</a>
      <a href="?t=solution" class="button" class:active={tab === 'solution'}>Solution</a>
    </nav>

    {#if tab === 'mandat'}
    <Document body={data.projet.fields.mandat} />
    {:else if tab === 'contexte'}
    <Document body={data.projet.fields.contexte} />
    {:else if tab === 'solution'}
    <Document body={data.projet.fields.solution} />
    {/if}
  </main>

  {#if data.projets?.items.length}
  <footer>
    <h5>Projets similaires</h5>

    <nav>
      {#each data.projets.items as projet}
      <a href="/projets/{projet.fields.id}">
        <h3>{projet.fields.titre}</h3>
        {#if projet.fields.thumbnail}
        <figure>
          <Media media={projet.fields.thumbnail} small ar={1} />
        </figure>
        {/if}
      </a>
      {/each}
    </nav>
  </footer>
  {/if}
</section>



<style lang="scss">
  section {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid;

    header,
    main {
      width: calc(50% - $base);
      min-height: 88vh;
    }

    header {
      display: flex;
      flex-direction: column;
      border-right: 1px solid;
      border-left: 1px solid;
      padding-bottom: 0;
      margin-left: $base;

      h2 {
        padding: $base;
      }

      aside {
        display: flex;
        margin-top: auto;

        div {
          width: 50%;
          padding: 0 $base ($base * 0.25);

          &:not(:first-child) {
            border-left: 1px solid;
          }
        }
      }

      figure {
        border-top: 1px solid;

        :global(img),
        :global(video) {
          height: 50vh;
        }
      }
    }

    main {
      display: flex;
      flex-direction: column;
      gap: $base;
      padding: $base;
      margin-right: $base;
      border-right: 1px solid;
    }

    footer {
      color: var(--foreground-inverse);
      background-color: var(--background-inverse);
      width: 100%;

      border-top: 1px solid;

      h5 {
        text-align: center;
        padding: $base;
      }

      nav {
        display: flex;

        figure {
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          :global(img) {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        a {
          position: relative;
          flex: 1;
          text-align: center;
          padding: $base;
          min-height: calc(100vw / 3);
          display: flex;
          align-items: center;
          justify-content: center;

          &:not(:last-child) { border-right: 1px solid; }

          &:hover,
          &:focus {
            figure {
              opacity: 1;
              visibility: visible;
            }
          }
        }

        border-top: 1px solid;
      }
    }
  }
</style>