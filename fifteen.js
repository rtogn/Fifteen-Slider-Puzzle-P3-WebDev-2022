(function() {
    // Globals
    "use strict";
	var MOVES = 0;
    var FRESH_GAME = true;
    var TEMP = 4;
    var SPACE_ROW = 3;
    var SPACE_COLUMN = 3;
    var SIZE = 100;
	var TOTAL_SECONDS = 0;
	var IS_FIRST = true;
	var MY_TIMER;
	var HOUR = 0;
	var MINUTE = 0;
	var SECONDS = 0;

    window.onload = function(){
		create_tiles();
		set_SIZE();
		document.getElementById("start_game").onclick = shuffle_tiles;	
		add_bg_events(8);
		document.getElementById("select").onchange = change_SIZE;    
    };
	
	function add_bg_events(num_bg) {
		// Sets up background change options where num_bg is the number of backgrounds labeled in the format
		// "bg#". Since not scanning folder these images have to be in jpg format. Not the most ideal solution,
		// but it works for the scope of the current situation. 
		//Resulting HTML example: <button id="bg0"  class="choose_bg" onclick="change_bg('bg0')"><img src="img/bg0.jpg" class="img1"></button>	
		
		let col3 = document.getElementById("column3");
		
		for (var i = 0; i <= num_bg-1; i++) {	
			var img_file = "bg" + i;
			var img_file_F = img_file + ".jpg";
			console.log(img_file_F);
			
			var img = document.createElement("img");
			img.classList.add("img1");
			img.src = "img/" + img_file_F;
			
			var buttn = document.createElement("button");
			buttn.classList.add("choose_bg");
			buttn.id = img_file;
			buttn.appendChild(img);
			buttn.addEventListener('click', change_bg.bind(this, img_file_F), false);
			
			col3.appendChild(buttn);
		
		}
	}
	
	//Change background onclick
	function change_bg(background){
		let change_bg = document.getElementsByClassName("tiles");
		let imgPath = "url(\"img/" + background + "\")";
		console.log(imgPath);
		for (var i = 0; i < (TEMP * TEMP)-1; i++){
			
			change_bg[i].style.backgroundImage = imgPath;
		}
	}
	
	function countUpTimer(){
		++TOTAL_SECONDS;
		HOUR = Math.floor(TOTAL_SECONDS / 3600);
		MINUTE = Math.floor((TOTAL_SECONDS - HOUR * 3600) / 60);
		SECONDS = TOTAL_SECONDS - (HOUR * 3600 + MINUTE * 60);
		document.getElementById("timed").innerHTML = "Time: " + HOUR + ":" + MINUTE + ":" + SECONDS;
	}
	
    function shuffle_tiles(){
        // Shuffles board (on click)
        // Prompt if user is in the middle of the game and reset the score on verification.
		document.getElementById("start_game").innerHTML = "Re-Shuffle";
        var end_game_prompt = false;
        if (!FRESH_GAME){
            var end_game_prompt = confirm("Are you sure you want to end this game?");
			if(end_game_prompt){
				clearInterval(MY_TIMER);
			}
        }
        if (FRESH_GAME || end_game_prompt){
            for (let i = 0; i < 1000; i++){
                let all_tiles = document.getElementsByClassName("tiles");
				let neigbors = [];
                for (let j = 0; j < all_tiles.length; j++){
                    if (check_move(all_tiles[j]))
                        neigbors.push(all_tiles[j]);
                }
				let num = rand_num(0, neigbors.length - 1);
                let var_top = neigbors[num].style.top;
                let var_Left = neigbors[num].style.left;
				neigbors[num].style.left = SPACE_COLUMN * SIZE + "px";
                neigbors[num].style.top = SPACE_ROW * SIZE + "px";
                neigbors[num].id = "pos" + SPACE_ROW + "_" + SPACE_COLUMN;
                SPACE_ROW = parseInt(var_top) / SIZE;
                SPACE_COLUMN = parseInt(var_Left) / SIZE;
				clearInterval(MY_TIMER);
            }
			TOTAL_SECONDS = 0;	
            reset_score();
        }
    }
	
	
	function create_tiles(){
        for (var i = 1; i < TEMP * TEMP; i++){
            var div = document.createElement("div");
            div.className = "tiles";
            div.innerHTML = i;
            var row = Math.floor((i - 1) / TEMP);
            var column = (i - 1) % TEMP;
			//starting overwrite the style on each tile
			//set width and height
			div.style.width = SIZE - 1 + "px";
            div.style.height = div.style.width;
			//set position for each tile
			var x = row * (-1) * SIZE + "px";
			var y = column * (-1) * SIZE + "px";
            div.style.backgroundPosition = y + " " + x;
			//center the number of each tile
			div.style.display = "flex";
			div.style.alignItems = "center";
			div.style.justifyContent = "center";
			//show the position
            div.id = "pos" + row + "_" + column;
            div.style.top = row * SIZE + "px";
            div.style.left = column * SIZE + "px";
			div.style.color = "#D1D1D1";
            check_mouseover(div);
            document.getElementById("game_area").appendChild(div);
        }
    }
	
	function rand_num(min, max){
        // Get random integer in given range (inclusive). 
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function reset_score(){
        // Reset music and score when user changes boards. 
        FRESH_GAME = false;
        MOVES = 0;
		MY_TIMER = setInterval(countUpTimer, 1000);
        set_MoveText();
        var audio = document.getElementById("audio");
        audio.currentTime = 0;
        audio.volume = 0.05; // Reduce volume. May need to be adjusted if different track used. 
        audio.play();
    }

    function set_MoveText(){
        // Sets up text that contains win count and counter. 
        let text = "MOVES used: " + MOVES.toString();
        document.getElementById("counter").innerHTML = text;
    }


    function set_SIZE(){
        var select_SIZE = document.createElement("select");
        select_SIZE.id = "select";
        for (var i = 1; i < 9; i++){
            var options = document.createElement("option");
            options.innerHTML = (i+2) + " x " + (i+2);
            options.value = (i+2);
            options.id = "option" + (i+2);
            select_SIZE.appendChild(options);
        }
        document.getElementById("controls").appendChild(select_SIZE);
        select_SIZE.classList.add("buttons");
		//selected 4x4 as default
		document.getElementById("option4").selected = "selected";
    }

    function change_SIZE(){
		// Handles adjusting the board SIZE when user selects an option from the SIZE menu.
		document.getElementById("start_game").innerHTML = "Start Game"; // Reset start button when user selects a new SIZE. 
        TEMP = this.value;
        SPACE_ROW = this.value - 1;
        SPACE_COLUMN = this.value - 1;
        SIZE = parseInt(400 / this.value);
        while (document.getElementById("game_area").contains(document.querySelector(".tiles"))){
            document.getElementById("game_area").removeChild(document.querySelector(".tiles"));
        }
        create_tiles();
        var audio = document.getElementById("audio");
        audio.pause();
        FRESH_GAME = true;
    }



    function playSound(sound_location, volume = 0.5){
        // Generic method to play sound effects. Pass string to location with optional volume between 0.0 & 1.0
        let puzzle_sound = new Audio(sound_location);
        puzzle_sound.volume = volume;
        puzzle_sound.play();
    }

    function check_mouseover(div){
        // Highlight number in cell on mouseover if tile isMovable.
        div.onmouseover = function(){
            if (check_move(this)) {
                this.style.color = "red";
				//this.style.border = "1px solid red";
				this.classList.add("text1");
            }
        };
        // Remove highlight effect when mouse moved off tile. 
        div.onmouseout = function(){
            if (check_move(this)){
                this.style.color = "#D1D1D1";
				//this.style.border = "1px solid black";
				this.classList.remove("text1");
            }
        };
        div.onclick = tiles_OnClick;
    }

    function tiles_OnClick(){
        // Handles tile click event and authenticate board state. 
        // If tile can be moved: make that move, update scoreboard and validate win state.
        if (check_move(this)){
            move(this);
            MOVES++;
            set_MoveText();
            if (check_WinState()){
                var aLert = document.getElementById("alert");
                if (aLert.style.display === "none"){
                    aLert.style.display = "block";
                }
                document.getElementById("msg").innerHTML = "You win!!!" + 
				"<br>" + "Your move: " + MOVES + 
				"<br>" + "Your time: " + HOUR + ":" + MINUTE + ":" + SECONDS;
                playSound("sound/win.mp3", 0.2);
                var audio = document.getElementById("audio");
                audio.pause();
				TOTAL_SECONDS = 0;
				clearInterval(MY_TIMER);
				reset_score();
				clearInterval(MY_TIMER);
                // Else: Display no change
            } 
			else{
                document.getElementById("show").innerHTML = "";
            }
        }
    }

    function move(div){
        // MOVES tile to next available space. 
        div.id = "pos" + SPACE_ROW + "_" + SPACE_COLUMN;
		var div_Column = parseInt(div.style.left) / SIZE;
        var div_Row = parseInt(div.style.top) / SIZE;
        div.style.top = SPACE_ROW * SIZE + "px";
        div.style.left = SPACE_COLUMN * SIZE + "px";
        SPACE_ROW = div_Row;
        SPACE_COLUMN = div_Column;
        // Play sound effect for tile on move.
		animate_tile(div);
        playSound("sound/tile_move.mp3");
    }
	
    function animate_tile(div) {
        div.style.animation=null;
        div.offsetHeight; // Triggers animation to restart.
        div.style.animation="spin 0.25s ease";
    }
	
    function check_move(div){
        // Determines if tile is able to be moved (empty space)
        var div_Row1 = parseInt(div.style.top) / SIZE;
        var div_Column1 = parseInt(div.style.left) / SIZE;
        if (SPACE_ROW == div_Row1){
            return Math.abs(SPACE_COLUMN - div_Column1) == 1;
        } 
		else if (SPACE_COLUMN == div_Column1){
            return Math.abs(SPACE_ROW - div_Row1) == 1;
        } 
		else {
            return false;
        }
    }

    function check_WinState(){
        // Determines if current state is the win state. 
        var tiles = document.querySelectorAll(".tiles");
        for (var i = 0; i < tiles.length; i++){
            var row = Math.floor(i / TEMP);
            var column = i % TEMP;
            if (tiles[i].id != "pos" + row + "_" + column){
                //console.log(tiles[i].id);
                return false;
            }
        }
        return true;
    }
})();
