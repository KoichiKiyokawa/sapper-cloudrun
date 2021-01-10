<script lang="ts">
  import { goto } from '@sapper/app'

  let email: string
  let password: string
  let loading = false

  async function onSubmit() {
    loading = true
    const { AuthService } = await import('@/services/AuthService')
    AuthService.login(email, password)
      .then(() => goto('/'))
      .catch(() => alert('ログインに失敗しました'))
      .finally(() => (loading = false))
  }
</script>

<form on:submit|preventDefault={onSubmit} class="border rounded shadow-lg p-4 max-w-screen-sm" class:disabled={loading}>
  <h1 class="text-xl font-bold">ログイン</h1>
  <label>メールアドレス<input bind:value={email} type="email" autocomplete="email" /></label>
  <label>パスワード<input bind:value={password} type="password" autocomplete="current-password" /></label>
  <button disabled={loading} class="bg-red-400 px-4 py-2 text-white mt-4">ログイン</button>
</form>

<style lang="sass">
label
  @apply block
  & + &
    @apply mt-4
input
  @apply block w-full
[disabled], .disabled
  @apply opacity-25
</style>
