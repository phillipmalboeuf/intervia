<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import { year } from '$lib/formatters'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  import Slider from '$lib/components/Slider.svelte';
  import Arrows from '$lib/components/Arrows.svelte';
  export let data: PageData

  let tab: string = 'mandat'

  $: {
    tab = $page.url.searchParams.get('t') || 'mandat'
  }
</script>


<section>
  <header>
    <h1 class="h2">{data.projet.fields.titre}</h1>
    <aside>
      <div>
        <h6>Client</h6>
        {data.projet.fields.client}
      </div>
      <div>
        <h6>Année</h6>
        {year(data.projet.fields.date)} – {data.projet.fields.status}
      </div>
    </aside>
    <figure class:animated={data.projet.fields.full}>
      {#if data.projet.fields.full}
      <Arrows />
      <Arrows />
      {:else}
      {#if data.projet.fields.photos?.length}
      <Slider buttons={false} dots={data.projet.fields.photos.length}>
        <ol class="slider__container">
          {#each data.projet.fields.photos as media}
          <li class="slide">
            <Media {media} small />
          </li>
          {/each}
        </ol>
      </Slider>
      {:else if data.projet.fields.thumbnail}
      <Media media={data.projet.fields.thumbnail} small />
      {/if}
      {/if}
    </figure>
  </header>
  <main>
    <nav>
      <a href="?t=mandat" class="button" class:active={tab === 'mandat'}>Mandat</a>
      <a href="?t=implication" class="button" class:active={tab === 'implication'}>Implication</a>
      <a href="?t=constat" class="button" class:active={tab === 'constat'}>Constat</a>
    </nav>

    {#if tab === 'mandat'}
    <Document body={data.projet.fields.mandat} />
    {:else if tab === 'implication'}
    <Document body={data.projet.fields.implication} />
    {:else if tab === 'constat'}
    <Document body={data.projet.fields.constat} />
    {/if}
  </main>

  {#if data.projet.fields.full}
  <figure class="full">
    {#if data.projet.fields.photos?.length}
    <Slider buttons={false} dots={data.projet.fields.photos.length}>
      <ol class="slider__container">
        {#each data.projet.fields.photos as media}
        <li class="slide">
          <Media {media} small />
        </li>
        {/each}
      </ol>
    </Slider>
    {:else if data.projet.fields.thumbnail}
    <Media media={data.projet.fields.thumbnail} small />
    {/if}
  </figure>
  {/if}

  {#if data.projets?.items.length}
  <footer>
    <h6>Projets similaires</h6>

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

      @media (max-width: $mobile) {
        width: calc(100% - ($base * 2));
        margin-right: $base;
        margin-left: $base;
      }
    }

    header {
      display: flex;
      flex-direction: column;
      border-right: 1px solid;
      border-left: 1px solid;
      padding-bottom: 0;
      margin-left: $base;

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
        background-color: var(--background-inverse);

        :global(img),
        :global(video) {
          height: 50vh;
        }

        &.animated {
          height: 50vh;
          overflow: hidden;

          @keyframes slide {
            from {
              transform: translateX(-50%);
            }

            to {
              transform: translateX(0%);
            }
          }

          @media (max-width: $mobile) {
            // display: flex;
          }

          :global(svg) {
            width: auto;
            height: 100%;
            object-fit: cover;

            // transform: translateX(-50%);
            animation: slide 6666ms linear infinite;

            @media (max-width: $mobile) {
              
            }

            :global(path) {
              fill: var(--foreground-inverse);
            }
          }
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

      @media (max-width: $mobile) {
        border-left: 1px solid;
      }
    }

    figure.full {
      position: relative;
      margin-left: $base;
      margin-right: $base;
      border-top: 1px solid;
      border-right: 1px solid;
      border-left: 1px solid;

      :global(img),
      :global(video) {
        max-height: 90vh;
      }
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