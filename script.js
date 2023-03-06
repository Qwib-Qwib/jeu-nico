/* Placer la première section du code dans sa propre fonction afin de rendre les variables innaccessibles. */
let lastNameFormField = document.getElementById("last-name");
let firstNameFormField = document.getElementById("first-name");
let confirmationButton = document.getElementById("confirmation-button");
let instructions = document.getElementById("instructions");
let p1LastName;
let p1FirstName;
let p2LastName;
let p2FirstName;
confirmationButton.addEventListener("click", displayPlayer2Form);
lastNameFormField.addEventListener("input", processLastName);
firstNameFormField.addEventListener("input", processFirstName);

function processLastName(e) {
  storeLastName(e);
  toggleConfirmationButton();
}

function storeLastName(e) {
  if (instructions.classList == 'P1') {
    p1LastName = e.target.value.trim();
  } else if (instructions.classList == 'P2') {
    p2LastName = e.target.value.trim();
  }
}

function processFirstName(e) {
  storeFirstName(e);
  toggleConfirmationButton();
}

function storeFirstName(e) {
  if (instructions.classList == 'P1') {
    p1FirstName = e.target.value.trim();
  } else if (instructions.classList == 'P2') {
    p2FirstName = e.target.value.trim();
  }
}

function toggleConfirmationButton() {
  if (instructions.classList == 'P1' && (p1LastName == "" || p1LastName == undefined || p1FirstName == "" || p1FirstName == undefined)) {
    confirmationButton.setAttribute("disabled", "");
  } else if (instructions.classList == 'P2' && (p2LastName == "" || p2LastName == undefined || p2FirstName == "" || p2FirstName == undefined)) {
    confirmationButton.setAttribute("disabled", "");
  } else {
    confirmationButton.removeAttribute("disabled");
  }
}

function displayPlayer2Form(e) {
  resetFormFields();
  printP2Instructions();
  modifyConfirmationButton(e);
}

function resetFormFields() {
  lastNameFormField.value = "";
  firstNameFormField.value = "";
}

function printP2Instructions() {
  instructions.textContent = "Joueur 2, quel est votre nom ?";
  instructions.classList.replace('P1', 'P2');
}

function modifyConfirmationButton(e) {
  e.target.value = "Commencer la partie";
  e.target.disabled = true;
  e.target.removeEventListener("click", displayPlayer2Form);
  e.target.addEventListener("click", beginGame);
}

