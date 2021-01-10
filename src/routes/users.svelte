<script context="module" lang="ts">
  export async function preload(page: { query: { hoge: string } }) {
    return { query: page.query }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'

  let users: User[] = []
  export let query: { title: string }
  $: title = query?.title ?? 'no title'

  onMount(async () => {
    const { api } = await import('@/utils/apiCall')
    const userResponses = (await api.get<ApiResponse<User>[]>('/api/users.json', { auth: true })) ?? []
    users = userResponses.map((user) => ({
      ...user.data,
      birthday: new Date(user.data.birthday),
      createdAt: new Date(user.data.createdAt),
      updatedAt: new Date(user.data.updatedAt),
      deletedAt: user.data.deletedAt ? new Date(user.data.deletedAt) : null,
    }))
  })
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<h1>Great success!</h1>

<ul>
  {#each users as user}
    <li>{user.name}</li>
    <li>{user.birthday}</li>
  {/each}
</ul>
