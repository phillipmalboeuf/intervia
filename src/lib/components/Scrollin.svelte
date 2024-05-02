<script lang="ts">
  import IntersectionObserver from "svelte-intersection-observer"

  let element: HTMLElement
  let intersecting: boolean

  export let delay: number = undefined
</script>

<IntersectionObserver {element} bind:intersecting>
  <span bind:this={element} class:intersecting style:--delay={delay}><span><slot /></span></span>
</IntersectionObserver>

<style lang="scss">
  span {
    display: inline-block;
    // overflow: hidden;

    > span {
      opacity: 0;
      transform: translateY(33px);
      transition: transform 666ms ease-in-out calc(var(--delay, 0) * 1ms), opacity 666ms ease-in-out calc(var(--delay, 0) * 1ms);
    }

    &.intersecting {
      > span {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
</style>