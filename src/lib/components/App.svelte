<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { net } from '$lib/store'

  let proceduralWorld
</script>

<Canvas>
  <Scene bind:this={proceduralWorld} />
</Canvas>

<button id='createButton' on:click={()=>{proceduralWorld.getAssetsData(10,10,10,5,$net)}} style='margin: 20px 0 20px 10px;'>Create New City</button>

<style>
  #createButton{
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2em;
    position: absolute;
    bottom: 0;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    border: none;
    background: radial-gradient(#3d95ee, #4233fb);
    box-shadow: 0 0 10px #3d95ee;
    color: #f9f9f9;
    cursor: pointer;
  }
</style>
