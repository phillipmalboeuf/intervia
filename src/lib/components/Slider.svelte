<script lang="ts">
  import { type EmblaOptionsType, type EmblaCarouselType } from 'embla-carousel'
  import emblaCarouselSvelte, { type EmblaCarouselSvelteType } from 'embla-carousel-svelte'
  import Autoplay, { type AutoplayOptionsType } from 'embla-carousel-autoplay'
  import Autoheight from 'embla-carousel-auto-height'

  export let disabled = false
  export let buttons = true

  let options: EmblaOptionsType = { loop: true }
  let plugins = [Autoplay({ stopOnFocusIn: true }), Autoheight()]

  let slider: EmblaCarouselType
</script>

{#if !disabled}
<figure class="slider" on:emblaInit={(event) => {
  slider = event.detail
}} use:emblaCarouselSvelte={{ options, plugins }}>
  <slot />
</figure>

{#if buttons}
<nav>
  <button class="previous" on:click={() => slider.scrollPrev()}>←</button>
  <button class="next" on:click={() => slider.scrollNext()}>→</button>
</nav>
{/if}
{:else}
<slot />
{/if}

<style lang="scss">
.slider {
  overflow: hidden;
  cursor: ew-resize;
  position: relative;
}

  :global(.slider__container) {
    display: flex;
    align-items: flex-start;
    transition: height 333ms;
  }
    
    :global(.slide) {
      flex: 0 0 100%;
      min-width: 0;
    }

nav {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: $gap;
  right: $gap;
  transform: translateY(-50%);
  pointer-events: none;

  display: flex;
  justify-content: space-between;

  button {
    pointer-events: auto;
    width: 0;
    display: inline-flex;
    justify-content: center;
  }
}
</style>