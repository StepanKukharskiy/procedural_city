<script>
  import { T, useFrame, useThrelte } from '@threlte/core'
  import { interactivity, ContactShadows, Float, Grid, OrbitControls, InstancedMesh, Instance, useGltf, useCursor } from '@threlte/extras'

  import { updateWorld } from '../worldCA';
  import { availableAssets } from '../assets';
  import { Mesh, BufferGeometry, MeshStandardMaterial, AxesHelper, HemisphereLight, BufferAttribute, AdditiveBlending } from 'three';
  import { loadedAssetsNumber } from '../store';

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
    // console.log($loadedAssetsNumber, availableAssets.length)
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

  let assetsData = []

  export function getAssetsData(x = 10, y = 10, z = 10, gens = 5){
    assetsData = []
    //console.log($selectedAssets)
    let cells
    cells = updateWorld(x, y, z, gens)
    let id = 0
    for(let i=0; i<cells.length; i++){
      for(let j=0; j<cells[i].length; j++){
        for(let k=0; k<cells[i][j].length; k++){  
          if(cells[i][j][k].aliveNow){
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

  getAssetsData()




</script>

<T.Points>
  <T is={particlesGeometry} />
  <T.PointsMaterial color={'cyan'} size={0.065} blending={AdditiveBlending} />
</T.Points>

<T.PerspectiveCamera
  makeDefault
  position={[-10, 10, -10]}
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
<T.AmbientLight intensity={0.5} />

<Grid
  position.y={-0.01}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={25}
  cellSize={1}
/>

<ContactShadows
  scale={20}
  blur={2}
  far={2.5}
  opacity={0.5}
/>



<T.FogExp2 color={'#06191f'} density={0.025} 
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


