<script lang="ts">
  import Contenu from '$lib/components/Contenu.svelte';
	import type { PageData } from './$types'
  export let data: PageData
</script>

<svelte:head>
	<title>{data.page.fields.titre}</title>
	<meta name="description" content={data.page.fields.description} />
</svelte:head>

<Contenu contenu={data.page.fields.contenu} />

<style lang="scss">
</style>
