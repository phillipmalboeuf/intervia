<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  
</script>

<button id="calendly" on:click={() => {
  // @ts-ignore
  Calendly?.initPopupWidget({url: 'https://calendly.com/interviainfo/30min?hide_gdpr_banner=1'})
}}>Parler à un expert</button>
{@html `<link 
href="https://calendly.com/assets/external/widget.css" 
rel="stylesheet">
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>`}


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