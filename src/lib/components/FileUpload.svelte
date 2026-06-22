<script lang="ts">
  export let id: string
  export let name: string

  let input: HTMLInputElement
  let files: File[] = []

  function syncInput() {
    if (!input) return
    const dt = new DataTransfer()
    for (const file of files) dt.items.add(file)
    input.files = dt.files
  }

  function onChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files?.length) {
      files = [...files, ...Array.from(target.files)]
      syncInput()
      // target.value = ''
    }
  }

  function remove(index: number) {
    files = files.filter((_, i) => i !== index)
    syncInput()
  }
</script>

<div class="file-upload">
  <input
    bind:this={input}
    type="file"
    multiple
    {id}
    {name}
    on:change={onChange}
    class="native"
  />

  {#if files.length}
    <ul>
      {#each files as file, i (file.name + i)}
        <li>
          <span>{file.name}</span>
          <button type="button" on:click={() => remove(i)} aria-label="Retirer {file.name}">×</button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .file-upload {
    margin-bottom: 1.5em;
  }

  .native {
    /* position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: hidden; */
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0.5em;
    border: 1px solid;
  }

  li {
    display: flex;
    justify-content: space-between;
    gap: 0.5em;
  }

  li + li {
    margin-top: 0.25em;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    line-height: 1;
  }
</style>
