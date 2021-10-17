import {createClassicDeck} from './rpsClassic.js';
import {createWarDeck} from './rpsWar.js';
// import {createMemoryDeck, handleMemoryFAIcon} from './rpsMemory.js';

import instructions from './gameInstructions.js';

const infoContainer = document.getElementById('info-container');
const gameInstructions = document.getElementById('game-instructions');
const instructionsIcon = document.getElementById('instructions');

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
        createClassicDeck(deckSize, true);
        handleInfoIcon()
        break;
      case 'war':
        console.log('You chose "War"');
        createWarDeck(deckSize, true);
        handleInfoIcon()
        break;
      case 'memory':
        console.log('You chose "Memory"');
        break;
    }
  });
}

// Click Handler for information button:
// (Switch between info icon and gamepad)
function handleInfoIcon() {
  if(!instructionsIcon.classList.contains('visible')) {
    instructionsIcon.classList.add('visible');
  }

  if(!infoContainer.classList.contains('visible')) {
    infoContainer.classList.add('visible');
    instructionsIcon.innerHTML = `<i class="fas fa-gamepad"></i>`;
  } else {
    infoContainer.classList.remove('visible');
    instructionsIcon.innerHTML = `<i class="fas fa-info-circle"></i>`;
  }
}

// Event Listener for instruction Icon:
instructionsIcon.addEventListener('click', () => {
  handleInfoIcon();
});

// Show info screen upon game start:
infoMessage();
