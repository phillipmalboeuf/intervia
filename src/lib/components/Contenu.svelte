<script lang="ts">
  import { isTypeFormulaire, isTypeHero, isTypeListe, isTypeParcours, isTypeText, type TypeFormulaireSkeleton, type TypeHeroSkeleton, type TypeListeSkeleton, type TypeParcoursSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import Text from './Text.svelte'
  import Hero from './Hero.svelte'
  import Liste from './Liste.svelte'
  import Formulaire from './Formulaire.svelte'
  import Parcours from './Parcours.svelte'

  export let contenu: Entry<TypeHeroSkeleton | TypeListeSkeleton | TypeTextSkeleton | TypeFormulaireSkeleton | TypeParcoursSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
</script>

{#each contenu as item, i}
<section>
  {#if isTypeHero(item)}
  <Hero {item} />
  {:else if isTypeText(item)}
  <Text {item} />
  {:else if isTypeListe(item)}
  <Liste {item} />
  {:else if isTypeParcours(item)}
  <Parcours {item} />
  {:else if isTypeFormulaire(item)}
  <Formulaire {item} />
  {/if}
</section>
<hr>
{/each}

<style lang="scss">
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

  hr {
    &:last-child {
      display: none;
    }
  }
</style>