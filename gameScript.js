let min = 0;
let max = 13;

let firstCard;
let secondCard;
let sum = 0;
let hasBlackJack = false;

let draw;
let cards;
let cards_html;

let choice;
let MAIN_MENU;
let MAIN_GAME;
let MAIN_VD;

let CARDS;
let CARD_SUM;
let DRAW_CARD;
let VD_MESSAGE;
let PLAYER;
let PLAYER_GAME;

let player = {
	name: "Jarrian",
	chips: 100
}

/*********************/
/*       ONLOAD      */
/*********************/

function loadDoc() {
	MAIN_MENU = document.getElementById("main-menu");
	MAIN_GAME = document.getElementById("main-game");
	MAIN_VD = document.getElementById("victory-defeat");
	
	CARDS = document.getElementById("cards-current-field");
	CARD_SUM = document.getElementById("card-sum");
	DRAW_CARD = document.getElementById("draw-card");
	VD_MESSAGE = document.getElementById("vd-message");
	PLAYER = document.getElementById("player");
	PLAYER_GAME = document.getElementById("player-game");

	showMainMenu();
}

/*********************/
/*     MAIN MENU     */
/*********************/

function showMainMenu(){
	resetGame();
	MAIN_MENU.classList.add("show");
	MAIN_MENU.classList.remove("hide");

	MAIN_GAME.classList.remove("show");
	MAIN_GAME.classList.add("hide");

	MAIN_VD.classList.remove("show-flex");
	MAIN_VD.classList.add("hide");
	PLAYER.textContent = player.name + ": $" + player.chips;
}

/*********************/
/*     MAIN GAME     */
/*********************/

function showMainGame() {
	resetGame();
	MAIN_MENU.classList.remove("show");
	MAIN_MENU.classList.add("hide");

	MAIN_GAME.classList.add("show");
	MAIN_GAME.classList.remove("hide");

	MAIN_VD.classList.remove("show-flex");
	MAIN_VD.classList.add("hide");
	PLAYER.textContent = player.name + ": $" + player.chips;
	PLAYER_GAME.textContent = PLAYER.textContent;
}

/*********************/
/* VICTORY OR DEFEAT */
/*********************/

function showVictoryDefeat() {
	MAIN_VD.classList.add("show-flex");
	MAIN_VD.classList.remove("hide");
}

//	START GAME
function startGame() {
	showMainGame();
	getRandomStartingCard();
}

//	RESET GAME
function resetGame() {
	cards_html = "";
	cards = [];
	DRAW_CARD.classList.add("hide");
	firstCard = 0;
	secondCard = 0;
}

/*********************/
/*       RULES       */
/*********************/

//	CHECK CARDS
function cardCheck() {
	CARD_SUM.textContent = sum;
	console.log(cards);
	console.log(sum);

	if (sum < 21) {
		DRAW_CARD.classList.remove("hide");
		DRAW_CARD.classList.add("show-flex");
	} else if (sum === 21) {
		displayVictory();
	} else {
		displayDefeat();
	}
}

//	STARTING CARDC
function getRandomStartingCard() {
	while (firstCard === secondCard) {
		firstCard = getRandomCard();
		secondCard = getRandomCard();
	}

	sum = firstCard + secondCard;

	gamestart();
}


//	INSERT STARTING CARDS TO CARD ARRAY
function gamestart() {
	cards.push(firstCard);
	cards.push(secondCard);

	displayCards(firstCard);
	displayCards(secondCard);

	cardCheck();
}

//	GENERATE RANDOM CARD
function getRandomCard() {
	let rC = Math.floor(Math.random() * (max - min)) + min + 1;
	if (rC === 1) {
		return 11;;
	} else if (rC > 10) {
		return 10;;
	}

	return rC;
}

//	DISPLAY CARDS IN BROWSER
function displayCards(card){
	CARDS.innerHTML = cards_html + '<h1 class="card-number">' + card + '</h1>';
	cards_html = CARDS.innerHTML;
}

//	DRAW CARD
function drawCard() {
	draw = getRandomCard();
	cards.push(draw);
	sum += draw;
	displayCards(draw);
	cardCheck();
}

//	DRAW SKIP
function drawSkip(){
	DRAW_CARD.classList.remove("show-flex");
	DRAW_CARD.classList.add("hide");
	cardCheck();
}

//	DEFEAT
function displayDefeat(){
	
	VD_MESSAGE.textContent = "YOU LOST!"

	VD_MESSAGE.classList.add("defeat");
	VD_MESSAGE.classList.remove("victory");

	player.chips -= 10;

	showVictoryDefeat();
}

//	VICTORY
function displayVictory(){
	
	VD_MESSAGE.textContent = "YOU WIN!"

	VD_MESSAGE.classList.add("victory");
	VD_MESSAGE.classList.remove("defeat");

	player.chips += 20;

	showVictoryDefeat();
}