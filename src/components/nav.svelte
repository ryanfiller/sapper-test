<script>
	import { onMount, afterUpdate } from 'svelte';

	export let active
	let left
	let right

	const getActive = () => {
		const ul = document.getElementsByClassName('main-nav')[0].getElementsByTagName('ul')[0]
		const active = document.getElementsByClassName('active')[0]
		const {left, right} = active.getBoundingClientRect()
		ul.style.setProperty('--left', `${left}px`);
		ul.style.setProperty('--right', `${right}px`);
	}

	onMount(() => getActive())
	afterUpdate(() => getActive())
</script>

<style type="text/scss">
  @import '../_styles/variables';

	nav {
		border-bottom: 1px solid transparentize($sapperOrange, .8);
		font-weight: 300;
	}

	ul {
		margin: 0;
		padding: 0;
		display: flex;
		list-style: none;
		position: relative;
		--left: 0;
		--right: 0;
	}

	li {
		flex: 1;
	}

	ul::after {
		position: absolute;
		content: '';
		height: 2px;
		background-color: $sapperOrange;
		display: block;
		bottom: -1px;
		transition: $transition;
		left: var(--left);
		width: calc(var(--right) - var(--left));
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		text-align: center;
		cursor: pointer;
	}

	a.active {
		font-weight: bold;
		color: $sapperOrange;
	}

</style>

<nav class='main-nav'>
	<ul>
		<li>
			<a href='/' class={!active ? 'active' : ''}>
				about
			</a>
		</li>
		<li>
			<a rel=prefetch href='goals' class={active === 'goals' ? 'active' : ''}>
				goals
			</a>
		</li>
	</ul>
</nav>
