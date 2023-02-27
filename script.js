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
  lastNameFormField.value = "";
  firstNameFormField.value = "";
  instructions.textContent = "Joueur 2, quel est votre nom ?";
  instructions.classList.replace('P1', 'P2')
  e.target.value = "Commencer la partie";
  e.target.removeEventListener("click", displayPlayer2Form);
  e.target.addEventListener("click", beginGame);
}

function beginGame(e) {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild)
  }
  let p1Board = document.createElement('div');
  let p2Board = document.createElement('div');
  document.body.append(p1Board, p2Board);
  for (const element of [p1Board, p2Board]) {
    let h1 = document.createElement('h1')
    let p = document.createElement('p');
    let button1 = document.createElement('input');
    button1.setAttribute('value', 'Pierre')
    let button2 = document.createElement('input');
    button2.setAttribute('value', 'Feuille')
    let button3 = document.createElement('input');
    button3.setAttribute('value', 'Ciseau')
    element.append(h1, p, button1, button2, button3);
  }
  for (const element of [button1, button2, button3]) {
    element.setAttribute('type', 'button')
  }
  for (const element of p1Board.children) {
  element.classList.add("P1");
  }
  for (const element of p2Board.children) {
    element.classList.add("P2");
    }
}