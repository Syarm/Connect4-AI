"use strict";
//Take a look at makeMove() && gameCondition();
//Game will have 2 options. Local and Online
//Local is this
//Online will connect to the php server

(function() {
	let moves;
	let modelBoard;
	let columns = 7;
	let rows = 6;
	let red;//Determines who is currently playing. Player Red or Not Red (Black).
	let winCnt = 4;
	function $(id) {
		return document.getElementById(id);
	}

	window.onload = function () {
    	makeBoard();
		$("reset").addEventListener("click", function(){resetBoard()});
		$("undo").addEventListener("click", function(){undoMove()});
		setHover();
	}

	function undoMove() {
		if (moves.length > 0) {
			let slotIndex = moves.pop();
			let pieceIndex = modelBoard[slotIndex].length - 1;
			let piece = getPiece(slotIndex, pieceIndex);
			piece.classList.remove("red", "black");
			modelBoard[slotIndex].pop();
			red = !red;
		}
	}

	function sendMove() {

	}

	//We need to determine a good algorithm to determine when a 4 in a row is made.
	//Ideally it is better than O(n^2)
	//
	function gameCondition(red, col) {
		let yPos = modelBoard[col].length - 1;
		let xPos = col;
		let piece = $("board").childNodes[xPos].childNodes[yPos];
		let toCheck = null;

		if (red) {
			toCheck = "red";
		} else {
			toCheck = "black"
		}

		// Downward Check
		let cnt = 0;
		if (yPos > winCnt-2) {
			for (let i = yPos; i >= 0; i--) {
				if (getPiece(xPos, i).classList.contains(toCheck)) {
					cnt++;
					if (cnt===winCnt) alert(toCheck + " wins!!!!");
				} else {
					break;
				}
			}
		}

		// Horizontal Check
		cnt = 1;
		// left
		for (let i = xPos-1; i >= 0; i--) {
			if (modelBoard[i][yPos]!=null && getPiece(i, yPos).classList.contains(toCheck)) {
				cnt++;
				if (cnt===winCnt) alert(toCheck + " wins!!!!");
			} else {
				break;
			}
		}
		// right
		for (let i = xPos+1; i < columns; i++) {
			if (modelBoard[i][yPos]!=null && getPiece(i, yPos).classList.contains(toCheck)) {
				cnt++;
				if (cnt===winCnt) alert(toCheck + " wins!!!!");
			} else {
				break;
			}
		}

		// Top Left Check
		cnt = 1;
		let x = xPos - 1;
		let y = yPos + 1;
		// Top left
		while (x >= 0 && y < rows) {
			if (modelBoard[x][y]!=null && getPiece(x, y).classList.contains(toCheck)) {
				x--;
				y++;
				if (cnt===winCnt) alert(toCheck + " wins!!!!");
			} else {
				break;
			}
		}
		x = xPos + 1;
		y = yPos - 1;
		// Bottom right
		while (x < columns && y >= 0) {
			if (modelBoard[x][y]!=null && getPiece(x, y).classList.contains(toCheck)) {
				cnt++;
				x++;
				y--;
				if (cnt===winCnt) alert(toCheck + " wins!!!!");
			} else {
				break;
			}
		}

		// Top Right Check
		cnt = 1;
		x = xPos + 1;
		y = yPos + 1;
		// Top right
		while (x < columns && y < rows) {
			if (modelBoard[x][y]!=null && getPiece(x, y).classList.contains(toCheck)) {
				cnt++;
				x++;
				y++;
				if (cnt===winCnt) alert(toCheck + " wins!!!!");
			} else {
				break;
			}
		}
		x = xPos - 1;
		y = yPos - 1;
		// Bottom left
		while (x >= 0 && y >= 0) {
			if (modelBoard[x][y]!=null && getPiece(x, y).classList.contains(toCheck)) {
				cnt++;
				x--;
				y--;
				if (cnt===winCnt) alert(toCheck + " wins!!!!");
			} else {
				break;
			}
		}

	}

	function setHover () {
		let board = $("board");
			for (let i = 0; i < board.childElementCount; i++) {
					board.childNodes[i].addEventListener("mouseenter", mouseToggle);
					board.childNodes[i].addEventListener("mouseleave", mouseToggle);
			}
	}

	function mouseToggle(e) {
		let children = e.target.childNodes;
		children.forEach(function(child, id, children){
			child.classList.toggle("hover");
		});
	}

	function makeBoard() {
		moves = [];
		modelBoard = [];
		for (let i = 0; i < columns; i ++) {
			modelBoard.push([]);
		}
		red = true;
		let board = $("board");
		for (let i = 0; i < 7; i++) {
			let slot = document.createElement("div");
			slot.classList.add("slot");
			for (let j = 0; j < 6; j++) {
				let square = document.createElement("div");
				square.classList.add("square");
				//square.innerHTML = i*6 + j;
				// numbers for debugging
				slot.appendChild(square);
			}
			slot.addEventListener("click", function(e){ moveEvent(e)});
			board.appendChild(slot);
		}
	}

	function resetBoard() {
		let board = $("board");
		while (board.firstChild) {
    		board.removeChild(board.firstChild);
  		}
		makeBoard();
		setHover();
	}



	//Over here we will call gameCondition after the move is made.
	function moveEvent(event) {
		let collumn = event.target;
		if(collumn.classList.contains("square")) {
			collumn = collumn.parentNode;
		}
		makeMove(collumn);
	}

	function makeMove(column) {
		for (let i = 0; i < column.childElementCount; i++) {
			let child = column.childNodes[i];
			if(!(child.classList.contains("red") || child.classList.contains("black"))) {
				let col = getColumnIndex(child)
				moves.push(col);
				modelBoard[col].push(red);
				if (red) {
					child.classList.add("red");
				} else {
					child.classList.add("black");
				}
				gameCondition(red, col);
				red = !red;
				return;
			}
		}
	}

	function getColumnIndex(piece) {
		let column = piece.parentNode;
		let board = column.parentNode;
		let xPos = 0;
		for (let i = 0; i < board.childNodes.length; i++) {
			if (board.childNodes[i]===column) {
				xPos = i;
			}
		}
		return xPos;
	}

	function getPiece(xPos, yPos){
		return $("board").childNodes[xPos].childNodes[yPos];
	}

})();
