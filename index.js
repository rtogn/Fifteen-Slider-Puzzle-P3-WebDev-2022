(function() {
    // Globals
    "use strict";
<<<<<<< Updated upstream
    let NUM = 4;
    let spaceRow = 3;
    let spaceColumn = 3;
    let WIDTH = 100;
    let moves = 0;
    let fresh_game = true;
    window.onload = function() {
        setSize();
        document.getElementById("shufflebutton").onclick = shuffle;
        document.getElementById("select").onchange = changeSize;
        createSquares();
    };

    function shuffle() {
        // Shuffles board (on click)
        // Prompt if user is in the middle of the game and reset the score on verification. 
		 document.getElementById("shufflebutton").innerHTML = "Re-Shuffle";
        var end_game_prompt = false;
        if (!fresh_game) {
            var end_game_prompt = confirm("Are you sure you want to end this game?");
        }
        if (fresh_game || end_game_prompt) {
            for (let j = 0; j < 1000; j++) {
                let neigbors = [];
                let allPuzzles = document.getElementsByClassName("puzzletile");
                for (let i = 0; i < allPuzzles.length; i++) {
                    if (isMovable(allPuzzles[i]))
                        neigbors.push(allPuzzles[i]);
                }
                let ranNum = getRandomIntInclusive(0, neigbors.length - 1);
                let tempTop = neigbors[ranNum].style.top;
                let tempLeft = neigbors[ranNum].style.left;
                neigbors[ranNum].style.top = spaceRow * WIDTH + "px";
                neigbors[ranNum].style.left = spaceColumn * WIDTH + "px";
                neigbors[ranNum].id = "square_" + spaceRow + "_" + spaceColumn;
                spaceRow = parseInt(tempTop) / WIDTH;
                spaceColumn = parseInt(tempLeft) / WIDTH;
            }
            reset_score();
        }
    }

    function reset_score() {
        // Reset music and score when user changes boards. 
        fresh_game = false;
        moves = 0;
        setMoveText();
        var audio = document.getElementById("audio");
        audio.currentTime = 0;
        audio.volume = 0.05; // Reduce volume. May need to be adjusted if different track used. 
        audio.play();
    }

    function setMoveText() {
        // Sets up text that contains win count and counter. 
        let text = "Moves used: " + moves.toString();
        document.getElementById("counter").innerHTML = text;
    }

    function getRandomIntInclusive(min, max) {
        // Get random integer in given range (inclusive). 
=======
    var NUM = 4;
    var spaceRow = 3;
    var spaceColumn = 3;
    var WIDTH = 100;
	var moves = 0;
	var fresh_game = true;
    window.onload = function(){
		create_Squares();
		set_Size();
		document.getElementById("shuffle").onclick = shuffle;
		document.getElementById("select").onchange = changeSize;
    };
	
	function create_Squares(){
		for (var i = 1; i < NUM * NUM; i++){
            var div = document.createElement("div");
            div.className = "puzzletile";
            div.innerHTML = i;
            var row = Math.floor((i - 1) / NUM);
            var column = (i - 1) % NUM;
            var x = column * -1 * WIDTH + "px";
            var y = row * -1 * WIDTH + "px";
            div.style.height = WIDTH - 2 + "px";
            div.style.height = WIDTH - 2 + "px";
            div.style.width = div.style.height;
            div.style.backgroundPosition = x + " " + y;
            div.id = "square_" + row + "_" + column;
            div.style.top = row * WIDTH + "px";
            div.style.left = column * WIDTH + "px";
            setEvents(div);
            document.getElementById("puzzlearea").appendChild(div);
        }
    }
	
	function shuffle(){
		var end_game_prompt = false;
		if (!fresh_game) {
			var end_game_prompt = confirm("Are you sure you want to end this game?");
		}
		
		if (fresh_game || end_game_prompt){
			for (let j = 0; j < 1000; j++){
				let neigbors = [];
				let allPuzzles = document.getElementsByClassName("puzzletile");
				for (let i = 0; i < allPuzzles.length; i++){
					if (moveable(allPuzzles[i]))
						neigbors.push(allPuzzles[i]);
				}
				let ranNum = random_num(0, neigbors.length - 1);
				let tempTop = neigbors[ranNum].style.top;
				let tempLeft = neigbors[ranNum].style.left;
				neigbors[ranNum].style.top = spaceRow * WIDTH + "px";
				neigbors[ranNum].style.left = spaceColumn * WIDTH + "px";
				neigbors[ranNum].id = "square_" + spaceRow + "_" + spaceColumn;
				spaceRow = parseInt(tempTop) / WIDTH;
				spaceColumn = parseInt(tempLeft) / WIDTH;
			}
		
			reset_score();
		}
    }
	
	function reset_score() {
		// Reset music and score. 
		fresh_game = false;
		moves = 0;
		document.getElementById("counter").innerHTML = moves;
		var audio = document.getElementById("audio");
		audio.currentTime = 0;
		audio.play();
	}
	
	
	function random_num(min, max){
>>>>>>> Stashed changes
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function set_Size() {
        var temp1 = document.createElement("select");
        temp1.id = "select";
        for (var i = 3; i < 7; i++) {
<<<<<<< Updated upstream
            var option = document.createElement("option");
            option.innerHTML = i + " x " + i;
            option.value = i;
            option.id = "option" + i;
            select.appendChild(option);
=======
            var options = document.createElement("option");
            options.innerHTML = i + " x " + i;
            options.value = i;
            options.id = "option" + i;
            temp1.appendChild(options);
>>>>>>> Stashed changes
        }
        document.getElementById("controls").appendChild(temp1);
        document.getElementById("option4").selected = "selected";
        select.classList.add("buttons");
    }

    function changeSize() {
		// Handles adjusting the board size when user selects an option from the size menu. 
		document.getElementById("shufflebutton").innerHTML = "Start Game"; // Reset start button when user selects a new size. 
        NUM = this.value;
        spaceRow = this.value - 1;
        spaceColumn = this.value - 1;
        WIDTH = parseInt(400 / this.value);
        var puzzlearea = document.getElementById("puzzlearea");
        while (puzzlearea.contains(document.querySelector(".puzzletile"))){
            puzzlearea.removeChild(document.querySelector(".puzzletile"));
        }
<<<<<<< Updated upstream
        createSquares();
        var audio = document.getElementById("audio");
        audio.pause();
        fresh_game = true;
=======
        create_Squares();
				
		var audio = document.getElementById("audio");
		audio.pause();
		fresh_game = true;
>>>>>>> Stashed changes
    }



    function playSound(sound_location, volume = 0.5) {
        // Generic method to play sound effects. Pass string to location with optional volume between 0.0 & 1.0
        let puzzle_sound = new Audio(sound_location);
        puzzle_sound.volume = volume;
        puzzle_sound.play();
    }

    function setEvents(div) {
        // Highlight number in cell on mouseover if tile isMovable.
        div.onmouseover = function() {
            if (isMovable(this)) {
                this.classList.add("highlight");
            }
        };
        // Remove highlight effect when mouse moved off tile. 
        div.onmouseout = function() {
            if (isMovable(this)) {
                this.classList.remove("highlight");
            }
        };
        div.onclick = tileOnClickHandler;
    }

    function tileOnClickHandler() {
        // Handles tile click event and authenticate board state. 
        // If tile can be moved: make that move, update scoreboard and validate win state.
        if (isMovable(this)) {
            makeAMove(this);
            moves++;
            setMoveText();
            if (checkWinState()) {
                var aLert = document.getElementById("alert");
                if (aLert.style.display === "none") {
                    aLert.style.display = "block";
                }
                document.getElementById("msg").innerHTML = "You win";
                playSound("sound/win.mp3", 0.2);
                var audio = document.getElementById("audio");
                audio.pause();
                // Else: Display no change
            } else {
                document.getElementById("output").innerHTML = "";
            }
        }
    }

    function makeAMove(div) {
        // Moves tile to next available space. 
        div.id = "square_" + spaceRow + "_" + spaceColumn;
        var divRow = parseInt(div.style.top) / WIDTH;
        var divColumn = parseInt(div.style.left) / WIDTH;
        div.style.top = spaceRow * WIDTH + "px";
        div.style.left = spaceColumn * WIDTH + "px";
        spaceRow = divRow;
        spaceColumn = divColumn;
        // Play sound effect for tile on move.
        playSound("sound/tile_move.mp3");
    }

    function isMovable(div) {
        // Determines if tile is able to be moved (empty space)
        var divRow = parseInt(div.style.top) / WIDTH;
        var divColumn = parseInt(div.style.left) / WIDTH;
        if (spaceRow == divRow) {
            return Math.abs(spaceColumn - divColumn) == 1;
        } else if (spaceColumn == divColumn) {
            return Math.abs(spaceRow - divRow) == 1;
        } else {
            return false;
        }
    }

    function checkWinState() {
        // Determines if current state is the win state. 
        var tiles = document.querySelectorAll(".puzzletile");
        for (var i = 0; i < tiles.length; i++) {
            var row = Math.floor(i / NUM);
            var column = i % NUM;
            if (tiles[i].id != "square_" + row + "_" + column) {
                //console.log(tiles[i].id);
                return false;
            }
        }
        return true;
    }
})();