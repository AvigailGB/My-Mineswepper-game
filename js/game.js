'use strict'

var gBoard 
var gGame = {
    isOn: false,
}

function init() {
    gBoard = creatBoard(4)
    printMat(gBoard, '.board-game')
    gBoard[2][3].value = BOMB
    renderCell({ i: 2, j: 3 }, BOMB)
    gBoard[1][1].value = BOMB
    renderCell({ i: 1, j: 1 }, BOMB)
    setMineNegsCount()
}

function creatBoard(length) {

    var board = []
    for (var i = 0; i < length; i++) {
        board[i] = []
        for (var j = 0; j < length; j++) {
            board[i][j] = {
                location: { i, j },
                countNegs: 0,
                value: '',
                isMark: false,
                isShown: false
            }
        }
    }
    return board
}

function cellClicked(elCell, i, j) {
    console.log('i ,j',i ,j)
    gBoard[i][j].isShown = true
    var hidding = elCell.querySelector('.hidding')
    hidding.style.display = 'none'

    if (!gGame.isOn) {
       
        // startGame(i, j)
    }
}

function setMineNegsCount(){
    console.log('gBoard[i][j]',gBoard[1][1])
    for(var i = 0 ; i < gBoard.length ; i++){
        for(var j = 0 ; j < gBoard[0].length ; j++){
            gBoard[i][j].countNegs = countNeighbors({i, j})
            var count = gBoard[i][j].countNegs
            if(count === 0)continue
            renderCell({i, j}, count)
        }
    }
}

function countNeighbors(location){
    var count = 0

    for(var i = location.i - 1 ; i <= location.i + 1 ; i++){
        if(i < 0 || i >= gBoard.length) continue
        for(var j = location.j - 1 ; j <= location.j + 1 ; j++){
            if(j < 0 || j >= gBoard[0].length) continue
            if(i === location.i && j === location.j) continue 
            if(gBoard[i][j].value === BOMB) count++
        }
    }
    return count
}

