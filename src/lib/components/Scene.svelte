<script>
  import { T, useFrame, useThrelte } from '@threlte/core'
  import { interactivity, ContactShadows, Float, Grid, OrbitControls, InstancedMesh, Instance, useGltf, useCursor } from '@threlte/extras'

  import { updateWorld } from '../worldCA';
  import { updateWorldWithNeuralNetwork } from '../worldNCA';
  import { availableAssets } from '../assets';
  import { Mesh, BufferGeometry, MeshStandardMaterial, AxesHelper, HemisphereLight, BufferAttribute, AdditiveBlending } from 'three';
  import { loadedAssetsNumber, netData, net } from '../store';

  import { onMount } from 'svelte';
  
  let brain;
  let assetsData = [];


  onMount(() => {
    // const script = document.createElement('script');
    // script.src = 'https://unpkg.com/brain.js';
    // script.async = true;
    // script.onload = () => {
    //   brain = window.brain;
    //   // Now you can use the 'brain' object here
    //   console.log(brain);

    //   net = new brain.NeuralNetwork()
    //   console.log(net)
    // };
    // document.body.appendChild(script);
    
    brain = window.brain;
      // Now you can use the 'brain' object here
      console.log(brain);

      // net = new brain.NeuralNetwork()
      // console.log(net)

      // Define the training data
    // const trainingData = [
    //   { input: { aliveNeighbors: 0 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 1 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 2 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 3 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 4 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 5 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 6 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 7 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 8 }, output: { aliveNextValue: 1 } },
    //   { input: { aliveNeighbors: 9 }, output: { aliveNextValue: 1 } },
    //   { input: { aliveNeighbors: 10 }, output: { aliveNextValue: 1 } },
    //   { input: { aliveNeighbors: 11 }, output: { aliveNextValue: 1 } },
    //   { input: { aliveNeighbors: 12 }, output: { aliveNextValue: 1 } },
    //   { input: { aliveNeighbors: 13 }, output: { aliveNextValue: 1 } },
    //   { input: { aliveNeighbors: 14 }, output: { aliveNextValue: 1 } },
    //   { input: { aliveNeighbors: 15 }, output: { aliveNextValue: 1 } },
    //   { input: { aliveNeighbors: 16 }, output: { aliveNextValue: 1 } },
    //   { input: { aliveNeighbors: 17 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 18 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 19 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 20 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 21 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 22 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 23 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 24 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 25 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 26 }, output: { aliveNextValue: 0 } },
    //   { input: { aliveNeighbors: 27 }, output: { aliveNextValue: 0 } },
    // ];



    // Create a neural network
    $net = new brain.NeuralNetwork();

    // const config = {
    //   errorThresh: 0.05,
    //   iterations: 100000,
    //   hiddenLayers: [3],
    // }

    // Train the neural network
    // $netData = $net.train(trainingData, config);
    // console.log($netData)

    // const networkState = $net.toJSON();
    // console.log(networkState)

    // const downloadFile = () => {
    //      const link = document.createElement("a");
    //      const content = JSON.stringify(networkState);
    //      const file = new Blob([content], { type: 'text/plain' });
    //      link.href = URL.createObjectURL(file);
    //      link.download = "network_state.json";
    //      link.click();
    //      URL.revokeObjectURL(link.href);
    //   };

    //   downloadFile()

    $net.fromJSON(JSON.parse('{"type":"NeuralNetwork","sizes":[1,3,1],"layers":[{"weights":[],"biases":[]},{"weights":[[-1.6377098560333252],[-1.8206164836883545],[-0.9183825850486755]],"biases":[9.119729042053223,10.378096580505371,13.632582664489746]},{"weights":[[-5.250181198120117,-5.520458698272705,5.978018283843994]],"biases":[-3.7345571517944336]}],"inputLookup":{"aliveNeighbors":0},"inputLookupLength":1,"outputLookup":{"aliveNextValue":0},"outputLookupLength":1,"options":{"inputSize":0,"outputSize":0,"binaryThresh":0.5},"trainOpts":{"activation":"sigmoid","iterations":100000,"errorThresh":0.05,"log":false,"logPeriod":10,"leakyReluAlpha":0.01,"learningRate":0.3,"momentum":0.1,"callbackPeriod":10,"timeout":"Infinity","beta1":0.9,"beta2":0.999,"epsilon":1e-8}}'))
    $netData = 'hi'
    getAssetsData(10,10,10,15,$net)
  });

  console.log(brain)

  const { scene } = useThrelte()

  interactivity()

  const particlesGeometry = new BufferGeometry()
  const count = 1500

  const positions = new Float32Array(count * 3)

  for(let i = 0; i < count * 3; i++)
  {
      positions[i] = Math.random() * 11 - 1
  }

  particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3))


  useFrame((state, delta) => {
    for(let i = 0; i < count * 3; i+=3)
    {
      positions[i] += Math.sin( positions[i+1] ) * 0.001
      positions[i+1] += 0.1 * delta
        if( positions[i+1] > 11 ){
          positions[i+1] = 0
          positions[i] = Math.random() * 11 - 1
          positions[i+2] = Math.random() * 11 - 1
        }
      positions[i+2] += Math.cos( positions[i+1] ) * 0.001
    }
    particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3))
  })

  const { onPointerEnter, onPointerLeave } = useCursor('pointer', 'default')

  $loadedAssetsNumber = 0

  async function loadAsset(asset){
    const gltf = useGltf(asset.url, {
    useDraco: true
  }).then(result =>{
    $loadedAssetsNumber++
    asset.mesh = new Mesh(result.scene.children[0].geometry, result.scene.children[0].material)
    // console.log($loadedAssetsNumber)
  })
  }

  for(let asset of availableAssets){
    loadAsset(asset)
  }

  class Object3D {
    constructor(id = 0, position = {}, rotation = {}, name = '' ) {
      this.id = id;
      this.position = position;
      this.rotation = rotation;
      this.name = name;
    }
  }

  
  export function getAssetsData(x = 10, y = 10, z = 10, gens = 5, net){
    assetsData = []
    //console.log($selectedAssets)
    let cells
    // cells = updateWorld(x, y, z, gens)
    cells = updateWorldWithNeuralNetwork(x, y, x, gens, net)
    let id = 0
    for(let i=0; i<cells.length; i++){
      for(let j=0; j<cells[i].length; j++){
        for(let k=0; k<cells[i][j].length; k++){  
          if(cells[i][j][k].aliveNow.aliveNextValue > 0.85){
            let selectedAssetNumber = Math.floor(Math.random() * availableAssets.length)
            // console.log(availableAssets[selectedAssetNumber].getRotation())
            
            assetsData = [...assetsData,
            new Object3D(
              id,
              {x: cells[i][j][k].x, y: cells[i][j][k].y + 0.5, z: cells[i][j][k].z},
              availableAssets[selectedAssetNumber].getRotation(),
              availableAssets[selectedAssetNumber].name
            )
            ]
            id++;
          }
        }
      }
    }
    console.log(assetsData[0])
    // $worldData.assetsNumber = assetsData.length
    // $worldData.assets = assetsData
  }

  //getAssetsData()




