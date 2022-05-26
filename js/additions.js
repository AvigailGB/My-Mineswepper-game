
function changeGamelevel(length) {
    gLevel.size = length

    switch (gLevel.size) {
        case 4:
            gLevel.mines = 2
            break
        case 8:
            gLevel.mines = 12
            break
        case 12:
            gLevel.mines = 30
            break
    }
    init()
}

function addRemoveFlag(elCell,cellidx){
    var idxI = +cellidx[1]
    var idxJ = +cellidx[2]
    console.log('elCell.innerText',elCell.innerText)
    if(elCell.innerText !== FLAG){
        gBoard[idxI][idxJ].isMark = true
        elCell.innerText = FLAG
        gGame.markedCount++
    }else{
        gBoard[idxI][idxJ].isMark = false
        elCell.innerText = ''
        gGame.markedCount--
    }
    
}

function renderTime() {
	var elTime = document.querySelector('span');
    // elTime = elTime.querySelector('.time')
	if (gStartTime) {
		var timeNow = new Date();
		var seconds = Math.floor((timeNow - gStartTime) / 1000);
		var milliseconds = (timeNow - gStartTime) % 1000;
		elTime.innerText = `${seconds}.${milliseconds}`;
	} else {
		elTime.innerText = '0.000';
	}
}