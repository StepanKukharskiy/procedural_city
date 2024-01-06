<script>
  import App from '$lib/components/App.svelte'
  // import '../style.css' 
</script>

<div>
  <App />
</div>



<style>
  :global(body) {
    margin: 0;
  }

  div {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, #000609 0%, #0e2f37 100%);
  }

</style>
