"use strict";
//Take a look at makeMove() && gameCondition();
//Game will have 2 options. Local and Online
//Local is this
//Online will connect to the php server

(function() {
	let moves;
	let modelBoard;
	let collumns = 7;
	let rows = 6;
	let red;//Determines who is currently playing. Player Red or Not Red (Black).
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
	function gameCondition() {

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
		for (let i = 0; i < collumns; i ++) {
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
				square.innerHTML = i*6 + j;
				slot.appendChild(square);
			}
			slot.addEventListener("click", function(e){ moveEvent(e)}, true);
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
		makeMove(event.target.parentNode)
	}

	function makeMove(slot) {
		for (let i = 0; i < slot.childElementCount; i++) {
			let child = slot.childNodes[i];
			if(!(child.classList.contains("red") || child.classList.contains("black"))) {
				let col = getSlotIndex(child)
				moves.push(col);
				modelBoard[col].push(red);
				if (red) {
					child.classList.add("red");
				} else {
					child.classList.add("black");
				}
				red = !red;
				return;
			}
		}
	}

	function getSlotIndex(piece) {
		let slot = piece.parentNode;
		let board = slot.parentNode;
		let xPos = 0;
		for (let i = 0; i < board.childNodes.length; i++) {
			if (board.childNodes[i]===slot) {
				xPos = i;
			}
		}
		return xPos;
	}

	function getPiece(slotIndex, pieceIndex){
		return $("board").childNodes[slotIndex].childNodes[pieceIndex];
	}

})();
