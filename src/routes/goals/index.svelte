<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`goals.json`)
		.then(r => r.json())
		.then(posts => {
			return { posts };
		});
	}
</script>

<script>
	export let posts;
</script>

<style type="text/scss">
	ul {
		margin: 0 0 1em 0;
		font-size: 1.5rem;
		line-height: 1.5;
		list-style: none;

		li {
			margin: .25em 0;
			&:before {
				content: attr(data-bullet);
				margin-right: .25em;
			}
		}
	}
</style>

<svelte:head>
	<title>goals</title>
</svelte:head>

<h1>Things I Want to See if Sapper Can Do:</h1>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li data-bullet={post.emoji}><a rel='prefetch' href='goals/{post.slug}'>{post.title}</a></li>
	{/each}
</ul>