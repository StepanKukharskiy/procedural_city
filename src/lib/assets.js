export let availableAssets = [
    {
        type: 'asset',
        number: 0,
        name: 'capsule1',
        url: '/assets/city_asset_1.glb',
        state: 'notSelected',
        selected: false,
        color: 'red',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        }
    },
    {
        type: 'asset',
        number: 0,
        name: 'capsule2',
        url: '/assets/city_asset_2.glb',
        state: 'notSelected',
        selected: false,
        color: 'blue',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        }
    },
    {
        type: 'asset',
        number: 0,
        name: 'platform1',
        url: '/assets/mushroom_platform.glb',
        state: 'notSelected',
        selected: false,
        color: 'blue',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        }
    },
    {
        type: 'asset',
        number: 0,
        name: 'platform2',
        url: '/assets/mushroom_platform_2.glb',
        state: 'notSelected',
        selected: false,
        color: 'blue',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        }
    }
]