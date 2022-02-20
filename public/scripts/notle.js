let solution = ['f#','f#','f#','c','f#','b','f#','f#'];
let guesses = [];

let input = [];
let currentRow;
let currentTile;

let noteImgMap = new Map([
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

let noteToneMap = new Map([
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
    //document ready processes - recreates the board from previous guesses
    gsCookie = Cookies.get('guesses');

    //make sure the cookie exists before proceeding
    if(gsCookie == undefined){
        Cookies.set('guesses', JSON.stringify([]));
        gsCookie = Cookies.get('guesses');
    }
    guesses = JSON.parse(gsCookie);
    let rows = $('#tiles')[0].children

    currentRow = rows[0]; 

    for(ai = 0; ai < guesses.length; ai++){
        guesses[ai].forEach(function(note, pos){
            addImage(note, pos);
        });
        check(guesses[ai]);
    }
    currentTile = null;

});

//note input functions
function addNote(note){
    console.log(currentRow);
    if(input.length < 6){
        input.push(note);
        addImage(note, input.length - 1);
    }   
}

//adds a note image to the current row at a given index
function addImage(note, index){
    //fetch the note imge path from the map & append a .note image
    let imgPath = noteImgMap.get(note);
    currentTile = currentRow.children[index];
    $(currentTile).append('<img class="note" src="' + imgPath +'">');
}

function del(){
    input.pop();

    //clear last note image
    $(currentTile).empty();
    currentTile = currentRow.children[input.length - 1];
}

//run when the player makes a guess
function go(){
    if(input.length == 6){
        //adds the guess to today's guesses and updates cookie
        guesses.push(input);
        Cookies.set('guesses', JSON.stringify(guesses));
        playSequence(input);
        if(check(input, currentRow)){
            console.log('yay!');
        }
        else{
            console.log('oh no.');
        }  
        input = [];
        currentTile = null;
    }
    
}

function playSequence(notes){
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();
    let now = Tone.now();

    for(i = 0; i < notes.length; i++){
        //play a middle 'C' for the duration of an 8th note
        synth.triggerAttackRelease(noteToneMap.get(notes[i]), "8n", now + (0.3*i));
    }
}

//checks a sequence of notes and colours the current row
function check(notes){
    correct = false;
    for(i = 0; i < notes.length; i++){
        checkedTile = currentRow.children[i];

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
        currentRow = $(currentRow).next()[0];
        return false;
    }
}