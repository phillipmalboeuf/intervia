<script lang="ts">
  import { isTypeService, isTypeText, type TypeListeSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { page } from '$app/stores'
  
  import Media from './Media.svelte'
  import Document from './document/index.svelte'
  import Slider from './Slider.svelte'
  import Scrollin from './Scrollin.svelte'

  export let item: Entry<TypeListeSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  const layout = ($page.data.device !== 'desktop' && item.fields.sliderSurMobile) ? 'Slider' : item.fields.layout
</script>

<main id={item.fields.id} class:images={item.fields.images?.length} class={`${layout} ${item.fields.couleur}`}>
  {#if item.fields.titre}
  <h2 class:h6={item.fields.layout === 'Slider'}><Scrollin>{item.fields.titre}</Scrollin></h2>
  {/if}


  <Slider disabled={item.fields.layout !== 'Slider' && ($page.data.device === 'desktop' || !item.fields.sliderSurMobile)}
    buttons={!item.fields.images?.length}
    dots={item.fields.images?.length}>
    <ol class="slider__container">
      {#if item.fields.items}
      {#each item.fields.items as i}
      <li class={`${isTypeText(i) && i.fields.layout} slide`}>
        {#if isTypeText(i)}
        {#if !i.fields.sansTitre}<h4 class:h1={item.fields.layout === 'Slider'} class:h1--huge={layout === 'Slider' && item.fields.titre.length < 40}><Scrollin>{i.fields.titre}</Scrollin></h4>{/if}
        {#if i.fields.media}
        <figure>
          <Media media={i.fields.media} small />
        </figure>
        {/if}
        {#if i.fields.corps}<Document body={i.fields.corps} />{/if}
        {#if i.fields.liens?.length}
        <nav>
          {#each i.fields.liens as lien}
          <Scrollin><a class="button" href={lien.fields.route} {...lien.fields.externe ? { rel: "external", target: "_blank" } : {}}>{lien.fields.titre}</a></Scrollin>
          {/each}
        </nav>
        {/if}

        {:else if isTypeService(i)}
        <h4><Scrollin>{i.fields.titre}</Scrollin></h4>
        {#if i.fields.illustration}
        <figure>
          <Media media={i.fields.illustration} small />
        </figure>
        {/if}
        {#if i.fields.description}<Document body={i.fields.description} />{/if}
        <nav>
          <Scrollin><a class="button" href="/services/{i.fields.id}">En savoir plus</a></Scrollin>
        </nav>
        {/if}
      </li>
      {/each}
      {:else if item.fields.images}
      {#each item.fields.images as i}
      <li class="slide image">
        <figure>
          <Media media={i} small />
        </figure>
      </li>
      {/each}
      {/if}
    </ol>
  </Slider>
</main>

<style lang="scss">
  main {
    display: flex;
    gap: $base;
    flex-direction: column;
    align-items: center;

    &.images {
      margin-top: ($base * -1) - 1.5px;

      &.Slider {
        margin-bottom: ($base * -1);

        li {
          padding: 0;

          figure {
            padding: 0;

            :global(img),
            :global(video) {
              object-fit: cover;
            }
          }
        }
      }
    }

    &.Cartes {
      justify-content: center;
      text-align: center;

      h2 {
        max-width: $max * 0.5;
        margin: ($gap * 2) 0;
      }

      ol {
        border-top: 1px solid;

        @media (max-width: $mobile) {
          flex-wrap: wrap;
        }
      }

      li {
        flex: 1;
        padding: $gap;

        @media (max-width: $mobile) {
          flex: none;
          width: 100%;
        }

        figure {
          margin: auto 0 0;
        }

        &:not(:last-child) {
          border-right: 1px solid;

          @media (max-width: $mobile) {
            border-right: none;
            border-bottom: 1px solid;
          }
        }

        :global(h1) {
          font-size: $base * $scale * 7;

          @media (max-width: $mobile) {
            font-size: $mobile_base * $mobile_scale * 3.5;
          }
        }
      }

      .image {
        figure {
          padding: 0;
          margin: ($gap * -1);
        }
      }
    }

    &.Slider {
      
      h2 {
        text-align: center;
      }

      :global(h1) {
        @media (max-width: $mobile) {
          font-size: $mobile_base * $mobile_scale * 4;
        }
      }

      :global(h6) {
        font-weight: 300;
      }

      :global(blockquote) {
        font-size: $base * $scale * 3;

        @media (max-width: $mobile) {
          font-size: $mobile_base * $mobile_scale * 1.2;
        }
        
        :global(> p) {
          line-height: 1;
        }
      }

      :global(.slider) {
        border-top: 1px solid;
        width: calc(100% + ($base * 2));
      }

      li {
        text-align: center;
        gap: $gap * 1.5;
        min-height: 33vw;
        padding: ($gap) ($gap * 3) ($gap * 2);

        @media (max-width: $mobile) {
          gap: $gap;
          padding: ($gap * 3) ($gap) ($gap * 3);
        }

        :global(h1) {
          @media (max-width: $mobile) {
            font-size: $mobile_base * $mobile_scale * 6;
            margin-bottom: $mobile_base * -1;
          }
        }

        &:has(.h1--huge) {
          padding: ($gap * 2) ($gap * 4);

          @media (max-width: $mobile) {
            padding: ($gap * 3) ($gap);
          }

          figure {
            order: -1;
          }
        }
        
        figure {
          // order: -1;
          height: 25vw;

          @media (max-width: $mobile) {
            height: 36vh;
          }

          :global(img),
          :global(video) {
            height: 100%;
            object-fit: contain;
          }
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

        @media (max-width: $mobile) {
          gap: $mobile_base * 0.5;
        }

        &.Centre {
          justify-content: center;
          text-align: center;
        }

        figure {
          padding: $gap * 3;

          @media (max-width: $mobile) {
            padding: ($gap * 2) $gap;
          }
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