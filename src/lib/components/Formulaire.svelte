<script lang="ts">
  import type { TypeFormulaireSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { page } from '$app/stores'
  import { enhance } from '$app/forms'

  import Document from '$lib/components/document/index.svelte'
  import FileUpload from './FileUpload.svelte'
  import Media from './Media.svelte'
  import Scrollin from './Scrollin.svelte'

  export let item: Entry<TypeFormulaireSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">

  let waiting = false
</script>

<main id={item.fields.id} class={`${item.fields.couleur}`} class:wide={item.fields.titre.length < 50}>
  <aside>
    <h2><Scrollin>{item.fields.titre}</Scrollin></h2>

    {#if item.fields.media}
    <figure>
      <Media media={item.fields.media} />
    </figure>
    {/if}
  </aside>
  
  <form action={item.fields.action} method="post" use:enhance={() => {
    waiting = true
    return async ({ update }) => {
      await update()
      waiting = false
    }
  }} enctype="multipart/form-data">
    {#if $page.form?.Message}
    <Scrollin>
    {#if item.fields.success}
      <Document body={item.fields.success} />
    {:else}
    <strong>Merci, nous vous contacterons sous peu!</strong>
    {/if}
    </Scrollin>
    {:else}

    {#each item.fields.inputs as input}
    {#if input.fields.type === 'Textarea'}
    <label for={input.fields.id}><Scrollin>{input.fields.titre}</Scrollin></label>
    <textarea id={input.fields.id} name={input.fields.id} placeholder={input.fields.info || " "}></textarea>
    {:else if input.fields.type === 'Dropdown'}
    <label for={input.fields.id}><Scrollin>{input.fields.titre}</Scrollin> <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.707107" y1="0.7072" x2="7.77817" y2="7.77827" stroke-width="2"/><line x1="13.4337" y1="0.707107" x2="6.3626" y2="7.77817" stroke-width="2"/></svg></label>
    <select id={input.fields.id} name={input.fields.id} placeholder={input.fields.info || " "}>
      {#each input.fields.options as value}
      <option {value}>{value}</option>
      {/each}
    </select>
    {:else if input.fields.type === 'File'}
    <label for={input.fields.id}><Scrollin>{input.fields.titre}</Scrollin></label>
    {#if input.fields.info}<Scrollin><small>{input.fields.info}</small></Scrollin>{/if}
    <FileUpload id={input.fields.id} name={input.fields.id} />
    {:else}
    <label for={input.fields.id}><Scrollin>{input.fields.titre}</Scrollin></label>
    <input type="text" id={input.fields.id} name={input.fields.id} placeholder={input.fields.info || " "} />
    {/if}
    
    {/each}

    <input type="text" name="website" style="display: none !important" tabindex="-1" autocomplete="off" />

    {#if $page.form?.error}
    <Scrollin><p class="error">{$page.form.error}</p></Scrollin>
    {/if}

    <Scrollin><button class:waiting={waiting} disabled={waiting} type="submit">{waiting ? 'Un instant...' : item.fields.bouton || 'Sauvegarder'}</button></Scrollin>
    {/if}

    {#if item.fields.liens?.length}
    <nav>
      {#each item.fields.liens as lien}
      <Scrollin>
      <a class="button" href={lien.fields.route} {...lien.fields.externe ? { rel: "external", target: "_blank" } : {}}>{lien.fields.titre}</a>
      </Scrollin>
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
        width: 100% !important;
      }
    }

    &.wide {
      aside {
        width: calc((100% / 3) + ($base * 0.5) - 2px);
      }

      form {
        width: calc(100% / 3 * 2)
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

  small {
    display: block;
    margin-bottom: $base * 0.5;
  }

  .error {
    color: $salmon;
    margin-bottom: $base * 1.5;
  }
</style>