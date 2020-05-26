<script>
  export let onClick
</script>

<style type="text/scss">
  @import '../_styles/variables';

	button {
    font-size: 1.5rem;
    color: white;
    background: $sapperOrange;
    padding: .5em;
    border: none;
    transition: $transition;
    cursor: pointer;

    &:hover {
      background: darken($sapperOrange, 10%);
    }
  }
</style>

<button on:click={onClick}>
  <slot></slot>
</button>