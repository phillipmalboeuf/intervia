<script lang="ts">
  import type { TypeFormulaireSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';

  import Document from '$lib/components/document/index.svelte'
  import Media from './Media.svelte'

  export let item: Entry<TypeFormulaireSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<main id={item.fields.id} class={`${item.fields.couleur}`}>
  <aside>
    <h2>{item.fields.titre}</h2>

    {#if item.fields.media}
    <figure>
      <Media media={item.fields.media} />
    </figure>
    {/if}
  </aside>
  
  <form action="">
    {#each item.fields.inputs as input}
    {#if input.fields.type === 'Textarea'}
    <label for={input.fields.id}>{input.fields.titre}</label>
    <textarea id={input.fields.id} name={input.fields.id} placeholder={input.fields.info}></textarea>
    {:else}
    <label for={input.fields.id}>{input.fields.titre}</label>
    <input type="text" id={input.fields.id} name={input.fields.id} placeholder={input.fields.info} />
    {/if}
    {/each}

    <button type="submit">{item.fields.bouton || 'Sauvegarder'}</button>

    {#if item.fields.liens?.length}
    <nav>
      {#each item.fields.liens as lien}
      <a class="button" href={lien.fields.route} {...lien.fields.externe ? { rel: "external", target: "_blank" } : {}}>{lien.fields.titre}</a>
      {/each}
    </nav>
    {/if}

    {#if item.fields.info}
    <Document body={item.fields.info} />
    {/if}
  </form>
</main>

<style lang="scss">
  main {
    display: flex;
    min-height: 88vh;

    aside,
    form {
      width: 50%;
      padding: $gap;
    }

    aside {
      display: flex;
      flex-direction: column;
      padding: ($gap*2) $gap ($gap*2) 0;

      margin: ($base * -1) 0;
      border-right: 1px solid;

      figure {
        margin-top: auto;
        margin-left: auto;
        width: 66.6%;
        padding: ($gap*2);
      }
    }

    form {

      button[type="submit"] {
        margin-bottom: $gap * 3;
      }
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      gap: $gap * 0.5;
      margin-bottom: $gap * 3;
    }
  }

  label {
    display: block;
    text-transform: uppercase;
    margin-bottom: $base * 0.5;
  }

  input,
  textarea {
    appearance: none;
    font-size: $base;
    line-height: 1;
    color: var(--foreground);
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid;
    padding: $base * 0.5;
    margin-bottom: $base;

    &:focus {
      outline: 1px solid $yellow-dark;
    }
  }

  textarea {
    border: 1px solid;
    height: $gap * 6;
  }
</style>