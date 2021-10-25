// Game Mode: Memory

// Target global DOM elements:
const playArea = document.getElementById('playArea');
const instructions = document.getElementById('instructions');
const infoContainer = document.getElementById('info-container');
const contentWrap = document.getElementById('content-wrap');

// Global variables:
let newDeck = []; //init newDeck to hold all card values before dealing
let canClick = true; // Set ability of user to select a card
let deckSize = 9; // Initial value (9, 12, 15)
let playerDecks = [ [], [] ];
let [p1, p2] = playerDecks; // p1 = human player, p2 = ai player

/*
* Function to create a new deck with 18, 36, or 54 cards
* @param  {Number} num  Iterator value (9, 12, 18)
*/
export function createMemoryDeck(num, gameReset) {
  console.log('working ' + num + ' ' + gameReset);
  if(gameReset) {
    // Reset the global vars for a new game iteration:
    newDeck = [];
    playerDecks = [[],[]];
    [p1, p2] = playerDecks;
  }

  playArea.classList.add('memory'); // Add memory class to play area for styling

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
}
