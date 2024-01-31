<script lang="ts">
  import { isTypeService, isTypeText, type TypeListeSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';
  
  import Media from './Media.svelte'
  import Document from './document/index.svelte'
  import Slider from './Slider.svelte';

  export let item: Entry<TypeListeSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<main id={item.fields.id} class={`${item.fields.layout} ${item.fields.couleur}`}>
  {#if item.fields.titre}
  <h2 class:h6={item.fields.layout === 'Slider'}>{item.fields.titre}</h2>
  {/if}

  <Slider disabled={item.fields.layout !== 'Slider'}>
    <ol class="slider__container">
      {#each item.fields.items as i}
      <li class={`${isTypeText(i) && i.fields.layout} slide`}>
        {#if isTypeText(i)}
        {#if !i.fields.sansTitre}<h4 class:h2={item.fields.layout === 'Slider'}>{i.fields.titre}</h4>{/if}
        {#if i.fields.media}
        <figure>
          <Media media={i.fields.media} small />
        </figure>
        {/if}
        {#if i.fields.corps}<Document body={i.fields.corps} />{/if}
        {#if i.fields.liens?.length}
        <nav>
          {#each i.fields.liens as lien}
          <a class="button" href={lien.fields.route} {...lien.fields.externe ? { rel: "external", target: "_blank" } : {}}>{lien.fields.titre}</a>
          {/each}
        </nav>
        {/if}

        {:else if isTypeService(i)}
        <h4>{i.fields.titre}</h4>
        {#if i.fields.illustration}
        <figure>
          <Media media={i.fields.illustration} small />
        </figure>
        {/if}
        {#if i.fields.description}<Document body={i.fields.description} />{/if}
        <nav>
          <a class="button" href="/services/{i.fields.id}">En savoir plus</a>
        </nav>
        {/if}
      </li>
      {/each}
    </ol>
  </Slider>
</main>

<style lang="scss">
  main {
    display: flex;
    gap: $base;
    flex-direction: column;
    align-items: center;

    &.Cartes {
      justify-content: center;
      text-align: center;

      h2 {
        max-width: $max * 0.5;
        margin: ($gap * 2) 0;
      }

      ol {
        border-top: 1px solid;
      }

      li {
        flex: 1;

        &:not(:last-child) {
          border-right: 1px solid;
        }
      }
    }

    &.Slider {
      :global(blockquote) {
        font-size: $base * $scale * 3;
        
        :global(> p) {
          line-height: 1;
        }
      }

      :global(.slider) {
        border-top: 1px solid;
        width: calc(100% + ($base * 2));
      }

      li {
        min-height: 33vw;
        padding: $gap ($gap * 6);
      }

      figure {
        order: -1;
        height: 25vw;

        :global(img),
        :global(video) {
          height: 100%;
          object-fit: contain;
        }
      }
    }

    ol {
      list-style: none;
      display: flex;
      width: calc(100% + ($base * 2));
      margin: 0 ($base * -1) ($base * -1);

      li {
        padding: $base;
        min-height: 25vw;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: $base;

        &.Centre {
          justify-content: center;
          text-align: center;
        }

        figure {
          padding: $gap * 3;
        }

        nav {
          margin-top: $gap;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: $gap * 0.5;
        }
      }
    }
  }
</style>