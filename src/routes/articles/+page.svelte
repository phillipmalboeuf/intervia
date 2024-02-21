<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import { year } from '$lib/formatters';

  import type { PageData } from './$types'
  export let data: PageData
</script>

<header>
  <h1>Actualités {#if data.categorie}– {data.categorie.titre}{/if}</h1>
  <hr>
  {#if data.vedettes.items.length}
  <nav>
    {#each data.vedettes.items as article}
    <a href="/articles/{article.fields.id}">
      <h5>{article.fields.titre}</h5>
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

<main>
  <aside>
    {#if data.categorie}
    <a href="/articles" class="button">Tous</a>
    {/if}
    {#each data.categories as categorie}
    <a href="/articles?categorie={categorie.id}" class="button" class:active={data.categorie && data.categorie.id === categorie.id}>{categorie.titre}</a>
    {/each}
  </aside>
  <ol>
    {#each data.articles.items as article}
    <li>
      <a href="/articles/{article.fields.id}">
        <div>{article.fields.titre}</div>
        <div>{year(article.fields.date)}</div>
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
        <div>{article.fields.titre}</div>
        <div>{year(article.fields.date)}</div>
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
        <div>{article.fields.titre}</div>
        <div>{year(article.fields.date)}</div>
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
    }

    nav {
      display: flex;
      border-left: 1px solid;
      border-right: 1px solid;
      margin: 0 $base;

      a {
        position: relative;
        flex: 1;
        text-align: center;
        min-height: calc(100vw / 3);
        display: flex;
        flex-direction: column;

        h5 {
          padding: $base;
          margin: auto 0;
        }

        figure {

        }

        &:not(:last-child) { border-right: 1px solid; }

        &:hover,
        &:focus {
          text-decoration: none;
          background-color: $yellow-dark;
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

    figure {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 33.3%;
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

    aside {
      width: 33.3%;
      padding: $base;
      display: flex;
      flex-wrap: wrap;
      gap: $base;
    }

    ol {
      display: block;
      width: 66.6%;
      list-style: none;
      border-left: 1px solid;
      min-height: 33vw;

      li {
        border-bottom: 1px solid;
        // &:not(:last-child) { border-bottom: 1px solid; }

        a {
          display: flex;
          justify-content: space-between;
          padding: $base * 0.75;
          padding-bottom: 0;

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