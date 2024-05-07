<script lang="ts">
	import '../styles.scss'

	import { page } from '$app/stores'
	import { browser } from '$app/environment'
	
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
  import Transition from '$lib/components/Transition.svelte'
  import Calendly from '$lib/components/Calendly.svelte'

	const ga = 'G-4RGJEW3XW9'

	if (browser) {
		// @ts-ignore
		window.dataLayer = window.dataLayer || []
		// @ts-ignore
		window.gtag = function gtag() {
			// @ts-ignore
			window.dataLayer.push(arguments)
		}
		// @ts-ignore
		window.gtag("js", new Date())
		// @ts-ignore
		window.gtag("config", ga, { 'send_page_view': false })
	}
	$: {
		// @ts-ignore
		if (typeof gtag !== "undefined"){
			// @ts-ignore
			window.gtag("config", ga, {
				page_path: $page.url.pathname,
			})
		}
	}
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id={ga}"></script>
</svelte:head>

<div class="app {$page.route.id.replaceAll('/', '-')} {$page.url.pathname.replaceAll('/', '-')} {{
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

	<Calendly />
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
