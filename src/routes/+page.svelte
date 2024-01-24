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

<!-- <section>
	<h1 class="h1--huge">
		Mobilité simplifiée
	</h1>
</section>

<hr>

<section>
	<h3 class="ta-center">Une firme de génie-conseil avec un profil unique d'expertise dans le domaine de la mobilité. Au sein de nos équipes, avec chaque partenaire et citoyen, nous misons sur les valeurs d’excellence, d’esprit d’équipe, d’agilité, d’innovation et de bonheur.</h3>

	<a href="/a-propos" class="button">En savoir plus</a>
</section> -->

<style lang="scss">
</style>
