//a script to generate lots of random melodies

const fs = require('fs')

const notes = ['a','a#','b','c','c#','d','d#','e','f','f#','g','g#']
genSequences(800,6,'./seqlist.txt');

//generates lots of random melodies and writes them to a file
function genSequences(n, l, dest){
    seqlist = [];
    for(i = 0; i < n; i++){
        //choose a root note at random and get the notes in its major
        root = randomNote(notes)
        key = keyNotes(root);

        let seq = [];
        for(bi = 0; bi < l; bi++){
            seq.push(randomNote(key));
        }
        seqlist.push(seq);
    }
    write(dest, JSON.stringify(seqlist));
}

//return a random note from 'notes'
function randomNote(selection){
    let index  = Math.floor(Math.random() * (selection.length))
    return selection[index];
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

function write(path, content){
    fs.writeFile(path, content, err => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Sequences written to ' + path);
      })
}