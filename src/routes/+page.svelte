<script>
  import App from '$lib/components/App.svelte'
  import { loadedAssetsNumber } from '$lib/store';
  // import '../style.css' 
  import { availableAssets } from '$lib/assets';

  let startScreenDisplay = 'block'
</script>


<div class='startScreen' style='display: {startScreenDisplay}'>
  <h2>Procedural City</h2>

  {#if $loadedAssetsNumber === availableAssets.length}
    <button on:click={()=>{startScreenDisplay = 'none'}}>START</button>
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>


<div>
  <App />
</div>


<style>
  :global(body) {
    margin: 0;
  }

  .startScreen{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background: #1a1a1a;
    backdrop-filter: blur(40px);
    color: #f9f9f9;
    display: flex;
    flex-direction: column;
  }

  .startScreen button {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    border: none;
    background: radial-gradient(#3d95ee, #4233fb);
    box-shadow: 0 0 10px #3d95ee;
    color: #f9f9f9;
  }

  div {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, #000609 0%, #0e2f37 100%);
  }

</style>
