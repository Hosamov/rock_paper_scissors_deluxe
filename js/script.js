import {createClassicDeck} from './rpsClassic.js';
import {createWarDeck, handleWarFAIcon} from './rpsWar.js';
// import {createMemoryDeck, handleMemoryFAIcon} from './rpsMemory.js';

import instructions from './gameInstructions.js';

const infoContainer = document.getElementById('info-container');
const gameInstructions = document.getElementById('game-instructions');
const instructionsIcon = document.getElementById('instructions');
let gameStart = true;
let showMenu = true;

instructionsIcon.classList = '';

/*
* Main function to display the main game menu/information div
*/
function infoMessage() {
  const deckCount = document.querySelector('.deck-count');
  const btnGameMode = document.querySelectorAll('.btn-game-mode');
  const btnDeck = document.querySelectorAll('.btn-deck');
  const btnShuffleDeck = document.querySelector('.btn-shuffle-deck');
  let gameMode = 'classic';
  let deckSize = 18;

  //Display Classic instructions by default:
  gameInstructions.innerHTML = instructions[0].instruction;

  // infoContainer.classList.remove('visible');

  // Iterate through  game mode buttons, change card value and add active class to selected button
  btnGameMode.forEach(btn => {
    btn.addEventListener('click', (e) => {
      console.log(e.target);
      // Iterate through btnDeck, remove active class for appending to new btn
      for(let i = 0; i < btnDeck.length; i++) btnGameMode[i].classList.remove('active');

      gameMode = e.target.value;
      // Change game instructions based on game mode/type:
      instructions.forEach(inst => {
        if (inst.mode === gameMode) {
          gameInstructions.innerHTML = inst.instruction;
        }
      })
      btn.classList.add('active');
    });
  });

  // Iterate through card size buttons, change card value and add active class to selected button
  btnDeck.forEach(btn => {
    btn.addEventListener('click', (e) => {
      console.log(e.target);
      // Iterate through btnDeck, remove active class for appending to new btn
      for(let i = 0; i < btnDeck.length; i++) btnDeck[i].classList.remove('active');

      deckSize = e.target.value;
      deckCount.innerText = `${deckSize} cards`; // Display deck size to user
      btn.classList.add('active');
    });
  });

  // Click handler for the Start Game button:
  btnShuffleDeck.addEventListener('click', (e) => {
    switch (gameMode) {
      case 'classic':
        console.log('You chose "Classic game mode"');
        gameStart = false;
        createClassicDeck(deckSize, true);
        infoContainer.classList.remove('visible');
        // handleClassicFAIcon();
        instructionsIcon.classList.add('visible');
        break;
      case 'war':
        console.log('You chose "War"');
        gameStart = false;
        createWarDeck(deckSize, true);
        handleWarFAIcon();
        break;
      case 'memory':
        console.log('You chose "Memory"');
        break;
    }
  });
}

// Function to change information icon based on visible state of info window
// export function handleFAIcon() {
//   console.log('handleFAIcon');
//   // If the game is just starting, dont' display an icon:
//   // if(gameStart === true) {
//     // instructions.innerHTML = ``;
//   //   infoMessage(); // Do display info by default
//   // } else {
//     // Otherwise, display the applicable information or gamepad FontAwesome icon:
//     // if(infoContainer.classList.contains('visible')) {
//       instructions.innerHTML = `<i class="fas fa-gamepad"></i>`;
//     // } else {
//     //   instructions.innerHTML = `<i class="fas fa-info-circle"></i>`;
//     // }
//   // }
//   // infoContainer.classList.toggle('visible');
//   infoMessage();
// }

 // Click handler for information button:
instructionsIcon.addEventListener('click', () => {
  if(instructionsIcon.classList.contains('visible')) {
    showMenu ? instructionsIcon.innerHTML = `<i class="fas fa-gamepad"></i>` :
                instructionsIcon.innerHTML = `<i class="fas fa-info-circle"></i>`;
    if(!infoContainer.classList.contains('visible')) {
      infoContainer.classList.add('visible');
    } else {
      infoContainer.classList.remove('visible');
    }
  } else {
    console.log('I am not visible.');
  }
});

// Show info screen upon game start:
infoMessage();
