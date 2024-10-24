<script lang="ts">
  import { page } from '$app/stores';
  import { i18n } from '$lib/i18n';
  import { languageTag } from '$lib/paraglide/runtime';
</script>

{#if languageTag() === 'en'}
<a href={i18n.route($page.url.pathname)}
  data-sveltekit-reload
  hreflang={'fr'}
  aria-current={languageTag() === 'fr' ? "page" : undefined}>FR</a>
{/if}

{#if languageTag() === 'fr'}
<a href={i18n.route($page.url.pathname)}
  data-sveltekit-reload
  hreflang={'en'}
  aria-current={languageTag() === 'en' ? "page" : undefined}>EN</a>
{/if}