<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Page from '../[page]/+page.svelte'

	import type { PageData } from './$types'
  export let data: PageData
</script>

<Page {data} />

{#if data.vedettes?.items.length}
<footer>
	<nav>
		{#each data.vedettes.items as service}
		<a href="/services/{service.fields.id}">
			<h3>{service.fields.titre}</h3>
			{#if service.fields.illustration}
			<figure>
				<Media media={service.fields.illustration} small ar={1} />
			</figure>
			{/if}

			<span class="button">En lire plus</span>
		</a>
		{/each}
	</nav>
</footer>
{/if}

<style lang="scss">

footer {
	color: var(--foreground-inverse);
	background-color: var(--background-inverse);
	width: 100%;

	border-top: 1px solid;

	nav {
		display: flex;

		a {
			position: relative;
			flex: 1;
			text-align: center;
			padding: ($gap * 1.5) $base;
			min-height: calc(100vw / 3);

			display: flex;
			gap: $gap;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			&:not(:last-child) { border-right: 1px solid; }

			h3, figure {
				margin: auto 0;
			}

			figure {
				display: none;
				padding: 0 $gap;

				:global(img) {
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}

			&:hover,
			&:focus {
				text-decoration: none;
				color: $green-dark;
				background-color: $yellow-light;

				h3 {
					display: none;
				}

				figure {
					display: block;
				}
			}
		}

		border-top: 1px solid;
	}
}
</style>