let solution = ['f#','f#','f#','c','f#','b','f#','f#'];
let guesses = [];
let input = [];
let currentRow;
let currentTile;

let imgPathMap = new Map([
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



$(function(){
    //document ready processes - write this so only the guess list needs to be stored as a cookie
    let rowIndex = guesses.length;
    currentRow =$( $('#tiles').children()[rowIndex] ); 
});

function addNote(note){
    if(input.length < 6){
        input.push(note);

        //fetch the note imge path from the map & append a .note image
        let imgPath = imgPathMap.get(note);
        currentTile = $( currentRow.children()[input.length - 1] );
        currentTile.append('<img class="note" src="' + imgPath +'">');
    }
    console.log(input);
}

function del(){
    input.pop();

    currentTile.empty();
    currentTile = $( currentRow.children()[input.length - 1] );

    console.log(input);
}

function go(){
    //save the user's guess
    guesses.push(input);

    //check each letter
    let correct = true;
    for(i = 0; i < 6; i++){
        checkedTile = $( currentRow.children()[i] );
        //tile coloring
        if(input[i] == solution[i]){
            checkedTile.addClass('correct');
        }
        else if(solution.includes(input[i])){
            checkedTile.addClass('almost');
            correct = false;
        }
        else{
            checkedTile.addClass('wrong');
            correct = false;
        }
    }
    input = [];
    if(correct){
        console.log('hurray!');
    }
    else{
        currentRow = currentRow.next();
        console.log('oh no.');
    }
}


