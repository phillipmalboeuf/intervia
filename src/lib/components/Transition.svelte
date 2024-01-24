<script lang="ts">
  import { browser } from '$app/environment'
  import { beforeNavigate, goto } from '$app/navigation';
  import { navigating } from '$app/stores'
  import { fade, fly } from 'svelte/transition'

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
<figure in:fly={{ duration, opacity: 1, x: '-100%' }} out:fly={{ duration, opacity: 1, x: '100%' }}>  
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
    transform: skew(45deg);
    height: 100vh;
    border: 1px solid;
    background-color: $green-light;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>