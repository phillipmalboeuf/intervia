<script lang="ts">
  import Media from '$lib/components/Media.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<header>
  <h1>Nos projets {#if data.service}– {data.service.titre}{/if}</h1>
  {#if data.vedettes.items.length}
  <nav>
    {#each data.vedettes.items as projet}
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
  {/if}
</header>

<main>
  <aside>
    {#if data.service}
    <a href="/projets" class="button">Tous</a>
    {/if}
    {#each data.services as service}
    <a href="/projets?service={service.id}" class="button" class:active={data.service && data.service.id === service.id}>{service.titre}</a>
    {/each}
  </aside>
  <ol>
    {#each data.projets.items as projet}
    <li>
      <a href="/projets/{projet.fields.id}">
        {projet.fields.titre}
        {#if projet.fields.thumbnail}
        <figure>
          <Media media={projet.fields.thumbnail} small ar={1} />
        </figure>
        {/if}
      </a>
    </li>
    {/each}
    {#each data.projets.items as projet}
    <li>
      <a href="/projets/{projet.fields.id}">
        {projet.fields.titre}
        {#if projet.fields.thumbnail}
        <figure>
          <Media media={projet.fields.thumbnail} small ar={1} />
        </figure>
        {/if}
      </a>
    </li>
    {/each}
    {#each data.projets.items as projet}
    <li>
      <a href="/projets/{projet.fields.id}">
        {projet.fields.titre}
        {#if projet.fields.thumbnail}
        <figure>
          <Media media={projet.fields.thumbnail} small ar={1} />
        </figure>
        {/if}
      </a>
    </li>
    {/each}
    {#each data.projets.items as projet}
    <li>
      <a href="/projets/{projet.fields.id}">
        {projet.fields.titre}
        {#if projet.fields.thumbnail}
        <figure>
          <Media media={projet.fields.thumbnail} small ar={1} />
        </figure>
        {/if}
      </a>
    </li>
    {/each}
  </ol>
</main>

<style lang="scss">
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

  header {
    h1 {
      padding: $base;
      border-bottom: 1px solid;
    }

    nav {
      display: flex;

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

      border-bottom: 1px solid;
    }
  }

  main {
    position: relative;
    display: flex;
    align-items: flex-start;
    color: var(--foreground-inverse);
    background-color: var(--background-inverse);

    figure {
      width: 50%;
    }

    aside {
      width: 50%;
      padding: $base;
      display: flex;
      flex-wrap: wrap;
      gap: $base;
    }

    ol {
      display: block;
      width: 50%;
      list-style: none;
      border-left: 1px solid;
      min-height: 33vw;

      li {
        &:not(:last-child) { border-bottom: 1px solid; }

        a {
          display: block;
          padding: $base * 0.75;

          &:hover,
          &:focus {
            text-decoration: none;
            background-color: $yellow-dark;
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