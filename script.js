var wordToFind = "";
var correctLetters = [];
var wrongLetters = [];

var figure = document.getElementsByClassName('figure-part');
var disp = document.getElementById("display");
var wletter = document.getElementById("wrong-letters");
var boxes = 0;
var difficulty = 5;
var lettersInBoxes = Array(difficulty);


fetchWord(difficulty);//console.log(wordToFind);

function startGame(){
    wordToFind = wordToFind.toUpperCase();
    console.log("word: ", wordToFind);
    if(wordToFind.length != 0){
        populateBox(difficulty);
        boxes = document.getElementsByClassName('box');
    }
}

function buildBody(index){
    figure[index].style.display="block";
}

function populateBox(num){
    disp.innerHTML = '';
    var ele = 0;
    while(num > 0){
        ele = document.createElement("div");
    ele.classList.add('box');
        disp.appendChild(ele);
        num--;
    }
}

function fetchWord (difficulty){
  fetch('https://random-word-api.herokuapp.com/word?length=' + difficulty)
   .then((response) => response.json())
   .then((json) => {
    console.log(json);
    takeWord(json);
})
   .catch(error => console.error(error));
}

function takeWord(data){
    wordToFind = data[0];
    startGame();
}


// Keydown letter press
document.addEventListener('keydown', e => {
		if(e.key.length == 1){
            if ((e.key >= "A" && e.key <= 'Z') || (e.key >= 'a' && e.key <= 'z')){
                const letter = e.key.toUpperCase();
                console.log(e.key);
    
                if (wordToFind.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        correctLetters.push(letter);
    
                        displayWord(letter);
                    } else {
                        alert("You've guessed this letter, please try again.")
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        wrongLetters.push(letter);
    
                        updateWrongLettersEl();
                    } else {
                        alert("You've guessed this letter, please try again.")
                    }
                }
            }
        
        }
});


function displayWord(letter) {
	for(let i = 0; i < wordToFind.length; i++){
        if (wordToFind[i] == letter){
            boxes[i].innerHTML = "<span> "+letter+" </span>";
            lettersInBoxes[i] = letter;
        }
    }
    let x = lettersInBoxes.join('');
    if(x === wordToFind){
        alert("Congratulations! You found the word! Play again?");
        fetchWord(difficulty);
    }
}

function updateWrongLettersEl(){
    if(wrongLetters.length < figure.length) {
        wletter.innerHTML = "Wrong letters: " + wrongLetters.toString();
        buildBody(wrongLetters.length-1);
    }
    else{
        alert('You lost, The word was: ' + wordToFind);
        window.location.reload() ;
    }
}

function changeDiff(diff){
    console.log(diff);
    difficulty = diff;
    fetchWord(difficulty);
}