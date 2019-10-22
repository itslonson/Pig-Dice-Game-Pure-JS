/*
 Правила:

- Игра расчитана на двух игроков и играется раундами.
- Каждый ход, игрок может бросить кубик столько раз, сколько он захочет, каждый бросок засчитывается в текущий счет раунда.
- Однако, если игроку выпадает "1", то он теряет все свои очки в бросе и наступает очередь другого игрока бросать кубик.
- Игрок может выбрать опцию "Держать", которая заканчивает его ход, сохраняя и добавляя его текущий счет к общему счету очков игрока, после этого наступает ход другого игрока
- Игрок, первым набравший 100 очков в общем счете, выигрывает игру

Улучшения:

-Добавить указание границы общих очков
*/

let score, roundScore, activePlayer;

let state = {
  gamePlaying: true
};

initGame();

document.querySelector(".btn-roll").addEventListener("click", () => {
  if (state.gamePlaying) {
    // Сгенерировать число
    let dice = Math.floor(Math.random() * 6) + 1;

    // Отобразить результат
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `public/images/dice-${dice}.png`;

    // Обновить счет, если на костях > 1
    dice !== 1
      ? ((roundScore += dice),
        (document.getElementById(
          `current-${activePlayer}`
        ).textContent = roundScore))
      : nextPlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (state.gamePlaying) {
    // Добавить текущий счет к общему
    scores[activePlayer] += roundScore;

    // Обновить UI
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    let finalScore = document.querySelector(".final-score").value;
    let winningScore;

    if (finalScore && finalScore >= 1) {
      winningScore = finalScore;
    } else {
      winningScore = 100;
    }

    // Проверить, выйграл ли игрок
    scores[activePlayer] >= winningScore
      ? ((document.querySelector(`#name-${activePlayer}`).textContent =
          "Выйграл!"),
        (document.querySelector(".dice").style.display = "none"),
        document
          .querySelector(`.player-${activePlayer}-panel`)
          .classList.add("winner"),
        document
          .querySelector(`.player-${activePlayer}-panel`)
          .classList.remove("active"),
        (state.gamePlaying = false))
      : nextPlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", initGame);

// Функция инициализации игры
function initGame() {
  scores = [0, 0]; // массив счета обоих игроков
  roundScore = 0; // счет раунда
  activePlayer = 0; // очередь игрока; 0 - первый игрок, 1-второй игрок
  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "-";
  document.getElementById("score-1").textContent = "-";
  document.getElementById("current-0").textContent = "-";
  document.getElementById("current-1").textContent = "-";
  document.getElementById(`name-0`).textContent = "Игрок 1";
  document.getElementById(`name-1`).textContent = "Игрок 2";
  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  document.querySelector(`.player-0-panel`).classList.remove("active");
  document.querySelector(`.player-1-panel`).classList.remove("active");
  document.querySelector(`.player-0-panel`).classList.add("active");

  state.gamePlaying = true;
}

// Функция переключения игрока
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0),
    (roundScore = 0),
    (document.getElementById(`current-0`).textContent = 0),
    (document.getElementById(`current-1`).textContent = 0),
    document.querySelector(".player-0-panel").classList.toggle("active"),
    document.querySelector(".player-1-panel").classList.toggle("active"),
    (document.querySelector(".dice").style.display = "none");
}
