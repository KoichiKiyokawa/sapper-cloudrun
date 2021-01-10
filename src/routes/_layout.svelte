<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '@sapper/app'
  import Nav from '@/components/Nav.svelte'

  export let segment: string
  const whitePathList = ['login']

  let loading = true
  onMount(async () => {
    if (whitePathList.includes(segment)) return (loading = false)

    const { AuthService } = await import('@/services/AuthService')
    if (!(await AuthService.checkAuth())) return goto('login')

    loading = false
  })
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
