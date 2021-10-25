// Game Mode: Memory

// Target global DOM elements:
const playArea = getElementById('playArea');
const instructions = getElementById('instructions');
const infoContainer = document.getElementById('info-container');
const contentWrap = document.getElementById('content-wrap');

// Global variables:
let canClick = true; // Set ability of user to select a card
let deckSize = 9; // Initial value (9, 12, 15)
let playerDecks = [ [], [] ];
let [p1, p2] = playerDecks; // p1 = human player, p2 = ai player
