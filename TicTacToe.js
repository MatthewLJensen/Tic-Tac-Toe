/*
Edited by Matthew on November 9, 2020
*/
function createBoard() {
    let size = Math.max(1, Math.min(9, document.getElementById("size").value));
    let sampleRow = document.getElementById("row0");
    let sampleCell = document.getElementById("cell00");

    document.getElementById("grid").innerHTML = "";
	enableCells(); //Side effect of disabling cells to prevent further playing.
	
    sampleRow.style.display = "block";

    for (let rowNum = 1; rowNum <= size; rowNum++) {
        row = createRow(size, rowNum, sampleRow);
        for (let colNum = 1; colNum <= size; colNum++) {
            createCell(size, row, sampleCell, rowNum, colNum);
        }
    }

    sampleRow.style.display = "none";
    document.getElementById("turn").style.display = "block";
    return false;
}

function createRow(size, rowNum, sampleRow) {
    let row = sampleRow.cloneNode();
    // classes for highlighting
    row.id = "row" + rowNum;
    row.classList.add(rowNum == 1 ? "rowTop" : rowNum == size ? "rowBottom" : "rowMiddle");
    row.classList.add(rowNum % 2 ? "rowOdd" : "rowEven");
    grid.appendChild(row);
    return row;
}

function createCell(size, row, sampleCell, rowNum, colNum) {
    let cell = sampleCell.cloneNode(true);
    cell.id = "cell" + rowNum + colNum;
    cell.classList.add("row" + rowNum);
	cell.classList.add("cell_in_game");
	if (colNum != 1){
		cell.classList.add("column");
	}
    cell.classList.add("column" + colNum);
    if (rowNum == colNum) {
        cell.classList.add("diagonal1");
    }
    if (colNum == size - rowNum + 1) {
        cell.classList.add("diagonal2");
    }
    row.appendChild(cell);
    return cell;
}

function playAt(cell) {
    if (cell.innerHTML == "&nbsp;") {
        playerElement = document.getElementById("player");
    
    cell.innerHTML = playerElement.innerHTML;
    playerElement.innerHTML = playerElement.innerHTML == "X" ? "O" : "X";
	}
    checkForWinAt(cell.innerHTML, cell.id[4], cell.id[5]);
}

function checkForWinAt(player, rowNum, colNum) {
    if (checkAndHighlight(player, "row" + rowNum) || checkAndHighlight(player, "column" + colNum) || checkAndHighlight(player, "diagonal1") || checkAndHighlight(player, "diagonal2")) {
		disableCells(); //keeps players from being able to continue playing after an end-game event has been detected.
        setTimeout(function () {
            alert(player + " wins!");
        }, 10);
        // https://stackoverflow.com/questions/40724697/javascript-do-something-before-alert
        // TODO: don't allow players to keep playing!
        return true;
    } else if (checkDraw()){
		setTimeout(function () {
            alert("It's a tie!");
        }, 10);
	}
    return false;
}

function checkAndHighlight(player, className) {
    let cells = document.getElementsByClassName(className);
    for (let pos = 0; pos < cells.length; pos++) {
        if (cells[pos].innerHTML != player) {
            return false;
        }
    }
    for (let pos = 0; pos < cells.length; pos++) {
        cells[pos].classList.add("win");
    }
    return true;
}

function checkDraw() {
    let cellList = document.getElementsByClassName("cell_in_game");
    for (let pos = 0; pos < cellList.length; pos++) {
        if (cellList[pos].innerHTML == "&nbsp;") {
			return false;
			
        }
    }
	
	for (let pos = 0; pos < cellList.length; pos++) {
		cellList[pos].classList.add("draw");
    }
    return true;
}

// This is the method I chose to prevent players from continuing to play after a win is detected. This solution is purely implemented in javascript.
// Tested by performing various win events and making sure the users could no longer click to add marks. I also ensured the cells were reenabled after starting a new game.
// Another method to prevent players from continuing to play could have been to remove the nbsp at each cell. The logic in playAt would then prevent further clicks.
function disableCells(){
	var grid = document.querySelector("#grid");
	grid.style.pointerEvents = "none";
}

function enableCells(){
	var grid = document.querySelector("#grid");
	grid.style.pointerEvents = "auto";
}
