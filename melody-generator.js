const notes = ['a','a#','b','c','c#','d','d#','e','f','f#','g','g#']
genSequences(10, null);

//generates lots of random melodies and writes them to a file
function genSequences(n, dest){
    for(i = 0; i < n; i++){
        key = keyNotes(randomNote());
        console.log(key);
    }
}

//return a random note from 'notes'
function randomNote(){
    let index  = Math.floor(Math.random() * (notes.length))
    return notes[index];
}

//return the notes in a given major
function keyNotes(key){
    let intervals = [2,2,1,2,2,2,1]
    let scaleNotes = [];

    let noteIndex = notes.indexOf(key);
    //iterate through the notes scale-wise
    intervals.forEach(function(interval){
        scaleNotes.push(notes[noteIndex]);
        noteIndex += interval;
        noteIndex = noteIndex % notes.length;
    });

    return scaleNotes;
}