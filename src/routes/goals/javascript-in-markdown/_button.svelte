<script>
  import Button from '../../../components/button.svelte'
  let count = 0
  const updateCount = () => count = count + 1
</script>

<Button onClick={updateCount}>
  Count: {count}
</Button>