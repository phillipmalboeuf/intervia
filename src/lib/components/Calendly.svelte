<script lang="ts">
  import { page } from '$app/stores'
  import { browser } from '$app/environment'
  
  import { onMount } from 'svelte'
</script>


{#if $page.url.pathname !== '/contact'}
<a class="button" href="/contact">Parler à un expert {$page.url.pathname}</a>
{:else}
<button id="calendly" on:click={() => {
  // @ts-ignore
  window.Calendly?.initPopupWidget({url: 'https://calendly.com/interviainfo/30min?hide_gdpr_banner=1'})
}}>Prendre un rendez-vous</button>
{/if}

<style lang="scss">
  .button,
  button {
    position: fixed;
    bottom: $gap;
    right: $gap;
    z-index: 5;
    color: var(--foreground);
    background-color: var(--background);

    @media (min-width: $mobile) {
      right: $gap * 1.5;
      bottom: $gap * 1.5;
    }

    &:hover,
    &:focus {
      background-color: $yellow-dark;
    }
  }
</style>