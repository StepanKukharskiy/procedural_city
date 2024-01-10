<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { net } from '$lib/store'

  let proceduralWorld
</script>

<Canvas>
  <Scene bind:this={proceduralWorld} />
</Canvas>

<button id='createButton' on:click={()=>{proceduralWorld.getAssetsData(10,10,10,5,$net)}} >Create New City</button>

<style>
  #createButton{
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2em;
    position: absolute;
    top: 0;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    border: none;
    background: radial-gradient(#8ee7d1, #013d38);
    box-shadow: 0 0 10px #c4f6f690;
    color: #f9f9f9;
    cursor: pointer;
    margin: 20px 0;
  }
</style>
