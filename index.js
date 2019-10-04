"use strict";
(function() {
	let red = true;
	function $(id) {
		return document.getElementById(id);
	}

	window.onload = function () {
    makeBoard();
		$("reset").addEventListener("click", function(){resetBoard()});
	}

	function makeBoard() {
		let board = $("board");
		for (let i = 0; i < 7; i++) {
			let slot = document.createElement("div");
			slot.classList.add("slot");
			for (let j = 0; j < 6; j++) {
				let square = document.createElement("div");
				square.classList.add("square");
				square.classList.add("white");
				square.innerHTML = i*7 + j;
				slot.appendChild(square);
			}
			slot.addEventListener("click", function(e){ makeMove(e)}, true);
			board.appendChild(slot);
		}
		console.log("this ran");
	}

	function resetBoard() {
		let board = $("board");
		while (board.firstChild) {
    	board.removeChild(board.firstChild);
  	}
		red = true;
		makeBoard();
	}

	function makeMove(event) {

		let slot = event.target.parentNode;
		for (let i = slot.childElementCount - 1; i >= 0; i--) {
			let child = slot.childNodes[i];
			if(child.classList.contains("white")) {
				child.classList.remove("white");
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



})();
