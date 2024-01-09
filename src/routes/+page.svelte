<script>
  import App from '$lib/components/App.svelte'
  import { loadedAssetsNumber, netData } from '$lib/store';
  import '../styles.css' 
  import { availableAssets } from '$lib/assets';

  let startScreenDisplay = 'flex'

</script>



<div class='startScreen' style='display: {startScreenDisplay}'>
  <h2>Discrete Spaces: A Procedural World Project</h2>
  <p>
    This project is created for the Three.js Journey Procedural World challenge. <br><br>
    It is a fantasy city, inspired by the idea of discrete space, works of Stephen Wolfram, and capsule architecture of Nakagin Tower in Tokyo. <br><br>
    The world's generation is driven by a 3D Neural Cellular Automaton - a 3D cellular automaton controlled by a pre-trained neural network.<br><br>
    Built with Threlte, SvelteKit, Three.js, and Brain.js. Modelled with Blender. Textures made with Midjourney. Here is the <a href='https://github.com/StepanKukharskiy/procedural_city'>GitHub repo</a>.<br><br>
    Thanks for checking it out! Have a great day! <br>
    Stepan<br>
    ✨
  </p>

  <div style='max-width: 500px; height: 150px; background: none; display: flex; justify-content: center; align-items: center; flex-direction: column;'>
    {#if $loadedAssetsNumber === availableAssets.length && $netData}
      <!-- <p>Net trained! Error: {$netData.error} Iterations: {$netData.iterations}</p> -->
      <button on:click={()=>{startScreenDisplay = 'none'}}>Explore</button>
    {:else}
      <div class='loader'></div>
      <p>loading assets...</p>
    {/if}
  </div>
</div>


<div>
  <App />
</div>


<style>
  :global(body) {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  .startScreen{
    width: 100vw;
    height: auto;
    min-height: 100svh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background: #1a1a1a;
    backdrop-filter: blur(40px);
    color: #f9f9f9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .startScreen h2{
    font-family: 'Montserrat', sans-serif;
  }

  .startScreen button {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    border: none;
    background: radial-gradient(#3d95ee, #4233fb);
    box-shadow: 0 0 10px #3d95ee;
    color: #f9f9f9;
    margin: 20px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2em;
    transform: scale(1.0);
  }
  .startScreen button:hover{
    transform: scale(1.1);
  }

  .startScreen p{
    max-width: 500px;
  }

  .startScreen a{
    color: #3d95ee;
  }

  .loader{
    width: 40px; 
    height: 40px;
    margin-top: 20px;
    border: 2px solid #f9f9f9;
    border-bottom-color: transparent;
    border-radius: 50%;
    background: none;
    animation: spin 1s linear infinite;
  }

  @keyframes spin{
    0% {
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }

  div {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, #000609 0%, #0e2f37 100%);
  }

</style>
