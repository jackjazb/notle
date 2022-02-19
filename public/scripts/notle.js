var solution = ['f#','f#','f#','f#','f#','f#','f#','f#'];
var input = [];
$(function(){

});

function addNote(note){
    if(input.length <6 ){
        input.push(note);
    }
    console.log(input);
}

function go(){
    var correct = true;
    for(i = 0; i < 6; i++){
        if(input[i] != solution[i]){
            correct = false;
        }
    }
    if(correct){
        console.log('hurray!');
    }
    else{
        console.log('oh no.');
    }
}

function del(){
    input.pop();
    console.log(input);
}
