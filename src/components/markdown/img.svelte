<script>
  export let src
  export let alt
  export let align
</script>

<style>

  figure {
    display: flex;
    flex-direction: column;
    margin: 0;
  }
  .left {
    align-items: flex-start;
  }

  .right {
    align-items: flex-end;
  }
</style>

<figure class={align}>
    <img src={src} alt={alt} />
    <figcaption>{alt}</figcaption>
</figure>