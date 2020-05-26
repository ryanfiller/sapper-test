<script>
  import { onMount } from 'svelte'
  export let current

	let promise = getPosts()
	let prev
	let next

	async function getPosts() {
		const res = await fetch(`goals.json`)
    const posts = await res.json()
    return posts
  }
  
  onMount( async () => {
    const posts = await getPosts()
    const ownIndex = posts.findIndex(post => post.title === current)

    prev = (ownIndex - 1) >= 0 ? posts[ownIndex - 1 ] : null
	  next = (ownIndex + 1) <= posts.length ? posts[ownIndex + 1 ] : null
  })
</script>

<style type="text/scss">
  @import '../_styles/variables.scss';

  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-weight: bold;
    color: $sapperOrange;
    padding: 1rem 0;
  }
</style>

{#await promise then posts}
  <nav>
    {#if prev}
      <a href={`goals/${prev.slug}`}>← {prev.title}</a>
    {:else}
      <span></span>
    {/if}

    {#if next}
      <a href={`goals/${next.slug}`}>{next.title} →</a>
    {:else}
      <span></span>
    {/if}
  </nav>
{:catch error}
	''
{/await}