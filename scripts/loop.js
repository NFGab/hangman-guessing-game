import { quotes } from "./quotes.js";

const viewElem = document.querySelector('.js-encr-view');
const guessElem = document.querySelector('.js-ans-input');


function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1) + min);
}

function isGuessable(char){
  return /[a-zA-Z0-9]/.test(char);
}

let quoteIndex;
let currentQuote;
let revealed;
let guessedCharsW = [];
let guessedCharsC = [];


function generateObsQuote(){
  quoteIndex = getRandomInt(0, quotes.length - 1);
  currentQuote = quotes[quoteIndex];

  revealed = currentQuote.split('').map(char => !isGuessable(char));
  guessElem.value = '';
  renderQuote();
  guessedCharsW = [];
  guessedCharsC = [];
  
}

function renderQuote(){
  viewElem.innerHTML = currentQuote
  .split('')
  .map((char, i) => revealed[i] ? char : '█')
  .join('');
}

function isRepeated(chara){
  const guessArr = [...guessedCharsC,...guessedCharsW];
  for(let i = 0; i < guessArr.length; i++){
    if(chara.toLowerCase() === guessArr[i].toLowerCase() ){
      console.log("Already guessed with this character! "+chara);
      return true;
    }
  }
  return false;
}

function victoryCon(){
  const vic = revealed.includes(false);
  if(!vic){
    console.clear();
    console.log("TEMP: You win!");
    generateObsQuote();
    console.log(vic);
  }
}

function guessFunc(){
  const raw = guessElem.value;
  guessElem.value = '';
  if(!raw) return;

  const chara = raw[0];

  if(isRepeated(chara)){
    return;
  }

  let matchFound = false;
  for(let i = 0; i < currentQuote.length; i++){
    if(isGuessable(currentQuote[i]) && currentQuote[i].toLowerCase() === chara.toLowerCase()){
      revealed[i] = true;
      matchFound = true;
    }
  }

  
  if(matchFound){
    guessedCharsC.push(chara);
    console.log(guessedCharsC);
  } else {
    guessedCharsW.push(chara);
    console.log(guessedCharsW);
  }

  renderQuote();
  victoryCon();

}

guessElem.addEventListener("keydown",function(event){
  if(event.key === "Enter"){
    guessFunc();
  }
});

generateObsQuote();
