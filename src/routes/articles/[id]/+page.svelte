<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import Slider from '$lib/components/Slider.svelte'
  import Scrollin from '$lib/components/Scrollin.svelte'
  import { date, year } from '$lib/formatters'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  import { languageTag } from '$lib/paraglide/runtime';
  export let data: PageData

  // let tab: string = 'mandat'

  // $: {
  //   tab = $page.url.searchParams.get('t') || 'mandat'
  // }
</script>


<section>
  <header>
    <h1 class="h3"><Scrollin>{data.article.fields.titre}</Scrollin></h1>
    <aside>
      {#if data.article.fields.categorie}
      <div>
        <h6><Scrollin>Catégorie</Scrollin></h6>
        <Scrollin>{data.article.fields.categorie.fields.titre}</Scrollin>
      </div>
      {/if}
      <div>
        <h6><Scrollin>Année</Scrollin></h6>
        <Scrollin>{date(data.article.fields.date)}</Scrollin>
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
</section>

{#if data.articles?.items.length}
<footer>
  <div>
    <h6><Scrollin>{languageTag() === 'en' ? 'Other news' : 'Autres actualités'}</Scrollin></h6>

    <nav>
      {#each data.articles.items as article}
      <a href="/articles/{article.fields.id}">
        <h3><Scrollin>{article.fields.titre}</Scrollin></h3>
        {#if article.fields.thumbnail}
        <figure>
          <Media media={article.fields.thumbnail} small ar={1} />
        </figure>
        {/if}
      </a>
      {/each}
    </nav>
  </div>
</footer>
{/if}


<style lang="scss">
  section {
    display: flex;
    flex-wrap: wrap;
    // border-bottom: 1px solid;

    margin: 0 $base;
    @media (max-width: $mobile) {
      margin: 0 ($mobile_base * 0.75);
    }

    header,
    main {
      width: 50%;
      min-height: 88vh;

      @media (max-width: $mobile) {
        width: 100%;
      }
    }

    header {
      display: flex;
      flex-direction: column;
      border-right: 1px solid;
      border-left: 1px solid;
      padding-bottom: 0;

      @media (max-width: $mobile) {
        border-bottom: 1px solid;
      }

      h1 {
        padding: $base;

        @media (max-width: $mobile) {
          padding: $base ($mobile_base * 0.5);
        }
      }

      aside {
        display: flex;
        margin-top: auto;

        div {
          width: 50%;
          padding: 0 $base ($base * 0.25);

          @media (max-width: $mobile) {
            padding: 0 ($mobile_base * 0.5) ($mobile_base * 0.25);
          }

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
      border-right: 1px solid;

      @media (max-width: $mobile) {
        border-left: 1px solid;
      }
    }
  }

  footer {
    color: var(--foreground-inverse);
    background-color: var(--background-inverse);
    width: 100%;

    border-top: 1px solid;

    div {
      margin: 0 $base;
      @media (max-width: $mobile) {
        margin: 0 ($mobile_base * 0.75);
      }
      
      border-left: 1px solid;
      border-right: 1px solid;
    }

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

        @media (max-width: $mobile) {
          flex: none;
          flex-direction: column;
          gap: $base;
          width: 100%;

          &:not(:last-child) {
            border-right: none;
            border-bottom: 1px solid;
          }

          figure {
            position: relative;
            opacity: 1;
            visibility: visible;
            border-top: 1px solid;
            width: calc(100% + ($base * 2));
            margin: 0 ($base * -1) ($base * -1);
          }
        }
      }

      border-top: 1px solid;
    }
  }
</style>