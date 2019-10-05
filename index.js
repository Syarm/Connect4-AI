"use strict";
(function() {
	let moves = [];
	let red = true;//Determines who is currently playing. Player Red or Not Red (Black).
	function $(id) {
		return document.getElementById(id);
	}

	window.onload = function () {
    makeBoard();
		$("reset").addEventListener("click", function(){resetBoard()});
		setHover();
	}

	function sendMove() {

	}

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
				square.innerHTML = i*6 + j+1;
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
		
	}

	function getPiece(index) {

	}



})();
