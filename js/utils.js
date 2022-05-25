'use strict'

function printMat(mat, selector) {
    
    var strHTML = `<table border="2"><tbody>`
    for (var i = 0; i < mat.length; i++) {
      strHTML += `<tr>`
      for (var j = 0; j < mat[0].length; j++) {
        var cell = mat[i][j].value;
        var className = `cell cell-${i}-${j}`
        strHTML += `<td class="${className}" 
        onclick="cellClicked(this ,${i},${j})" >
        <div class="hidding"></div>
        <div>${cell}</div>
        </td>`
      }
      strHTML += `</tr>`
    }
    strHTML += `</tbody></table>`
    var elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
  }

  function renderCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerText = value;
  }