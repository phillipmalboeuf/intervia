<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Scrollin from '$lib/components/Scrollin.svelte';
  import { languageTag } from '$lib/paraglide/runtime';

  import type { PageData } from './$types'
  export let data: PageData
</script>

<header>
  <h1><Scrollin>{languageTag() === 'en' ? 'Our projects' : 'Nos projets'}</Scrollin></h1>
  <hr>
  {#if data.vedettes.items.length}
  <nav>
    {#each data.vedettes.items as projet}
    <a href="/projets/{projet.fields.id}">
      <h3><Scrollin>{projet.fields.titre}</Scrollin></h3>
      {#if projet.fields.thumbnail}
      <figure>
        <Media media={projet.fields.thumbnail} small ar={1} />
      </figure>
      {/if}
    </a>
    {/each}
  </nav>
  {/if}
  <hr>
</header>

<main id="projets">
  <div>
  <aside>
    <input type="checkbox" name="filtrer" id="filtrer" checked={!!data.service}>
    <label for="filtrer">Filtrer</label>

    {#if data.service}
    <Scrollin><a href="/projets#projets" class="button">Tous</a></Scrollin>
    {/if}
    {#each data.services as service}
    <Scrollin><a href="/projets?service={service.id}#projets" class="button" class:active={data.service && data.service.id === service.id}>{service.titre}</a></Scrollin>
    {/each}
  </aside>
  <ol>
    {#each data.projets.items as projet}
    <li>
      <a href="/projets/{projet.fields.id}">
        <Scrollin>{projet.fields.titre}</Scrollin>
        {#if projet.fields.thumbnail}
        <figure>
          <Media media={projet.fields.thumbnail} small ar={1} />
        </figure>
        {/if}
      </a>
    </li>
    {/each}
  </ol>
  </div>
</main>

<style lang="scss">
  figure {
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
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
      position: relative;
      opacity: 1;
      visibility: visible;
    }
  }

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
        padding: $base;
        min-height: calc(100vw / 3);
        display: flex;
        align-items: center;
        justify-content: center;

        &:not(:last-child) { border-right: 1px solid; }

        &:hover,
        &:focus {
          text-decoration: none;
          // color: $green-dark;
          // background-color: $yellow-dark;
          
          figure {
            opacity: 1;
            visibility: visible;
          }
        }

        @media (max-width: $mobile) {
          flex: none;
          width: 100%;
          min-height: calc(100vh / 3);

          flex-direction: column;
          gap: $base;

          &:not(:last-child) { border-right: none; border-bottom: 1px solid; }

          figure {
            border-bottom: 1px solid;
            width: calc(100% + ($base * 2));
            margin: ($base * -1) ($base * -1) 0;
            order: -1;
          }
        }
      }

      // border-bottom: 1px solid;
    }
  }

  main {
    color: var(--foreground-inverse);
    background-color: var(--background-inverse);
  }

  main div {
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
      width: 50%;

      @media (max-width: $mobile) {
        display: none;
      }
    }

    aside {
      width: 50%;
      padding: $base;
      display: flex;
      flex-wrap: wrap;
      gap: $base;

      @media (max-width: $mobile) {
        width: 100%;
      }

      input[type=checkbox] {
        display: none;

        & + label {
          display: none;
          cursor: pointer;

          @media (max-width: $mobile) {
            display: block;
            width: 100%;
            text-align: right;
            text-transform: uppercase;

            & ~ :global(span) {
              display: none;
            }
          }
        }

        &:checked {
          @media (max-width: $mobile) {
            & + label ~ :global(span) {
              display: inline-flex;
            }
          }
        }
      }
    }

    ol {
      display: block;
      width: 50%;
      list-style: none;
      border-left: 1px solid;
      min-height: 33vw;

      @media (max-width: $mobile) {
        width: 100%;
        border-top: 1px solid;
        border-left: none;
      }

      li {
        &:not(:last-child) { border-bottom: 1px solid; }

        a {
          display: block;
          padding: $base * 0.75;
          position: relative;

          figure {
            top: -1px;
            right: 100%;
            left: auto;
            width: $base * 12;
            height: $base * 12;
            border: 1px solid;
          }

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