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
    <textarea id={input.fields.id} name={input.fields.id} placeholder={input.fields.info || " "}></textarea>
    {:else if input.fields.type === 'Dropdown'}
    <label for={input.fields.id}>{input.fields.titre} <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.707107" y1="0.7072" x2="7.77817" y2="7.77827" stroke-width="2"/><line x1="13.4337" y1="0.707107" x2="6.3626" y2="7.77817" stroke-width="2"/></svg></label>
    <select id={input.fields.id} name={input.fields.id} placeholder={input.fields.info || " "}>
      {#each input.fields.options as value}
      <option {value}>{value}</option>
      {/each}
    </select>
    {:else if input.fields.type === 'File'}
    <label for={input.fields.id}>{input.fields.titre} <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <line x1="6" y1="4.37121e-08" x2="6" y2="12" stroke-width="2"/> <line x1="12" y1="6" x2="-8.74228e-08" y2="6" stroke-width="2"/> </svg> </label>
    <input type="file" multiple id={input.fields.id} name={input.fields.id} placeholder={input.fields.info || " "} />
    {:else}
    <label for={input.fields.id}>{input.fields.titre}</label>
    <input type="text" id={input.fields.id} name={input.fields.id} placeholder={input.fields.info || " "} />
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
    flex-wrap: wrap;
    min-height: 66vh;

    aside,
    form {
      width: 50%;
      padding: $gap;

      @media (max-width: $mobile) {
        width: 100%;
      }
    }

    aside {
      display: flex;
      gap: $base;
      flex-direction: column;
      padding: ($gap*2) $gap ($gap*2) 0;

      margin: ($base * -1) 0;
      border-right: 1px solid;

      @media (max-width: $mobile) {
        border-right: none;
      }

      figure {
        margin-top: auto;
        margin-left: auto;
        width: 66.6%;
        padding: ($gap*2);

        @media (max-width: $mobile) {
          width: 100%;
        }
      }
    }

    form {
      margin: 0 auto;
      max-width: $base * 33.3;
      align-self: center;

      @media (max-width: $mobile) {
        padding: $gap $base;
        border-top: 1px solid;
        width: calc(100% + ($base * 2));
        margin: 0 ($base * -1);
      }

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
    position: relative;
    display: block;
    text-transform: uppercase;
    margin-bottom: $base * 0.5;
    transition: margin-bottom 333ms;
    will-change: margin-bottom;

    > svg {
      position: absolute;
      top: calc(100% + ($base * 1.25));
      right: ($base);
    }

    &:has(+ input) {
      margin-bottom: $base * -1.75;
    }

    &:has(+ input:not(:placeholder-shown)) {
      margin-bottom: $base * 0.5;
    }
  }

  input,
  select,
  textarea {
    appearance: none;
    font-size: $base;
    line-height: 1;
    color: var(--foreground);
    width: 100%;
    background-color: transparent;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid;
    padding: ($base * 0.5) 0;
    margin-bottom: $base * 1.5;

    &:focus {
      outline: 1px solid $yellow-dark;
    }

    &[type=file] {
      padding: ($base * 0.5);
      border: 1px solid;
    }

    &::file-selector-button {
      color: currentColor;
      background: none;
      border: none;
      padding: 0;
    }
  }

  textarea {
    padding: ($base * 0.5);
    border: 1px solid;
    height: $gap * 6;
  }
</style>