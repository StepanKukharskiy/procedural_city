<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'

  let proceduralWorld
</script>

<Canvas>
  <Scene bind:this={proceduralWorld} />
</Canvas>

<button id='createButton' on:click={()=>{proceduralWorld.getAssetsData()}} style='margin: 20px 0 20px 10px;'>Generate City</button>

<style>
  #createButton{
    position: absolute;
    bottom: 0;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    border: none;
    background: radial-gradient(#3d95ee, #4233fb);
    box-shadow: 0 0 10px #3d95ee;
    color: #f9f9f9;
  }
</style>
