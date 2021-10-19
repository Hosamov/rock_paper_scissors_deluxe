// Game Mode: Classic

import devices from './cardData.js';

// Target global DOM Elements:
const playArea = document.getElementById('play-area');
const instructions = document.getElementById('instructions');
const playerTie = document.getElementById('player-tie');
const aiTie = document.getElementById('ai-tie');
const tiePot = document.getElementById('tie-pot');
const tiePotText = document.querySelector('.tie-pot-centered');
const infoContainer = document.getElementById('info-container');
const contentWrap = document.getElementById('content-wrap');
const hand = document.querySelector('.hand');
const aiHand = document.querySelector('.ai-hand');

//Declare global variables needed:
let gameStart = false;
let gameInPlay = true;
let deckSize = 18; // initial value (18, 36, 54)
let newDeck = []; //init newDeck to hold all card values before dealing
let playerDecks = [ [],[] ];
let [p1, p2] = playerDecks; // p1 = human player, p2 = ai player
let tieArr = []; // Array to keep track of tied cards
let currentCard = 0; // index of current card in player's deck
let playerCardRock = [];
let playerCardPaper, playerCardScissors;
let chosenCard;
let canClick = true; // Set ability of user to select a card

/*
* Function to display the main game menu/information div
*/
function infoMessage() {
  console.log('Toggling infoContainer visibility from rpsClassic.js');
  infoContainer.classList.remove('visible');
}

/*
* Function to create a new deck with 18, 36, or 54 cards
* @param  {Number} num  Iterator value (9, 12, 18)
*/
export function createClassicDeck(num, gameReset) {
  if(gameReset) {
    // Reset the global vars for a new game iteration:
    newDeck = [];
    playerDecks = [[],[]];
    [p1, p2] = playerDecks;
    tieArr = [];
    currentCard = 0;
    tiePot.classList.remove('active');
  }

  // Reset styling for play area:
  if(playArea.classList.contains('war')) playArea.classList.remove('war');

  const splitNum = (num / 3);
  const classes = ['Rock', 'Paper', 'Scissors'];
  for (let i = 0; i < splitNum; i++) {
    newDeck.push(...classes);
  }
   // Shuffle deck and deal out cards
   shuffleDeck(newDeck);
   dealCards(newDeck);
}

