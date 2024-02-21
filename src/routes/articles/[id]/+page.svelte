<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import { date, year } from '$lib/formatters'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  import Slider from '$lib/components/Slider.svelte';
  export let data: PageData

  // let tab: string = 'mandat'

  // $: {
  //   tab = $page.url.searchParams.get('t') || 'mandat'
  // }
</script>


<section>
  <header>
    <h1 class="h3">{data.article.fields.titre}</h1>
    <aside>
      {#if data.article.fields.categorie}
      <div>
        <h6>Catégorie</h6>
        {data.article.fields.categorie.fields.titre}
      </div>
      {/if}
      <div>
        <h6>Année</h6>
        {date(data.article.fields.date)}
      </div>
    </aside>
    <figure>
      {#if data.article.fields.photos?.length}
      <Slider buttons={false} dots={data.article.fields.photos.length}>
        <ol class="slider__container">
          {#each data.article.fields.photos as media}
          <li class="slide">
            <Media {media} small />
          </li>
          {/each}
        </ol>
      </Slider>
      {:else if data.article.fields.thumbnail}
      <Media media={data.article.fields.thumbnail} small />
      {/if}
    </figure>
  </header>
  <main>
    <Document body={data.article.fields.corps} />

    <!-- <nav>
      <a href="?t=mandat" class="button" class:active={tab === 'mandat'}>Mandat</a>
      <a href="?t=contexte" class="button" class:active={tab === 'contexte'}>Contexte</a>
      <a href="?t=solution" class="button" class:active={tab === 'solution'}>Solution</a>
    </nav> -->

    <!-- {#if tab === 'mandat'}
    <Document body={data.projet.fields.mandat} />
    {:else if tab === 'contexte'}
    <Document body={data.projet.fields.contexte} />
    {:else if tab === 'solution'}
    <Document body={data.projet.fields.solution} />
    {/if} -->
  </main>

  {#if data.articles?.items.length}
  <footer>
    <h6>Autres actualités</h6>

    <nav>
      {#each data.articles.items as article}
      <a href="/articles/{article.fields.id}">
        <h3>{article.fields.titre}</h3>
        {#if article.fields.thumbnail}
        <figure>
          <Media media={article.fields.thumbnail} small ar={1} />
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

      h1 {
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
        position: relative;
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

      h6 {
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