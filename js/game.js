'use strict'
const EMPTY = ' '
const FLAG ='🏴'
const STARTFACE = '😃'
const LOZFACE = '😱'

var gLevel = {
    size: 4,
    mines: 2
}
var gBoard
var gStartTime
var gInterval

var gGame = {
    isOn: false,
    isStart: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isVictory: false,
}

function init() {
    var elFace =document.querySelector('.face')
        elFace.innerText = STARTFACE

    clearInterval(gInterval)
    gInterval = 0

    gStartTime = 0
    renderTime()

    gGame = {
        isOn: true,
        isStart: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        isVictory: false,
    }

    gBoard = creatBoard(gLevel.size)
    printMat(gBoard, '.board-game')
}

function creatBoard(length) {

    var board = []
    for (var i = 0; i < length; i++) {
        board[i] = []
        for (var j = 0; j < length; j++) {
            board[i][j] = {
                location: { i, j },
                minesAroundCount: 0,
                isMark: false,
                isShown: false,
                isMine: false,
                isMineAround: false
            }
        }
    }
    return board
}

function cellClicked(elCell, i, j) {
    if(!gGame.isOn) return
    if(!gGame.isStart) {
        startGame(i, j)
        setMineNegsCount()
        gGame.isStart = true
        if (!gInterval) {
			gStartTime = new Date();
			gInterval = setInterval(renderTime, 1);
		}
    }
    var value = (gBoard[i][j].isMine) ? BOMB : gBoard[i][j].minesAroundCount
    if(value === BOMB){
        gameOver() 
        return
    } 
    renderCells({ i, j }, value)
    checkVictory()
    console.log(gGame.shownCount)

}

function gameOver(victory = false){
    clearInterval(gInterval)
    gGame.isOn = false

    if(!victory){
        var elFace =document.querySelector('.face')
        elFace.innerText = LOZFACE
    }

    var elgameOver = document.querySelector('.game-over')
    console.log('elgameOver',elgameOver)
    elgameOver.style.disply = 'block'

    for(var i = 0 ; i < gBoard.length ; i++){
        for(var j = 0 ; j < gBoard[0].length ; j++){
            if(gBoard[i][j].isMine) renderCell({i,j}, BOMB)

        }
    }
}

function checkVictory(){
    if(gGame.shownCount + gGame.markedCount === gLevel.size ** 2){
        gameOver(true)
        var elVictory = document.querySelector('.victory')
        elVictory.style.disply = 'block'
    }
}
