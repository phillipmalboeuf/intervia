<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
	import type { Entry } from 'contentful'

  import Media from '$lib/components/Media.svelte'
  import Scrollin from '$lib/components/Scrollin.svelte'
  import Text from '$lib/components/Text.svelte'
  import Page from '../[page]/+page.svelte'
	import Logo from '$lib/components/Logo.svelte'
	
	import { page } from '$app/stores'

	import type { PageData } from './$types'
  export let data: PageData

	const item = {
		fields: {
			titre: 'Nous sommes intervia',
			layout: 'Tableau',
			couleur: 'Light'
		}
	} as Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<Page {data} />

<section id="membres">
	<Text {item}>
		<svelte:fragment slot="corps">
			<h6><Scrollin>Direction</Scrollin></h6>
			<table style:--length={2}>
				{#each data.membres.items.filter(membre => membre.fields.equipe === 'Direction') as membre}
				<tr>
					<td><Scrollin>{membre.fields.nom}</Scrollin></td>
					<td><Scrollin>{membre.fields.poste}</Scrollin></td>

					{#if $page.data.device === 'desktop'}
					<figure>
						{#if membre.fields.photo}
						<Media media={membre.fields.photo} small />
						{:else}
						<Logo />
						{/if}
					</figure>
					{/if}
				</tr>
				{/each}
			</table>
			<h6><Scrollin>Employés</Scrollin></h6>
			<table style:--length={2}>
				{#each data.membres.items.filter(membre => membre.fields.equipe === 'Employés') as membre}
				<tr>
					<td><Scrollin>{membre.fields.nom}</Scrollin></td>
					<td><Scrollin>{membre.fields.poste}</Scrollin></td>

					{#if $page.data.device === 'desktop'}
					<figure>
						{#if membre.fields.photo}
						<Media media={membre.fields.photo} small />
						{:else}
						<Logo />
						{/if}
					</figure>
					{/if}
				</tr>
				{/each}
			</table>
			<h6><Scrollin>Compagnons de bureaux</Scrollin></h6>
			<table style:--length={2}>
				{#each data.membres.items.filter(membre => membre.fields.equipe === 'Compagnons de bureaux') as membre}
				<tr>
					<td><Scrollin>{membre.fields.nom}</Scrollin></td>
					<td><Scrollin>{membre.fields.poste}</Scrollin></td>

					{#if $page.data.device === 'desktop'}
					<figure>
						{#if membre.fields.photo}
						<Media media={membre.fields.photo} small />
						{:else}
						<Logo />
						{/if}
					</figure>
					{/if}
				</tr>
				{/each}
			</table>
		</svelte:fragment>
	</Text>
</section>


<style lang="scss">
	table {

		tr {
			position: relative;
			display: flex;

			figure {
				position: absolute;
				width: $base * 12;
				height: $base * 12;
				top: 0;
				right: 100%;
				z-index: 100;
				display: none;
				border: 1px solid;
				background-color: $yellow-dark;
			}

			&:hover {
				figure {
					display: inline-flex;
					justify-content: center;
					align-items: center;
				}
			}
		}

		&:last-child {
			margin-bottom: $base * -1;

			tr:last-child {
				td {
					border-bottom: none;
				}
			}
		}
	}


	section {
    margin: 0 $base;
    padding: $base;
    border: 1px solid;
    border-top: none;
    border-bottom: none;

		@media (max-width: $mobile) {
      margin: 0 ($mobile_base * 0.75);
    }

    &:has(> .Dark),
    &:has(> .Light),
    &:has(> .Yellow) {
      position: relative;
      color: $green-light;

      &:before {
        content: "";
        background-color: $green-dark;
        position: absolute;
        z-index: -1;
        top: 0;
        left: ($base * -1) - 1px;
        width: calc(100% + ($base * 2) + 2px);
        height: calc(100%);
      }
    }

    &:has(> .Light) {
      color: $green-dark;

      &:before {
        background-color: $green-light;
      }
    }

    &:has(> .Yellow) {
      color: $green-dark;

      &:before {
        background-color: $yellow-light;
      }
    }
  }
</style>