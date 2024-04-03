<script lang="ts">
  import Calendly from '$lib/components/Calendly.svelte'
  import Media from '$lib/components/Media.svelte'
  import Scrollin from '$lib/components/Scrollin.svelte'
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
			<h3><Scrollin>{service.fields.titre}</Scrollin></h3>
			{#if service.fields.illustrationLight || service.fields.illustration}
			<figure>
				<Media media={service.fields.illustrationLight || service.fields.illustration} small ar={1} />
			</figure>
			{/if}

			<Scrollin><span class="button">En lire plus</span></Scrollin>
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

	// border-top: 1px solid;

	nav {
		display: flex;
		border-left: 1px solid;
    border-right: 1px solid;
    margin: 0 $base;

		@media (max-width: $mobile) {
      margin: 0 ($mobile_base * 0.75);
    }

		@media (max-width: $mobile) {
			flex-wrap: wrap;
		}

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

			@media (max-width: $mobile) {
				flex: none;
				width: 100%;

				&:not(:last-child) {
					border-right: none;
					border-bottom: 1px solid;
				}
			}

			h3, figure {
				margin: auto 0;
			}

			figure {
				display: none;
				padding: 0 $gap;

				max-height: calc(100vw / 4);

				:global(img) {
					width: 100%;
					height: 100%;
					object-fit: contain;
				}

				@media (max-width: $mobile) {
					display: block;
					max-height: calc(100vw / 2);
					margin: $base 0;
				}
			}

			&:hover,
			&:focus {
				text-decoration: none;
				// color: $green-dark;
				// background-color: $green-light;

				@media (min-width: $mobile) {
					h3 {
						display: none;
					}

					figure {
						display: block;
					}
				}
			}
		}

		// border-top: 1px solid;
	}
}
</style>