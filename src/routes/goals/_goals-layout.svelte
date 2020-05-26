<script context="module">
  // mdsvex stuff
  import { img } from '../../components/markdown'
  export { img }
</script>

<script>
  export let title
  export let emoji

  import NextPrev from '../../components/next-prev.svelte'
</script>

<style>
  .emoji {
    display: block;
    margin: 1rem auto 0 auto;
    font-size: 3rem;
    text-align: center;
  }
</style>

<svelte:head>
	<title>{title} {emoji}</title>
</svelte:head>

<div class='content'>
  <span class='emoji'>{emoji}</span>
  <slot/>

  <NextPrev current={title} />
</div>
