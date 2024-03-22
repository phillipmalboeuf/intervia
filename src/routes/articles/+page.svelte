<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Scrollin from '$lib/components/Scrollin.svelte';
  import { year } from '$lib/formatters';

  import type { PageData } from './$types'
  export let data: PageData
</script>

<header>
  <h1><Scrollin>Actualités</Scrollin></h1>
  <hr>
  {#if data.vedettes.items.length}
  <nav>
    {#each data.vedettes.items as article}
    <a href="/articles/{article.fields.id}">
      <h5><Scrollin>{article.fields.titre}</Scrollin></h5>
      {#if article.fields.thumbnail}
      <figure>
        <Media media={article.fields.thumbnail} small ar={0.88} />
      </figure>
      {/if}
    </a>
    {/each}
  </nav>
  {/if}
  <hr>
</header>

<main id="articles">
  <aside>
    {#if data.categorie}
    <Scrollin><a href="/articles#articles" class="button">Tous</a></Scrollin>
    {/if}
    {#each data.categories as categorie}
    <Scrollin><a href="/articles?categorie={categorie.id}#articles" class="button" class:active={data.categorie && data.categorie.id === categorie.id}>{categorie.titre}</a></Scrollin>
    {/each}
  </aside>
  <ol>
    {#each data.articles.items as article}
    <li>
      <a href="/articles/{article.fields.id}">
        <div><Scrollin>{article.fields.titre}</Scrollin></div>
        <div><Scrollin>{year(article.fields.date)}</Scrollin></div>
        {#if article.fields.thumbnail}
        <figure>
          <Media media={article.fields.thumbnail} small ar={1} />
        </figure>
        {/if}
      </a>
    </li>
    {/each}

    {#each data.articles.items as article}
    <li>
      <a href="/articles/{article.fields.id}">
        <div><Scrollin>{article.fields.titre}</Scrollin></div>
        <div><Scrollin>{year(article.fields.date)}</Scrollin></div>
        {#if article.fields.thumbnail}
        <figure>
          <Media media={article.fields.thumbnail} small ar={1} />
        </figure>
        {/if}
      </a>
    </li>
    {/each}

    {#each data.articles.items as article}
    <li>
      <a href="/articles/{article.fields.id}">
        <div><Scrollin>{article.fields.titre}</Scrollin></div>
        <div><Scrollin>{year(article.fields.date)}</Scrollin></div>
        {#if article.fields.thumbnail}
        <figure>
          <Media media={article.fields.thumbnail} small ar={1} />
        </figure>
        {/if}
      </a>
    </li>
    {/each}
  </ol>
</main>

<style lang="scss">
  header {
    h1 {
      padding: ($gap * 2) $base;
      border-left: 1px solid;
      border-right: 1px solid;
      margin: 0 $base;
      @media (max-width: $mobile) {
        margin: 0 ($mobile_base * 0.75);
      }
    }

    nav {
      display: flex;
      border-left: 1px solid;
      border-right: 1px solid;
      margin: 0 $base;
      @media (max-width: $mobile) {
        margin: 0 ($mobile_base * 0.75);
      }

      @media (max-width: $mobile) {
        flex-wrap: wrap;
      }

      a {
        position: relative;
        flex: 1;
        text-align: center;
        min-height: calc(100vw / 3);
        display: flex;
        flex-direction: column;
        transition: background-color 333ms;

        h5 {
          padding: $base;
          margin: auto 0;
        }

        figure {
          border-top: 1px solid;

          @media (max-width: $mobile) {
            border-top: none;
            border-bottom: 1px solid;
          }
        }

        &:not(:last-child) { border-right: 1px solid; }

        &:hover,
        &:focus {
          text-decoration: none;
          background-color: $yellow-dark;
        }

        @media (max-width: $mobile) {
          flex: none;
          width: 100%;
          min-height: calc(100vh / 3);

          flex-direction: column;

          &:not(:last-child) { border-right: none; border-bottom: 1px solid; }

          figure {
            border-bottom: 1px solid;
            order: -1;
          }
        }
      }
    }
  }

  main {
    position: relative;
    display: flex;
    align-items: flex-start;
    border-left: 1px solid;
    border-right: 1px solid;
    margin: 0 $base;
    @media (max-width: $mobile) {
      margin: 0 ($mobile_base * 0.75);
    }

    @media (max-width: $mobile) {
      flex-wrap: wrap;
    }

    figure {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 33.3%;
      height: 100%;
      opacity: 0;
      transition: opacity 666ms;
      visibility: hidden;
      pointer-events: none;

      :global(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @media (max-width: $mobile) {
        display: none;
      }
    }

    aside {
      width: 33.3%;
      padding: $base;
      display: flex;
      flex-wrap: wrap;
      gap: $base;

      @media (max-width: $mobile) {
        width: 100%;
      }
    }

    ol {
      display: block;
      width: 66.6%;
      list-style: none;
      border-left: 1px solid;
      min-height: 33vw;

      @media (max-width: $mobile) {
        width: 100%;
        border-top: 1px solid;
        border-left: none;
      }

      li {
        border-bottom: 1px solid;

        @media (max-width: $mobile) {
          &:last-child { border-bottom: none; }
        }

        a {
          display: flex;
          justify-content: space-between;
          padding: $base * 0.75;
          padding-bottom: 0;
          transition: background-color 333ms;

          &:hover,
          &:focus {
            text-decoration: none;
            background-color: $yellow-dark;
          }

          div {
            padding-bottom: $base * 0.75;
          }

          div:last-of-type {
            border-left: 1px solid;
            width: 20%;
            padding-left: $base;
          }

          &:hover,
          &:focus {
            figure {
              opacity: 1;
              visibility: visible;
            }
          }
        }
      }
    }
  }
  
</style>