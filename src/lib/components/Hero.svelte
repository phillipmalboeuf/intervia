<script lang="ts">
  import type { TypeHeroSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';
  
  import Media from './Media.svelte'
  import Icon from './Icon.svelte'
  import Scrollin from './Scrollin.svelte';

  export let item: Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<header id={item.fields.id} class={``} class:media={item.fields.media}>
  <h1 class:h1--huge={item.fields.titre.length < 40}><Scrollin>{item.fields.titre}</Scrollin></h1>
  {#if item.fields.media}
  <figure>
    <Media media={item.fields.media} eager />
  </figure>
  {/if}

  <footer>
    <a href="#introduction"><Icon /></a>
  </footer>
</header>

<style lang="scss">
  header {
    display: flex;
    gap: $base;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - #{$base * $scale * 4.75});
    text-align: center;

    h1 {
      margin: auto 0;
    }

    h1,
    footer {
      position: relative;
      z-index: 2;
    }

    &.media {
      position: relative;
      color: white;

      :global(img),
      :global(video) {
        background-color: $green-darker;
        position: absolute;
        z-index: -1;
        top: $base * -1;
        left: ($base * -2) - 1px;
        width: calc(100% + ($base * 4) + 2px);
        height: calc(100% + ($base * 2));
      }

      figure {
        // position: relative;
        // &:after {
        //   content: "";
        //   position: absolute;
        //   z-index: 0;
        //   top: $base * -1;
        //   left: ($base * -2) - 1px;
        //   width: calc(100% + ($base * 4) + 2px);
        //   height: calc(100% + ($base * 2));
        //   background-color: fade-out($color: $black, $amount: 0.8);
        // }
      }
    }
  }
</style>