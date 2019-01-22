let userScore = 0;
let compScore = 0;
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("computer-score");
const result_div = document.querySelector(".result");
const choices_div = document.querySelector(".choices");
const choice_div = document.querySelector(".choice");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const action_div = document.getElementById("action-message");
const playAgain_btn = document.getElementById("play-btn");

const generateCompChoice = () => {
  const choices = ['r', 'p', 's'];
  const randNum = Math.floor(Math.random() * 3);
  return choices[randNum];
}

const hideChoicesDivAfterGame = () => {
  $(choices_div).hide(600);
  $(action_div).hide(600);
}

const showGameResult = () => {
  let result = '';
  userScore === 10 ? result = 'You <span class="green-color">won</span> the game!' : result = 'You <span class="red-color">lost</span> the game!';
  $(result_div).html(result);
  $(playAgain_btn).show();
}

const checkIfWon = () => {
  if (userScore === 10 || compScore === 10) hideChoicesDivAfterGame();
  if(userScore === 10) {
    setTimeout(showGameResult, 3000);
    userScore_span.setAttribute('class', 'green-color');
  }
  if(compScore === 10) {
    setTimeout(showGameResult, 3000);
    compScore_span.setAttribute('class', 'green-color');
  }
}

const win = (userChoice, computerChoice) => {
  userScore++;
  userScore_span.innerHTML = userScore;
  compScore_span.innerHTML = compScore;
  result_div.innerHTML = convertToWord(userChoice) + '<sub class="sub green-color">(user)</sub> beats ' + convertToWord(computerChoice) + '<sub class="sub red-color">(computer)</sub>. You <span class="green-color">win!</span>';
  checkIfWon();
  document.getElementById(userChoice).classList.add('green-shadow');
  setTimeout(() => document.getElementById(userChoice).classList.remove('green-shadow'), 400);
}

const lose = (userChoice, computerChoice) => {
  compScore++;
  compScore_span.innerHTML = compScore;
  userScore_span.innerHTML = userScore;
  result_div.innerHTML = convertToWord(computerChoice) + '<sub class="sub red-color">(computer)</sub> beats ' + convertToWord(userChoice) + '<sub class="sub green-color">(user)</sub>. You <span class="red-color">lost!</span>';
  checkIfWon();
  document.getElementById(userChoice).classList.add('red-shadow');
  setTimeout(() => document.getElementById(userChoice).classList.remove('red-shadow'), 400);
}

const draw = (userChoice, computerChoice) => {
  result_div.innerHTML = convertToWord(userChoice) + '<sub class="sub green-color">(user)</sub> and ' + convertToWord(computerChoice) + '<sub class="sub red-color">(computer)</sub> are equal. It\'s a <span class="yellow-color">draw!</span>';
  document.getElementById(userChoice).classList.add('yellow-shadow');
  setTimeout(() => document.getElementById(userChoice).classList.remove('yellow-shadow'), 400);
}

const convertToWord = letter => {
  if (letter === 'r') return 'Rock';
  if (letter === 'p') return 'Paper';
  if (letter === 's') return 'Scissors';
}

const game = userChoice => {
  const computerChoice = generateCompChoice();

  switch (userChoice + computerChoice) {
    case 'rr':
    case 'pp':
    case 'ss':
      draw(userChoice, computerChoice);
      break;
    case 'pr':
    case 'rs':
    case 'sp':
      win(userChoice, computerChoice);
      break;
    case 'rp':
    case 'sr':
    case 'ps':
      lose(userChoice, computerChoice); 
      break;
  }
}

const main = () => {
  rock_div.addEventListener('click', () => {
    game('r');
  });
  
  paper_div.addEventListener('click', () => {
    game('p');
  });
  
  scissors_div.addEventListener('click', () => {
    game('s');
  });

  playAgain_btn.addEventListener('click', () => {
    location.reload();
  });
}

main();



