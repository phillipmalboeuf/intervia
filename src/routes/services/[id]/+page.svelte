<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import { year } from '$lib/formatters'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  export let data: PageData

  export let open = true
</script>


<details {open}>
  <summary><h1>{data.service.fields.titre}</h1></summary>
</details>



<style lang="scss">
  details {
    summary {
      &::-webkit-details-marker {
        display: none;
        content: "";
      }

      &::marker {
        display: none;
        content: "";
      }
    }
  }
</style>