<script context="module" lang="ts">
  export async function preload(this: any, page: { path: string }, session: { token?: string }) {
    console.log({ session })
    const whitePathList = ['/login']
    if (!whitePathList.includes(page.path) && session?.token == null) this.redirect(302, 'login')
  }
</script>

<script lang="ts">
  import Nav from '@/components/Nav.svelte'

  export let segment: string
  let loading = false
</script>

{#if loading}
  <main class="flex items-center justify-center h-screen">
    <span>loading...</span>
  </main>
{:else}
  <header>
    <Nav {segment} />
  </header>

  <main class="p-4">
    <slot />
  </main>
{/if}

<style global lang="sass">
@tailwind base
@tailwind components
@tailwind utilities
</style>