</script>

<T.Points>
  <T is={particlesGeometry} />
  <T.PointsMaterial color={'cyan'} size={0.065} blending={AdditiveBlending} />
</T.Points>

<T.PerspectiveCamera
  makeDefault
  position={[-20, 10, -20]}
  fov={25}
>
  <OrbitControls
    autoRotate={false}
    enableZoom={true}
    minDistance = {15}
    maxDistance = {45}
    enableDamping
    autoRotateSpeed={0.5}
    target.y={5}
    target = {[5, 5, 5]}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  color={'#1d849e'}
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={1.0} />

<Grid
  position.y={-0.01}
  position= {[5,0,5]}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={25}
  cellSize={1}
  gridSize={[10, 10]}
/>

<!-- <ContactShadows
  scale={20}
  blur={2}
  far={2.5}
  opacity={0.5}
/> -->



<T.FogExp2 color={'#06191f'} density={0.0125} 
  on:create={({ ref }) => {
  scene.fog = ref
  //cleanup(() => scene.fog = null) 
}} />

<!-- <FogExp2 color={'#dddddd'} density={0.3} /> -->

{#if $loadedAssetsNumber === availableAssets.length}
{#each availableAssets as asset}
    <InstancedMesh 
    limit={10000}
    range={10000}
    frustumCulled = {false}
    >
        <T is={asset.mesh.geometry} />
        <T is={asset.mesh.material} />

        {#each assetsData as assetData}
            {#if asset.name === assetData.name}
                <Instance 
                position.x = {assetData.position.x}
                position.y = {assetData.position.y}
                position.z = {assetData.position.z}
                rotation.x = {assetData.rotation.x}
                rotation.y = {assetData.rotation.y}
                rotation.z = {assetData.rotation.z}
                color = {assetData.color}
                on:click={(e) => {
                  // e.stopPropagation(); 
                  // if ( $worldAddAsset === false ){ $assetOptionsPanelDisplay = 'block' }; 
                  // $selectedAsset = selectAsset(e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z); 
                  // //addAsset(e.intersections[0].object.position.x + e.normal.z, e.intersections[0].object.position.y + e.normal.y, e.intersections[0].object.position.z + e.normal.x); 
                  // if ( $worldAddAsset === true ){ addAsset(e.point.x, e.point.y, e.point.z, e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z); };
                  // console.log(e.point, $selectedAsset.userLoopCode, $selectedAsset.speed);
                  // console.log($worldData.assets)
                  }}
                on:create = {()=>{}}
                on:pointerover={onPointerEnter}
                on:pointerleave={onPointerLeave}
                />
            {/if}
        {/each}
    </InstancedMesh>
    {/each}
{/if}


