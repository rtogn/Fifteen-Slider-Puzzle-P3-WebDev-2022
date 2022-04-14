(function() {
    // Globals
    "use strict";
	var moves = 0;
    var fresh_game = true;
    var temp = 4;
    var space_Row = 3;
    var space_Column = 3;
    var size = 100;
	var totalSeconds = 0;
	var is_First = true;
	var my_Timer;

    window.onload = function(){
		create_tiles();
		set_Size();
		document.getElementById("start_game").onclick = shuffle_tiles;
		document.getElementById("bg").onclick = change_bg;
		document.getElementById("bg1").onclick = change_bg1;
		document.getElementById("bg2").onclick = change_bg2;
		document.getElementById("bg3").onclick = change_bg3;
		document.getElementById("bg4").onclick = change_bg4;
		document.getElementById("bg5").onclick = change_bg5;
		document.getElementById("bg6").onclick = change_bg6;
		document.getElementById("bg7").onclick = change_bg7;     
        document.getElementById("select").onchange = change_Size;      
    };
	
	//Change background onclick
	function change_bg(){
		let change_bg = document.getElementsByClassName("tiles");
		for (var i = 0; i < (temp * temp)-1; i++){
			change_bg[i].style.backgroundImage = "url('background.jpg')";
		}
	}
	
	function change_bg1(){
		let change_bg = document.getElementsByClassName("tiles");
		for (var i = 0; i < (temp * temp)-1; i++){
			change_bg[i].style.backgroundImage = "url('bg1.jpg')";
		}
	}
	
	function change_bg2(){
		let change_bg = document.getElementsByClassName("tiles");
		for (var i = 0; i < (temp * temp)-1; i++){
			change_bg[i].style.backgroundImage = "url('bg2.jpg')";
		}
	}
	
	function change_bg3(){
		let change_bg = document.getElementsByClassName("tiles");
		for (var i = 0; i < (temp * temp)-1; i++){
			change_bg[i].style.backgroundImage = "url('bg3.jpg')";
		}
	}
	
	function change_bg4(){
		let change_bg = document.getElementsByClassName("tiles");
		for (var i = 0; i < (temp * temp)-1; i++){
			change_bg[i].style.backgroundImage = "url('bg4.jpg')";
		}
	}
	
	function change_bg5(){
		let change_bg = document.getElementsByClassName("tiles");
		for (var i = 0; i < (temp * temp)-1; i++){
			change_bg[i].style.backgroundImage = "url('bg5.jpg')";
		}
	}
	
	function change_bg6(){
		let change_bg = document.getElementsByClassName("tiles");
		for (var i = 0; i < (temp * temp)-1; i++){
			change_bg[i].style.backgroundImage = "url('bg6.jpg')";
		}
	}
	
	function change_bg7(){
		let change_bg = document.getElementsByClassName("tiles");
		for (var i = 0; i < (temp * temp)-1; i++){
			change_bg[i].style.backgroundImage = "url('bg7.jpg')";
		}
	}
	
	function countUpTimer(){
		++totalSeconds;
		let hour = Math.floor(totalSeconds / 3600);
		let minute = Math.floor((totalSeconds - hour * 3600) / 60);
		let seconds = totalSeconds - (hour * 3600 + minute * 60);
		document.getElementById("timed").innerHTML = "Time: " + hour + ":" + minute + ":" + seconds;
	}
	
    function shuffle_tiles(){
        // Shuffles board (on click)
        // Prompt if user is in the middle of the game and reset the score on verification.
		document.getElementById("start_game").innerHTML = "Re-Shuffle";
        var end_game_prompt = false;
        if (!fresh_game){
            var end_game_prompt = confirm("Are you sure you want to end this game?");
			clearInterval(my_Timer);
        }
        if (fresh_game || end_game_prompt){
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
				neigbors[num].style.left = space_Column * size + "px";
                neigbors[num].style.top = space_Row * size + "px";
                neigbors[num].id = "pos" + space_Row + "_" + space_Column;
                space_Row = parseInt(var_top) / size;
                space_Column = parseInt(var_Left) / size;
            }
            reset_score();		
        }
    }
	
	
	function create_tiles(){
        for (var i = 1; i < temp * temp; i++){
            var div = document.createElement("div");
            div.className = "tiles";
            div.innerHTML = i;
            var row = Math.floor((i - 1) / temp);
            var column = (i - 1) % temp;
			//starting overwrite the style on each tile
			//set width and height
			div.style.width = size - 1 + "px";
            div.style.height = div.style.width;
			//set position for each tile
			var x = row * (-1) * size + "px";
			var y = column * (-1) * size + "px";
            div.style.backgroundPosition = y + " " + x;
			//center the number of each tile
			div.style.display = "flex";
			div.style.alignItems = "center";
			div.style.justifyContent = "center";
			//show the position
            div.id = "pos" + row + "_" + column;
            div.style.top = row * size + "px";
            div.style.left = column * size + "px";
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
        fresh_game = false;
		clearInterval(my_Timer);
		my_Timer = setInterval(countUpTimer, 1000);
        moves = 0;
        set_MoveText();
        var audio = document.getElementById("audio");
        audio.currentTime = 0;
        audio.volume = 0.05; // Reduce volume. May need to be adjusted if different track used. 
        audio.play();
		
    }

    function set_MoveText(){
        // Sets up text that contains win count and counter. 
        let text = "Moves used: " + moves.toString();
        document.getElementById("counter").innerHTML = text;
    }


    function set_Size(){
        var select_size = document.createElement("select");
        select_size.id = "select";
        for (var i = 1; i < 5; i++){
            var options = document.createElement("option");
            options.innerHTML = (i+2) + " x " + (i+2);
            options.value = (i+2);
            options.id = "option" + (i+2);
            select_size.appendChild(options);
        }
        document.getElementById("controls").appendChild(select_size);
        select_size.classList.add("buttons");
		//selected 4x4 as default
		document.getElementById("option4").selected = "selected";
    }

    function change_Size(){
		// Handles adjusting the board size when user selects an option from the size menu.
		document.getElementById("start_game").innerHTML = "Start Game"; // Reset start button when user selects a new size. 
		var game_area = document.getElementById("game_area");
        temp = this.value;
        space_Row = this.value - 1;
        space_Column = this.value - 1;
        size = parseInt(400 / this.value);
        while (game_area.contains(document.querySelector(".tiles"))){
            game_area.removeChild(document.querySelector(".tiles"));
        }
        create_tiles();
        var audio = document.getElementById("audio");
        audio.pause();
        fresh_game = true;
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
				this.classList.add("text1");
            }
        };
        // Remove highlight effect when mouse moved off tile. 
        div.onmouseout = function(){
            if (check_move(this)){
                this.style.color = "#D1D1D1";
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
            moves++;
            set_MoveText();
            if (check_WinState()){
                var aLert = document.getElementById("alert");
                if (aLert.style.display === "none"){
                    aLert.style.display = "block";
                }
                document.getElementById("msg").innerHTML = "You win";
                playSound("sound/win.mp3", 0.2);
                var audio = document.getElementById("audio");
                audio.pause();
                // Else: Display no change
            } 
			else{
                document.getElementById("show").innerHTML = "";
            }
        }
    }

    function move(div){
        // Moves tile to next available space. 
        div.id = "pos" + space_Row + "_" + space_Column;
		var div_Column = parseInt(div.style.left) / size;
        var div_Row = parseInt(div.style.top) / size;
        div.style.top = space_Row * size + "px";
        div.style.left = space_Column * size + "px";
        space_Row = div_Row;
        space_Column = div_Column;
        // Play sound effect for tile on move.
        playSound("sound/tile_move.mp3");
    }

    function check_move(div){
        // Determines if tile is able to be moved (empty space)
        var div_Row1 = parseInt(div.style.top) / size;
        var div_Column1 = parseInt(div.style.left) / size;
        if (space_Row == div_Row1){
            return Math.abs(space_Column - div_Column1) == 1;
        } 
		else if (space_Column == div_Column1){
            return Math.abs(space_Row - div_Row1) == 1;
        } 
		else {
            return false;
        }
    }

    function check_WinState(){
        // Determines if current state is the win state. 
        var tiles = document.querySelectorAll(".tiles");
        for (var i = 0; i < tiles.length; i++){
            var row = Math.floor(i / temp);
            var column = i % temp;
            if (tiles[i].id != "pos" + row + "_" + column){
                //console.log(tiles[i].id);
                return false;
            }
        }
        return true;
    }
})();