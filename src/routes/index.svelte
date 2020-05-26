<script>
	import Content from './_content.md'
	import Button from '../components/button.svelte'
</script>

<style type='text/scss'>
	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
		text-align: left;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	.buttons {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		a {
			flex: 1;
			max-width: calc(50% - .5rem);

			:global(button) {
				width: 100%;
			}
		}
	}
</style>

<svelte:head>
	<title>a sapper experiment</title>
</svelte:head>

<h1>This an experiment with Svelte & Sapper</h1>

<Content />

<div class="buttons">
	<a href="/goals">
		<Button>
			See the Goals
		</Button>
	</a>

	<a href="https://github.com/ryanfiller/sapper-test">
		<Button>
			See the Code
		</Button>
	</a>
</div>

