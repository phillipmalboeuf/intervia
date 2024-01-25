<script lang="ts">
  import Page from './[page]/+page.svelte'

	import type { PageData } from './$types'
  export let data: PageData
</script>

<Page {data} />