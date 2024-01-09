function generateCells(widthNum = 2, depthNum = 2, heightNum = 2){
    let cells = []
    for(let i=0; i<widthNum; i++){
        cells[i] = []
        for(let j=0; j<depthNum; j++){
            cells[i][j] = []
            for(let k=0; k<heightNum; k++){
                const seed = Math.random()
                if(seed > 0.5){
                    cells[i][j][k] = {
                        aliveNow: { aliveNextValue: 1 },
                        aliveNext: { aliveNextValue: 0 },
                        liveNeighbors: 1,
                        x: i,
                        y: k, 
                        z: j,
                    }
                } else {
                    cells[i][j][k] = {
                        aliveNow: { aliveNextValue: 0 },
                        aliveNext: { aliveNextValue: 0 },
                        liveNeighbors: 0,
                        x: i,
                        y: k, 
                        z: j,
                    }
                }
            }
        }
    }
    console.log('generated CA world', cells)
    return cells
}


function cellIsAliveNextGeneration(net, cells){
    for(let i=0; i<cells.length; i++){
        for(let j=0; j<cells[i].length; j++){
            for(let k=0; k<cells[i][j].length; k++){
            cells[i][j][k].liveNeighbors = 0

            if(typeof cells[i-1] != 'undefined'){
                if(typeof cells[i-1][j-1] != 'undefined'){
                    if(typeof cells[i-1][j-1][k-1] != 'undefined' && cells[i-1][j-1][k-1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j-1][k] != 'undefined' && cells[i-1][j-1][k].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j-1][k+1] != 'undefined' && cells[i-1][j-1][k+1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i-1][j] != 'undefined'){
                    if(typeof cells[i-1][j][k-1] != 'undefined' && cells[i-1][j][k-1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j][k] != 'undefined' && cells[i-1][j][k].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborXneg = true
                    } else {
                        cells[i][j][k].aliveNeighborXneg = false
                    }
                    if(typeof cells[i-1][j][k+1] != 'undefined' && cells[i-1][j][k+1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i-1][j+1] != 'undefined'){
                    if(typeof cells[i-1][j+1][k-1] != 'undefined' && cells[i-1][j+1][k-1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j+1][k] != 'undefined' && cells[i-1][j+1][k].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j+1][k+1] != 'undefined' && cells[i-1][j+1][k+1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                }
            }

            if(typeof cells[i] != 'undefined'){
                if(typeof cells[i][j-1] != 'undefined'){
                    if(typeof cells[i][j-1][k-1] != 'undefined' && cells[i][j-1][k-1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i][j-1][k] != 'undefined' && cells[i][j-1][k].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborZneg = true
                    } else {
                        cells[i][j][k].aliveNeighborZneg = false
                    }
                    if(typeof cells[i][j-1][k+1] != 'undefined' && cells[i][j-1][k+1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i][j] != 'undefined'){
                    if(typeof cells[i][j][k-1] != 'undefined' && cells[i][j][k-1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborYneg = true
                    } else {
                        cells[i][j][k].aliveNeighborYneg = false
                    }
                    // if(typeof cells[i][j][k] != 'undefined' && cells[i][j][k].aliveNow){
                    //     cells[i][j][k].liveNeighbors++
                    // }
                    if(typeof cells[i][j][k+1] != 'undefined' && cells[i][j][k+1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborYpos = true
                    } else {
                        cells[i][j][k].aliveNeighborYpos = false
                    }
                }

                if(typeof cells[i][j+1] != 'undefined'){
                    if(typeof cells[i][j+1][k-1] != 'undefined' && cells[i][j+1][k-1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i][j+1][k] != 'undefined' && cells[i][j+1][k].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborZpos = true
                    } else {
                        cells[i][j][k].aliveNeighborZpos = false
                    }
                    if(typeof cells[i][j+1][k+1] != 'undefined' && cells[i][j+1][k+1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                }
            }

            if(typeof cells[i+1] != 'undefined'){
                if(typeof cells[i+1][j-1] != 'undefined'){
                    if(typeof cells[i+1][j-1][k-1] != 'undefined' && cells[i+1][j-1][k-1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j-1][k] != 'undefined' && cells[i+1][j-1][k].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j-1][k+1] != 'undefined' && cells[i+1][j-1][k+1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i+1][j] != 'undefined'){
                    if(typeof cells[i+1][j][k-1] != 'undefined' && cells[i+1][j][k-1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j][k] != 'undefined' && cells[i+1][j][k].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborXpos = true
                    } else {
                        cells[i][j][k].aliveNeighborXpos = false
                    }
                    if(typeof cells[i+1][j][k+1] != 'undefined' && cells[i+1][j][k+1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i+1][j+1] != 'undefined'){
                    if(typeof cells[i+1][j+1][k-1] != 'undefined' && cells[i+1][j+1][k-1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j+1][k] != 'undefined' && cells[i+1][j+1][k].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j+1][k+1] != 'undefined' && cells[i+1][j+1][k+1].aliveNow.aliveNextValue > 0.85){
                        cells[i][j][k].liveNeighbors++
                    }
                }
            }

                
                let c = { aliveNeighbors: cells[i][j][k].liveNeighbors };
                cells[i][j][k].aliveNext = net.run(c);

            
            }
        }
    }
    // console.log('checking if cell is alive next gen', cells)
}

function resetGeneration(cells){
    for(let i=0; i<cells.length; i++){
        for(let j=0; j<cells[i].length; j++){
            for(let k=0; k<cells[i][j].length; k++){  
                cells[i][j][k].aliveNow = cells[i][j][k].aliveNext
            }
        }
    }
    // console.log('updating cell current state with next state', cells)
}


export function updateWorldWithNeuralNetwork(widthNum = 3, depthNum = 3, heightNum = 3, gens = 3, net){
    let cells = generateCells(widthNum, depthNum, heightNum)
    // console.log('updating CA world', cells)
    cellIsAliveNextGeneration(net, cells)

    for(let i = 0; i < gens; i++){
        resetGeneration(cells)
        cellIsAliveNextGeneration(net, cells)
    }

    return cells

}
