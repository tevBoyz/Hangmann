var wordToFind = "";
var correctLetters = [];
var wrongLetters = [];

var figure = document.getElementsByClassName('figure-part');
var disp = document.getElementById("display");
var wletter = document.getElementById("wrong-letters");
var boxes = 0;
var difficulty = 5;
var lettersInBoxes = Array(difficulty);
var gameOn = true;

fetchWord(difficulty);//console.log(wordToFind);

function startGame(){
    gameOn = true;
    wordToFind = wordToFind.toUpperCase();
    if(wordToFind.length != 0){
        populateBox(difficulty);
        boxes = document.getElementsByClassName('box');
    }
}

function buildBody(index){
    figure[index].style.display="block";
}

function resetBody(){
    for(let i = 0; i < figure.length; i++){
        figure[i].style.display="none";
    }
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
		if(e.key.length == 1 && gameOn){
            if ((e.key >= "A" && e.key <= 'Z') || (e.key >= 'a' && e.key <= 'z')){
                const letter = e.key.toUpperCase();
    
                if (wordToFind.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        correctLetters.push(letter);
    
                        displayWord(letter);
                    } else {
                        showNoti("You've tried this letter, please choose a different one.")
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        wrongLetters.push(letter);
    
                        updateWrongLettersEl();
                    } else {
                        showNoti("You've tried this letter, please choose a different one.")
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
    //setTimeout(checkWin, 2000);
    checkWin();
}

function checkWin(){
    let x = lettersInBoxes.join('');
    if(x == wordToFind){
        showNoti("Congratulations! You found the word! Play again?");
        //restart();
    }
}

function updateWrongLettersEl(){
    if(wrongLetters.length < figure.length) {
        wletter.innerHTML = "Wrong letters: " + wrongLetters.toString();
        buildBody(wrongLetters.length-1);
    }
    else{
        wletter.innerHTML = "Wrong letters: " + wrongLetters.toString();
        buildBody(wrongLetters.length-1);
        setTimeout(notify, 1000);
    }
}

function notify(){
    showNoti('You lost, The word was: ' + wordToFind);
    gameOn = false;
    //restart();
}

function changeDiff(diff){
    difficulty = diff;
    restart();
}

function restart(){
    document.getElementById("noti").style.display = "none";
    wordToFind = "";
    correctLetters = [];
    wrongLetters = [];

    boxes = 0;
    lettersInBoxes = Array(difficulty);
    wletter.innerHTML = "";
    resetBody();
    resetKeys();
    fetchWord(difficulty);
}

function closeNoti(){
    document.getElementById("noti").style.display = "none";

}

function showNoti(message){
    document.getElementById("noti").style.display = "flex";
    document.getElementById("message").innerHTML = message;
}


function info(){
    document.getElementById("info").style.display = "flex";
}

function closeInfo(){
    document.getElementById("info").style.display = "none";

}

// Keyboard section

document.addEventListener('keydown', function(event) {
    const pressedKey = event.key.toUpperCase();
    const keyElement = document.querySelector(`.key[data-key="${pressedKey.charCodeAt(0)}"]`);
    
    if (keyElement) {
      keyElement.classList.add('active');
    }
  });
  
  document.addEventListener('keyup', function(event) {
    const pressedKey = event.key.toUpperCase();
    const keyElement = document.querySelector(`.key[data-key="${pressedKey.charCodeAt(0)}"]`);
    
    if (keyElement) {
      keyElement.classList.remove('active');
    }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const keys = document.getElementsByClassName('key');
    
    for (let i = 0; i < keys.length; i++) {
        const keyCode = parseInt(keys[i].getAttribute('data-key'));
        //console.log(keyCode);
        keys[i].addEventListener('click', function() {
            simulateKeyPress(keyCode);
          });
    }
    
  });
  
  function simulateKeyPress(keyCode) {
    if(gameOn){
        const event = new KeyboardEvent('keydown', {
            key: String.fromCharCode(keyCode),      
          });
          
          document.dispatchEvent(event);
    }
  }

  function resetKeys(){
    let keys = document.getElementsByClassName('key');
    for(let i = 0; i<keys.length; i++){
        keys[i].classList.remove('active');
    }
  }