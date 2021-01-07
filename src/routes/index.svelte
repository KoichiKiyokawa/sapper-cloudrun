<script context="module" lang="ts">
  export async function preload(page: { query: string }) {
    return { query: page.query }
  }
</script>

<script lang="ts">
  export let query: string
</script>

<svelte:head>
  <title>Sapper project template. query: {query}</title>
</svelte:head>

<h1>Great success!</h1>
<p>{query}</p>
