<script lang="ts">
  import { browser } from '$app/environment'
  import { beforeNavigate, goto } from '$app/navigation';
  import { navigating } from '$app/stores'
  import { fade, fly } from 'svelte/transition'
  import { linear } from 'svelte/easing'

  let visible = false
  const duration = 666

  beforeNavigate((async ({ from, to, cancel, type }) => {
    
    if (!visible && type !== 'leave'
      && (from.route.id !== to.route.id || JSON.stringify(from.params) !== JSON.stringify(to.params))) {
      cancel()
      visible = true

      setTimeout(() => {
        goto(to.url)
      }, duration)

      setTimeout(() => {
        visible = false
      }, duration)
    }

    return true
  }))

  // $: {
  //   if (browser && $navigating) {
  //     visible = true

  //     setTimeout(() => {
  //       visible = false
  //     }, 1000)
  //   }
  // }
</script>

{#if visible}
<figure
  transition:fade={{ duration: duration - 333, easing: linear }}
>  
  <!-- <h2>Navigating to {$navigating.to.url.pathname}</h2> -->
</figure>
{/if}


<style lang="scss">
  figure {
    position: fixed;
    z-index: 99;
    top: 0;
    left: -37.5vw;
    width: 175vw;
    // transform: skew(45deg);
    height: 100vh;
    border: 1px solid;
    background-color: $salmon;

    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: $mobile) {
      left: -75vh;
      width: 200vh;
    }
  }
</style>