/*
* Function to shuffle the deck
* @param {array} Holds cards to shuffle
* @source  https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
*/
function shuffleDeck(array) {
  currentCard = 0; //reset index of currentCard to 0;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

/*
* Function that evenly distributes randomized decks to each player
* @param {Array} newDeck  Array for newly shuffled deck
*/
function dealCards(newDeck) {
  for (let i = 0; i < newDeck.length; i++) {
    // Check odd/even values, push value to respective player decks
    playerDecks[i % 2].push(newDeck[i]);
  }
  displayHands();
}

/*
* Function to display a hand of the dealt cards to the player
* Displays before & while the cards are player
*/
function displayHands() {
  // Check how many of each card was dealt to the player
  playerCardRock = p1.filter(playerCard => playerCard === 'Rock');
  playerCardPaper = p1.filter(playerCard => playerCard === 'Paper');
  playerCardScissors = p1.filter(playerCard => playerCard === 'Scissors');
  // console.log(playerCardRock, playerCardPaper, playerCardScissors);

  aiHand.innerHTML = ``; // Clear ai-hand div
  hand.innerHTML = ``;   // Clear hand div

  // Dynamically insert 3 AI cards above play area:
  aiHand.insertAdjacentHTML('beforeend', `
    <div class="ai-hand-back" >
      <img src="images/card_back.png">
    </div>
    <div class="ai-hand-back" >
      <img src="images/card_back.png">
    </div>
    <div class="ai-hand-back" >
      <img src="images/card_back.png">
    </div>`
  );

  // Dynamically insert player hand below play area
  // Add appropriate class to each div based on whether remaining cards/devices
  hand.insertAdjacentHTML('beforeend', `
    <div class="player-hand player-hand-rock ${!playerCardRock.length > 0 ? "inactive" : "active"}"  >
      <img src="images/card_hand_rock.png" class="${!playerCardRock.length > 0 ? "inactive" : ""}" name="Rock">
      <div class="cards-text-centered">${playerCardRock.length}</div>
    </div>
    <div class="player-hand player-hand-paper ${!playerCardPaper.length > 0 ? "inactive" : "active"}" >
      <img src="images/card_hand_paper.png" class="${!playerCardPaper.length > 0 ? "inactive" : ""}" name="Paper">
      <div class="cards-text-centered">${playerCardPaper.length}</div>
    </div>
    <div class="player-hand player-hand-scissors ${!playerCardScissors.length > 0 ? "inactive" : "active"}" >
      <img src="images/card_hand_scissors.png" class="${!playerCardScissors.length > 0 ? "inactive" : ""}" name="Scissors">
      <div class="cards-text-centered">${playerCardScissors.length}</div>
    </div>`
  );

  const playerHand = document.querySelectorAll('.player-hand img');

  playerHand.forEach(card => {
    if(!card.classList.contains('inactive') && p2.length > 0) { //Check if the card is able to be clicked
      card.addEventListener('click', (e) => {
        const targetName = e.target.name;
        if(canClick) {
          switch(targetName) {
            case 'Rock':
              chosenCardHandler('Rock');
              break;
            case 'Paper':
              chosenCardHandler('Paper');
              break;
            case 'Scissors':
              chosenCardHandler('Scissors');
              break;
          }
        }
      });
    } else {
      console.log(`card is inactive. You can't click it...`);
    }
  });

  // Assess both player arrays to determine whether game is over:
  if(p1.length <= 0 || p2.length <= 0) {
    return endGame();
  }
}

/*
* Function to handle selecting the chosen card
* @param {String} card  Selected card (Rock, Paper, Scissors)
*/
function chosenCardHandler(card) {
    canClick = false; // Toggle canClick so player can't select a new card yet...
    chosenCard = p1.indexOf(card); // Update global variable

    if(currentCard >= (p2.length)) {
      currentCard = 0;
    }
    runGameInstance(p1[chosenCard], p2[currentCard]);
    currentCard++; // Increment AI's current card
}

/*
* Function that adds two cards (from p1 and p2's deck) to the display.
* @param {String} p1ImageFront  Card image for P1
* @param {String} p2ImageFront  Card image for P2
*/
function addUpdateCard(p1ImageFront, p2ImageFront) { //classes: ai-card, player-card
  // const cardImageBack = './images/card_back.png';
  playArea.innerHTML = ''; //Clear the play area of existing cards

  // Display back of card until cardFlipped:
  playArea.insertAdjacentHTML('beforeend', `
    <div class="ai-card">
      <img src="${p2ImageFront}">
    </div>
    <div class="player-card">
      <img src="${p1ImageFront}">
    </div>
  `);
}

/*
* Function that displays a win/lose message in center of the screen with an
* action button.
* @param  {String} message  Win/lose message
* @param  {String} btnText  Text for btnEl
*/
function addMessage(message, btnText) {
  const container = document.getElementById('container');
  container.insertAdjacentHTML('beforeend', `
    <div id="message" class="message">
      <h4>${message}</h4>
      <button id="action-button" class="btn">${btnText}</button>
    </div>
  `);

  const btnEl = document.getElementById('action-button');
  const messageEl = document.getElementById('message');

  // Note: Programmed it this way to allow for future expansion
  setTimeout(() => messageEl.classList.add('visible'), 1000);
    // Add button functionality:
    btnEl.innerText = btnText;
    btnEl.addEventListener('click', () => {
      setTimeout(() => {
        location.reload(); // Page refresh to reload
      }, 2000);
      container.lastElementChild.remove(); //remove message container from display
    });
}

/*
* Function that draws a new card in the play area for each player
* @param  {Boolean} hasWon  State of win/lose for round
*/
function playCard(hasWon) {
  setTimeout(() => {
    // Animate card styles based on P1 win/lose/tie state:
    if(hasWon === true && hasWon !== null) {
      winLoseTieHandler('win', 'lose');
    } else if(hasWon === false) {
      winLoseTieHandler('lose', 'win');
    } else {
      winLoseTieHandler('tie', 'tie');
    }
  }, 2000); // 2s

  // Clear play area, draw new cards:
  setTimeout(() => {
    if (hasWon) playArea.innerHTML = ''; // Reset the play area
    displayHands();
    canClick = true; // Toggle canClick to true so player can select a new card...
  }, 3000); // 3s
}

/*
* Function to run the actual game instance
* @param  {String} p1Card  Name of P1's current card
* @param  {String} p2Card  Name of P2's current card
*/
function runGameInstance(p1Card, p2Card) {
  displayHands(); // Update player hand

  // Add starting cards
  addUpdateCard(cardImageHandler(p1Card), cardImageHandler(p2Card));
  const playerCard = document.querySelector('.player-card img');

  // Perform game logic:
  // Loop through devices array to check cards against each other:
  devices.forEach(device => {
    if (p1Card === device.device) {
      if (p2Card === device.win) {
        deviceUpdateHandler(true, 'win', 'lose', p1);
        gameUpdateHandler(p1, p2, device.device, device.win);
      } else if (p2Card === device.lose) {
        deviceUpdateHandler(false, 'lose', 'win', p2);
        gameUpdateHandler(p2, p1, device.device); // Note: P2 takes only 3 args (as opposed to 4 for P1)
      } else { // Tie round: Begin War...
        playCard(); // Arg: NULL
        tieArr.push(p1Card, p2Card); // Place tied cards into their own array

        // Shuffle both P1 & P2 decks to add randomness after > 4 cards in tie pot
        if (tieArr.length > 4) {
          shuffleDeck(p2);
        }
        // Remove both P1 & P2's tied cards from their hands temporarily:
        let p1CardIndex = p1.indexOf(p1Card);
        p1.splice(p1CardIndex, 1); // Remove player's card at its index
        p2.shift(0); // Remove first card from AI's array

        // Display the tie pot:
        setTimeout(() => {
          tiePot.classList.add('active');
          tiePotText.innerText = tieArr.length;
        }, 2000); // Wait 2s
      }
    }
  });
}

/*
* Function to test and return end game state
*/
function endGame() {
  // First, check if the tie pot exists:
  if(tiePot.classList.contains('active')) {
    // Give player with the most cards the tie pot
    if(p1 > p2) {
      tieResult('win', 'lose'), // P1 wins
      tieWinHandler(p1)
    } else if (p1 < p2) {
      tieResult('lose', 'win'), // P2 wins
      tieWinHandler(p2)
    } else {
      tieResult(); // Tie game (no player gets the pot)
    }
  }

  setTimeout(() => {
    playArea.innerHTML = '';
    if(p1.length === 0 && p2.length > 0) {
      return addMessage('Game over. Better luck next time.', 'Play Again', 'shuffle');
    } else if (p1.length > 0 && p2.length === 0) {
      return addMessage('Congratulations...You win!', 'Play Again', 'shuffle');
    } else {
      return addMessage('Tie game.', 'Play Again', 'shuffle');
    }
  }, 2000); // 2s
}

////HELPER FUNCTIONS////

/*
* Helper function that takes two player arrays and two card values, then
* adds/removes to/from correct hand:
*/
function gameUpdateHandler(arr1, arr2, card, losingCard) {
  // Push card to win arr, splice card from lose arr
  let cardIndex = arr2.indexOf(card);
  console.log(card, cardIndex); // Log out what card won and what index it's in

  return (!losingCard) ? (
    arr1.push(card),
    arr2.splice(cardIndex, 1) // Replace one index at index of cardIndex
  ) : (
    arr1.push(losingCard),
    arr2.splice(cardIndex, 1)
  );
}

// Function to animate Win/Lose/Tie state:
function winLoseTieHandler(p1State, p2State) {
  const playerCard = document.querySelector('.player-card');
  const aiCard = document.querySelector('.ai-card');
  playerCard.classList.add(p1State);
  aiCard.classList.add(p2State);
}

// Helper function to call main functions from within runGameInstance():
function deviceUpdateHandler(bool, res1, res2, tieWinner) {
  playCard(bool);
  tieResult(res1, res2);
  tieWinHandler(tieWinner);
}

// Helper function to distribute cards to the winning player
function tieWinHandler(playerArr) {
  if (tieArr.length) {
    playerArr.push(...tieArr);
    tieArr = []; //empty global array
  }
}

// Function to append correct classnames then clear the tie area after tie break:
function tieResult(class1, class2) {
  playerTie.classList.add(class1);
  aiTie.classList.add(class2);
  setTimeout(() => clearTiePot(), 2000);
}

// Helper function to reset tie pot DOM elements after tie has been won:
function clearTiePot() {
  winTiePotAnimation();
  setTimeout(() => {
    tiePot.classList.remove('active', 'win', 'lose');
    playerTie.classList.remove('win', 'lose');
    aiTie.classList.remove('win', 'lose');
    tiePotText.innerText = '';
  }, 2000);
}

// Helper function to animate tie pot win/lose status
function winTiePotAnimation() {
  // Card animations for win/lose:
  if(playerTie.classList.contains('win')) {
    tiePot.classList.add('win');
    tiePot.classList.remove('lose');
  } else if (playerTie.classList.contains('lose')) {
    tiePot.classList.add('lose');
    tiePot.classList.remove('win');
  } else {
    tiePot.classList.remove('win', 'lose');
  }
}

/*
 * Helper function to get and return the corresponding device image randomly
 * from list of assets
 * Note: There are 3 (three) total images to display per device (see cardData.js)
 */
function cardImageHandler(card) {
  for (let device of devices) {
    const randomImage = Math.floor(Math.random() * device.assets.length);
    if (card === device.device) {
      return device.assets[randomImage];
    }
  }
}
