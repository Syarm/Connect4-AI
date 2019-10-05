"use strict";
//Take a look at makeMove() && gameCondition();
(function() {
	let moves = [];
	let red = true;//Determines who is currently playing. Player Red or Not Red (Black).
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
			let index = moves.pop();
			let piece = getPiece(index);
			piece.classList.remove("red", "black");
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
			slot.addEventListener("click", function(e){ makeMove(e)}, true);
			board.appendChild(slot);
		}
	}

	function resetBoard() {
		let board = $("board");
		while (board.firstChild) {
    		board.removeChild(board.firstChild);
  		}
		red = true;
		makeBoard();
		moves = [];
		setHover();
	}


	//Over here we will call gameCondition after the move is made.
	function makeMove(event) {
		let slot = event.target.parentNode;
		for (let i = slot.childElementCount - 1; i >= 0; i--) {
			let child = slot.childNodes[i];
			if(!(child.classList.contains("red") || child.classList.contains("black"))) {
				moves.push(getIndex(child));
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

	function getIndex(piece) {
		let slot = piece.parentNode;
		let yPos = 0;
		for (let i = 0; i < slot.childNodes.length; i++) {
			if (slot.childNodes[i]===piece) {
				yPos = i;
			}
		}
		let xPos = 0;
		let board = slot.parentNode;
		for (let i = 0; i < board.childNodes.length; i++) {
			if (board.childNodes[i]===slot) {
				xPos = i;
			}
		}
		return xPos*6 + yPos;
	}

	function getPiece(index) {
		let yPos = index % 6;
		let xPos = Math.floor(index / 6);
		return $("board").childNodes[xPos].childNodes[yPos];
	}



})();
