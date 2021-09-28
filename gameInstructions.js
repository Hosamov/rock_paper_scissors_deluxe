const instructions = [
  {
    mode: 'classic',
    instruction: `
      <hr>
      <h3>Rock Paper Scissors: Classic</h3>
        <p>
          This mode presents the most classic approach to the original Rock Paper
          Scissors, but uses cards.
        </p>

      <h4>How to Play</h4>
        <p>1. To start the game, choose the deck size (18, 36, or 54) and
          deal shuffled deck by clicking the <strong>Start Game</strong>
          button.
        </p>
        <p>Two cards will be added to the play area, face down.</p>
        <p>
          2. Player must click/tap their own card (bottom card) to flip
          the cards over and see the results.
        </p>
        <p>
          3. The player with the winning card takes both cards (both
          cards will be automatically given to the winner of the round)
        </p>
        <p>
          4. Play continues until one player holds all cards and wins the
          "war".
        </p>
      <br>
    <h4>A Note on tie rounds</h4>
      <p>
        When two drawn cards tie, the cards will be automatically added
        to the tie pot.
      </p>
      <p>The tie pot will be awarded to the next winning player.</p>
      <p>
        If a tie occurs with a player's last card, they cannot play again
        to win the tie and thus lose the "war".
      </p>
      <br>
    <h4>More Notes:</h4>
      <p>
        Once the game starts, you will see one of the following two icons
        in the top right of your display:
      </p>
      <p><i class="fas fa-info-circle"></i> - Click to go back to the info screen.</p>
      <p><i class="fas fa-gamepad"></i> - Click to return to current game.</p>
      <hr>
      <br>
      <p>
        Designed by: Matt Coale (<a href="https://backyarddev.io" target="_blank">https://backyarddev.io</a>)
        and Sally Coale (<a href="https://www.sallyscraftstudio.com" target="_blank">https://www.sallyscraftstudio.com</a>).
      </p>
      <br>`
  },
  {
    mode: 'war',
    instruction: `
      <hr>
      <h3>Rock Paper Scissors: War</h3>
        <p>
          This game of chance is a mashup of Rock Paper Scissors, and the
          card game War.
        </p>

      <h4>How to Play</h4>
        <p>1. To start the game, choose the deck size (18, 36, or 54) and
          deal shuffled deck by clicking the <strong>Start Game</strong>
          button.
        </p>
        <p>Two cards will be added to the play area, face down.</p>
        <p>
          2. Player must click/tap their own card (bottom card) to flip
          the cards over and see the results.
        </p>
        <p>
          3. The player with the winning card takes both cards (both
          cards will be automatically given to the winner of the round)
        </p>
        <p>
          4. Play continues until one player holds all cards and wins the
          "war".
        </p>
      <br>
    <h4>A Note on tie rounds</h4>
      <p>
        When two drawn cards tie, the cards will be automatically added
        to the tie pot.
      </p>
      <p>The tie pot will be awarded to the next winning player.</p>
      <p>
        If a tie occurs with a player's last card, they cannot play again
        to win the tie and thus lose the "war".
      </p>
      <br>
    <h4>More Notes:</h4>
      <p>
        Once the game starts, you will see one of the following two icons
        in the top right of your display:
      </p>
      <p><i class="fas fa-info-circle"></i> - Click to go back to the info screen.</p>
      <p><i class="fas fa-gamepad"></i> - Click to return to current game.</p>
      <hr>
      <br>
      <p>
        Designed by: Matt Coale (<a href="https://backyarddev.io" target="_blank">https://backyarddev.io</a>)
        and Sally Coale (<a href="https://www.sallyscraftstudio.com" target="_blank">https://www.sallyscraftstudio.com</a>).
      </p>
      <br>`
  },
  {
    mode: 'memory',
    instruction: `
      <hr>
      <h3>Rock Paper Scissors: Memory</h3>
        <p>
          This game of chance is a mashup of Rock Paper Scissors, and the
          card game War.
        </p>

      <h4>How to Play</h4>
        <p>1. To start the game, choose the deck size (18, 36, or 54) and
          deal shuffled deck by clicking the <strong>Start Game</strong>
          button.
        </p>
        <p>Two cards will be added to the play area, face down.</p>
        <p>
          2. Player must click/tap their own card (bottom card) to flip
          the cards over and see the results.
        </p>
        <p>
          3. The player with the winning card takes both cards (both
          cards will be automatically given to the winner of the round)
        </p>
        <p>
          4. Play continues until one player holds all cards and wins the
          "war".
        </p>
      <br>
    <h4>A Note on tie rounds</h4>
      <p>
        When two drawn cards tie, the cards will be automatically added
        to the tie pot.
      </p>
      <p>The tie pot will be awarded to the next winning player.</p>
      <p>
        If a tie occurs with a player's last card, they cannot play again
        to win the tie and thus lose the "war".
      </p>
      <br>
    <h4>More Notes:</h4>
      <p>
        Once the game starts, you will see one of the following two icons
        in the top right of your display:
      </p>
      <p><i class="fas fa-info-circle"></i> - Click to go back to the info screen.</p>
      <p><i class="fas fa-gamepad"></i> - Click to return to current game.</p>
      <hr>
      <br>
      <p>
        Designed by: Matt Coale (<a href="https://backyarddev.io" target="_blank">https://backyarddev.io</a>)
        and Sally Coale (<a href="https://www.sallyscraftstudio.com" target="_blank">https://www.sallyscraftstudio.com</a>).
      </p>
      <br>`
  }
];

export default instructions;
