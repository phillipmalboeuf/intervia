<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
</script>

<button id="calendly" on:click={() => {
  // @ts-ignore
  window.Calendly?.initPopupWidget({url: 'https://calendly.com/interviainfo/30min?hide_gdpr_banner=1'})
}}>Parler à un expert</button>

<style lang="scss">
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