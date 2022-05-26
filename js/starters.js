'use strict'
const BOMB = '💣'

function startGame(idxi, idxj){
    var locations = getRandLocation(idxi, idxj)
    for(var i = 0 ; i < gLevel.mines ; i++){
        creatBomb(locations)
    }
}

function creatBomb(locations){
    var randLocation = locations.splice(getRandomInt(0, locations.length),1)
    console.log('locations',locations)
    console.log('randLocation',randLocation)
    gBoard[randLocation[0].i][randLocation[0].j].isMine = true
}

function getRandLocation(idxi, idxj){
    var locations = []
    for(var i = 0 ; i < gBoard.length ; i++){
        for(var j = 0 ; j < gBoard[0].length ; j++){
            if(i < idxi - 1 || i > idxi + 1 || j < idxj - 1 || j > idxj + 1){
                locations.push(gBoard[i][j].location)
            }
        }
    }
    return locations
}

function setMineNegsCount(){
    // console.log('gBoard[i][j]',gBoard[1][1])
    for(var i = 0 ; i < gBoard.length ; i++){
        for(var j = 0 ; j < gBoard[0].length ; j++){
            gBoard[i][j].minesAroundCount = countNeighbors({i, j})
            if(gBoard[i][j].minesAroundCount === 0)continue
            if(gBoard[i][j].isMine)continue
            gBoard[i][j].isMineAround = true
            // renderCell({i, j}, count)
        }
    }
}