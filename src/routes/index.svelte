<script context="module" lang="ts">
  export async function preload(page: { query: { hoge: string } }) {
    // @ts-expect-error
    const userResponses: ApiResponse<User>[] = await this.fetch('/api/users.json').then((res) => res.json())
    const users: User[] = userResponses.map((user) => ({
      ...user.data,
      birthday: new Date(user.data.birthday),
      createdAt: new Date(user.data.createdAt),
      updatedAt: new Date(user.data.updatedAt),
      deletedAt: user.data.deletedAt ? new Date(user.data.deletedAt) : null,
    }))
    return { users, query: page.query }
  }
</script>

<script lang="ts">
  export let users: User[]
  export let query: { title: string }
  $: title = query?.title ?? 'no title'
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
