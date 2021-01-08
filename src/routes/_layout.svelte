<script lang="ts">
  import Nav from '../components/Nav.svelte'

  export let segment: string
</script>

<Nav {segment} />

<main>
  <slot />
</main>

<style global lang="sass">
@tailwind base
@tailwind components
@tailwind utilities
</style>
