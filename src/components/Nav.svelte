<script lang="ts">
  export let segment: string
</script>

<nav class="flex items-center bg-red-400 text-white">
  <h1 class="text-2xl mx-8">
    <a href="/">Sapper CloudRun</a>
  </h1>
  <ul class="flex items-center">
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">home</a>
    </li>
    <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">about</a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a aria-current={segment === 'blog' ? 'page' : undefined} rel="prefetch" href="blog">blog</a>
    </li>
  </ul>
</nav>

<style lang="sass">
li, a
  height: 64px
a
  @apply flex items-center p-4
  &[aria-current]
    @apply bg-red-300
</style>
