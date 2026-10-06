const quotes = [
  "The oldest and strongest emotion of mankind is fear.",
  "That which is not dead can eternal lie.",
  "There are more things in heaven and earth, Horatio.",
  "Listen to them—the children of the night.",
  "The blood is the life!",
  "I am the ghost of the future.",
  "It was a dark and stormy night.",
  "The night was dark and full of terrors.",
  "All that we see or seem is but a dream within a dream.",
  "Deep into that darkness peering.",
  "Once upon a midnight dreary.",
  "And my soul from out that shadow.",
  "Quoth the Raven, Nevermore.",
  "There is no beauty without some strangeness.",
  "The boundaries which divide Life from Death are shadowy and vague.",
  "I became insane, with long intervals of horrible sanity.",
  "A hideous darkness crept over me.",
  "The dead travel fast.",
  "We are all fools when we dare not to be.",
  "I must not think of such things.",
  "Something wicked this way comes.",
  "By the pricking of my thumbs.",
  "Double, double toil and trouble.",
  "Fair is foul, and foul is fair.",
  "Hell is empty and all the devils are here.",
  "The night is darkening round me.",
  "The darkness of the grave.",
  "There are horrors beyond life's edge.",
  "I saw the pale student of unhallowed arts.",
  "The creature was a horrible monster.",
  "The rain pattered against the window.",
  "I opened the door and looked out.",
  "The silence was oppressive.",
  "A cold shiver ran through me.",
  "I felt a strange and terrible dread.",
  "The house was silent as the grave.",
  "The shadows seemed to move.",
  "A terrible fear seized me.",
  "I heard a strange sound.",
  "The candle flickered in the darkness.",
  "The room was filled with an awful silence.",
  "Something was watching me.",
  "The moon shone upon the dead.",
  "A chill ran through my blood.",
  "I could hear the beating of my heart.",
  "The darkness seemed alive.",
  "I knew that something was terribly wrong.",
  "The corpse opened its eyes.",
  "The door creaked slowly open.",
  "I dared not look behind me.",
  "The thing in the shadows moved."
];

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
}

guessElem.addEventListener("keydown",function(event){
  if(event.key === "Enter"){
    guessFunc();
  }
});

generateObsQuote();
