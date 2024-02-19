<script lang="ts">
	import '../styles.scss'

	import { page } from '$app/stores'
	
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
  import Transition from '$lib/components/Transition.svelte'
</script>

<div class="app {{
	'/projets': 'dark',
	'/articles': 'light',
	'/services/popup': 'white',
	'/services/[id]': 'white',
	// '/projets/[id]': 'dark'
}[$page.route.id] || {
	'/contact': 'light'
}[$page.url.pathname] || ''}">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<Transition />

<style lang="scss">
	.app {
	}

	main {
		min-height: 90vh;
	}
</style>