function beginGame(e) {
  let p1Score = 0;
  let p2Score = 0;
  let p1Move = '';
  let p2Move = '';
  removeNameForm();
  createGameBoard();

  function removeNameForm() {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  }

  function createGameBoard() {
    let boardSides = createSideContainers();
    createSideElements(boardSides);
    insertText();
  }

  function createSideContainers() {
    let p1Board = document.createElement('div');
    let p2Board = document.createElement('div');
    document.body.append(p1Board, p2Board);
    identifyContainers(p1Board, p2Board);
    return [p1Board, p2Board];
  }

  function createSideElements(boardSides) {
    for (const playerSide of boardSides) {
      let h1 = document.createElement('h1');
      let instructions = document.createElement('p');
      let paraScore = document.createElement('p');
      let buttonArray = createButtons();
      playerSide.append(h1, instructions, paraScore, buttonArray[0], buttonArray[1], buttonArray[2]);
      identifySideElements(h1, instructions, paraScore, buttonArray[0], buttonArray[1], buttonArray[2]);
    }
  }

  function createButtons() {
    let button1 = document.createElement('input');
    button1.setAttribute('value', 'Pierre');
    let button2 = document.createElement('input');
    button2.setAttribute('value', 'Feuille');
    let button3 = document.createElement('input');
    button3.setAttribute('value', 'Ciseau');
    for (const button of [button1, button2, button3]) {
      button.setAttribute('type', 'button');
    }
    button1.addEventListener('click', sendMove)
    button2.addEventListener('click', sendMove)
    button3.addEventListener('click', sendMove)
    return [button1, button2, button3];
  }

  function sendMove(e) {
    chooseMove(e.target.parentElement.id, e.target.value);
    checkPlayerMoveStatus(e.target.parentElement.id);
  }

  function chooseMove(playerID, move) {
    const p1Buttons = document.querySelectorAll('div#P1 input');
    const p2Buttons = document.querySelectorAll('div#P2 input');
    switch (playerID) {
      case 'P1':
        p1Move = move;
        disablePlayerButtons(p1Buttons);
        break;
      case 'P2':
        p2Move = move;
        disablePlayerButtons(p2Buttons);
        break;
    }
  }

  function disablePlayerButtons(playerButtons) {
    for (const button of playerButtons) {
      button.disabled = true;
    }
  }

  function checkPlayerMoveStatus(moveSenderID) {
    if (p1Move == '' || p2Move == '') {
      document.querySelector(`p#${moveSenderID}-instructions`).innerText = 'En attente du coup adverse...';
    } else {
      compareMoves();
    }
  }

  /* Voir s'il est possible de créer un objet pour chaque joueur, histoire de simplifier cette fonction en permettant une comparaison simple décorellée de l'id de joueur qui a fait chaque coup. */
  function compareMoves() {
    if (p1Move == p2Move) {
      insertAndUpdateInstructions('none', 'none', 'tie');
    } else if (p1Move == 'Pierre' && p2Move == 'Feuille') {
      insertAndUpdateInstructions('P2', 'P1', 'game in progress');
      p2Score++;
    } else if (p1Move == 'Pierre' && p2Move == 'Ciseau') {
      insertAndUpdateInstructions('P1', 'P2', 'game in progress');
      p1Score++;
    } else if (p1Move == 'Feuille' && p2Move == 'Pierre') {
      insertAndUpdateInstructions('P1', 'P2', 'game in progress');
      p1Score++;
    } else if (p1Move == 'Feuille' && p2Move == 'Ciseau') {
      insertAndUpdateInstructions('P2', 'P1', 'game in progress');
      p2Score++;
    } else if (p1Move == 'Ciseau' && p2Move == 'Feuille') {
      insertAndUpdateInstructions('P1', 'P2', 'game in progress');
      p1Score++;
    } else if (p1Move == 'Ciseau' && p2Move == 'Pierre') {
      insertAndUpdateInstructions('P2', 'P1', 'game in progress');
      p2Score++;
    }
    insertAndUpdateScores();
    const allButtons = document.querySelectorAll('input');
    for (button of allButtons) {
      button.disabled = false;
    }
    p1Move = '';
    p2Move = '';
  }

  function identifyContainers(p1Board, p2Board) {
    p1Board.id = "P1";
    p2Board.id = "P2";
  }

  function identifySideElements(h1, instructions, paraScore, button1, button2, button3) {
    h1.id = `${h1.parentElement.id}-name`;
    instructions.id = `${instructions.parentElement.id}-instructions`;
    paraScore.id = `${paraScore.parentElement.id}-score`;
    button1.id = `${button1.parentElement.id}-pierre`;
    button2.id = `${button2.parentElement.id}-feuille`;
    button3.id = `${button3.parentElement.id}-ciseau`;
  }

  function insertText() {
    insertNames();
    insertAndUpdateInstructions('game start');
    insertAndUpdateScores();
  }

  function insertNames() {
    const nameHeaderP1 = document.getElementById('P1-name');
    const nameHeaderP2 = document.getElementById('P2-name');
    nameHeaderP1.innerText = `${p1FirstName + ' ' + p1LastName}`;
    nameHeaderP2.innerText = `${p2FirstName + ' ' + p2LastName}`;
  }

  function insertAndUpdateInstructions(winner, loser, currentStatus) {
    let instructionsP1 = document.getElementById('P1-instructions');
    let instructionsP2 = document.getElementById('P2-instructions');
    if (currentStatus == 'game start') {
      instructionsP1.innerText = 'Choisissez votre coup !';
      instructionsP2.innerText = 'Choisissez votre coup !';
    } else if (currentStatus == 'game in progress') {
      document.querySelector(`p#${winner}-instructions`).innerText = 'Round gagné ! Choisissez votre prochain coup.';
      document.querySelector(`p#${loser}-instructions`).innerText = 'Round perdu ! Choisissez votre prochain coup.';
    } else if (currentStatus == 'tie') {
      instructionsP1.innerText = 'Egalité ! Choisissez votre prochain coup.';
      instructionsP2.innerText = 'Egalité ! Choisissez votre prochain coup.';
    }
  }

  function insertAndUpdateScores() {
    const scoreParaP1 = document.getElementById('P1-score');
    const scoreParaP2 = document.getElementById('P2-score');
    scoreParaP1.innerText = `Score : ${p1Score}`;
    scoreParaP2.innerText = `Score : ${p2Score}`;
  }
}

