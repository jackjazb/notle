var solution;
var guesses = [];
var playing = true;

var input = [];
var currentRow;

var noteImgMap = new Map([
   ['c', 'images/c.png'],
   ['c#', 'images/c-sharp.png'],
   ['d', 'images/d.png'],
   ['d#', 'images/d-sharp.png'],
   ['e', 'images/e.png'],
   ['f', 'images/f.png'],
   ['f#', 'images/f-sharp.png'],
   ['g', 'images/g.png'],
   ['g#', 'images/g-sharp.png'],
   ['a', 'images/a.png'],
   ['a#', 'images/a-sharp.png'],
   ['b', 'images/b.png'],
]);

var noteToneMap = new Map([
    ['c', 'C3'],
    ['c#', 'C#3'],
    ['d', 'D3'],
    ['d#', 'D#3'],
    ['e', 'E3'],
    ['f', 'F3'],
    ['f#', 'F#3'],
    ['g', 'G3'],
    ['g#', 'G#3'],
    ['a', 'A3'],
    ['a#', 'A#3'],
    ['b', 'B3'],
]);

$(function(){
    //load the sequence list and initialise the board
    fetch("./seqlist.json")
        .then(response => response.json())
        .then(json => initialise(getNotle(json)));
});

//recreates the board from loaded cookies, given a notle solution
function initialise(soln){
    //make sure cookie exists before proceeding
    if(Cookies.get('guesses') == undefined){
        Cookies.set('guesses', JSON.stringify([]));
    }
    gsCookie = Cookies.get('guesses');
    guesses = JSON.parse(gsCookie);
  
    //set today's solution
    solution = soln;

    //fetch a list of game board rows, and select the first row
    var rows = $('#tiles')[0].children
    currentRow = rows[0]; 
   
    for(ai = 0; ai < guesses.length; ai++){
        guesses[ai].forEach(function(note, i){
            //i = the current guess index
            addImage(note, currentRow, i);
        });
        //simulate play
        check(guesses[ai], currentRow);
        currentRow = $(currentRow).next()[0];
    }

    //if six guesses have already been made, finish the game
    if(guesses.length >= 6){
        finish();
    }
}

//fetches today's wordle
function getNotle(seqlist){
    //work out days since first notle
    var first = new Date(2022, 1, 15);
    var current = new Date();
    var dateDiff = current.getTime() - first.getTime();
    var notleNum = Math.floor( dateDiff / (1000 * 3600 * 24) );
    
    return seqlist[notleNum];
}

function finish(){
    playing = false;
}

//called by each key
function addNote(note){
    if(playing){
        playSequence([note]);
        if(input.length < 6){
            input.push(note);
            addImage(note, currentRow, input.length - 1);
        }  
    }
}

//adds a note image to a given tile
function addImage(note, row, index){
    //fetch the note imge path from the map & append a .note image
    var imgPath = noteImgMap.get(note);
    tile = row.children[index];
    $(tile).append('<img class="note" src="' + imgPath +'">');
}

function clearImage(row, index){
    tile = row.children[index];
    $(tile).empty();
}
function del(){
    //clear last note image
    clearImage(currentRow, input.length - 1);
    input.pop();
}

//run when the player makes a guess
function go(){
    if(input.length == 6){
        //adds the guess to today's guesses and updates cookie
        guesses.push(input);
        Cookies.set('guesses', JSON.stringify(guesses));

        if(guesses.length >= 6){
            finish();
        }
        //play back the user's input
        playSequence(input);
        if(check(input, currentRow)){
            console.log('yay!');
            playing = false;
        }
        else{
            currentRow = $(currentRow).next()[0];
            console.log('oh no.');
        }  
        
        input = [];
    }
}

//checks a sequence of notes and colours a given row
function check(notes, row){
    correct = false;
    for(i = 0; i < notes.length; i++){
        checkedTile = row.children[i];

        if(notes[i] == solution[i]){
            correct = true;
            $(checkedTile).addClass('correct');
        }
        else if(solution.includes(notes[i])){
            $(checkedTile).addClass('almost');
            correct = false;
        }
        else{
            $(checkedTile).addClass('wrong');
            correct = false;
        }
    }

    if(correct){
        return true;
    }
    else{
        return false;
    }
}

function playSequence(notes){
    //create a synth and connect it to the main output (your speakers)
    const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
    const synth = new Tone.Synth().connect(chorus);
    var now = Tone.now();

    for(i = 0; i < notes.length; i++){
        synth.triggerAttackRelease(noteToneMap.get(notes[i]), "8n", now + (0.3*i));
    }
}