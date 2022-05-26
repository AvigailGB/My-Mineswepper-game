'use strict'

function printMat(mat, selector) {

    var strHTML = `<table border="2"><tbody>`
    for (var i = 0; i < mat.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < mat[0].length; j++) {
            // var cell = (mat[i][j].minesAroundCount === 0)? ' ' : mat[i][j].minesAroundCount;
            var className = `cell cell-${i}-${j}`
            strHTML += `<td class="${className}" 
        onclick="cellClicked(this ,${i},${j})" >
        <div class="hidding"></div>
        </td>`
        }
        strHTML += `</tr>`
    }
    strHTML += `</tbody></table>`
    var elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
    rightClicked(mat)
}

function rightClicked(mat) {
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat.length; j++) {
            const noContext = document.querySelector('.cell-' + i + '-' + j);
            noContext.addEventListener('contextmenu', e => {
                e.preventDefault();
                // console.log('e',e.target.classList[1].split('-').slice(1,3).map(n => +n))
                // noContext.innerText = FLAG
                addRemoveFlag(noContext,e.target.classList[1].split('-'))
            },);
        }

    }
}

function renderCells(location, value){
    if(value === 0){ 
        value = ' ' 
        renderNeighbors(location)
     }     
        renderCell(location, value)
        
}

function renderCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerText = value;
    elCell.classList.add('flipped')
    gBoard[location.i][location.j].isShown = true
    gGame.shownCount++
}

function renderNeighbors(location){
    // var locations = []
    for(var i = location.i -1 ; i <= location.i + 1 ; i++){
        if (i < 0 || i >= gBoard.length) continue
        for(var j = location.j -1 ; j <= location.j + 1 ; j++){
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === location.i && j === location.j) continue
            if(gBoard[i][j].isShown === true) continue

            var value = (gBoard[i][j].minesAroundCount === 0)? ' ' :  gBoard[i][j].minesAroundCount
            renderCell({i, j} ,value)
            
            // if(value !== 0){
            //     renderCell({i, j} ,0)
            //     renderNeighbors({i ,j})
            // }else renderCell({i, j} ,value)
            // }else{
            //     locations.push({i ,j}) 
            // }
        }
    }
    // while(locations.length){
    //     location = locations.shift()
    //     renderNeighbors(location)
    // }
}

function countNeighbors(location) {
    var count = 0
    for (var i = location.i - 1; i <= location.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = location.j - 1; j <= location.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === location.i && j === location.j) continue
            if (gBoard[i][j].isMine) count++
        }
    }
    return count
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}