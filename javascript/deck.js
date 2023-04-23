import { getValue, checkAce, reduceAce } from "./index.js";
let cardDeck;
let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let canHit = true;  //allows player to draw card while your sum <= 21
let hidden;
window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C","D","H","S"];
    cardDeck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            cardDeck.push(values[j] + "-" + types[i]);
        }
    }
   // console.log(deck);
}

 function shuffleDeck () {
    for (let i = 0; i < cardDeck.length; i++) {
        let j = Math.floor(Math.random() * cardDeck.length); //(0-1) * 52 = (0-51.999)
        let shuffling = cardDeck[i];
        cardDeck[i] = cardDeck[j];
        cardDeck[j] = shuffling;
    }
    console.log(cardDeck);
}
function startGame() {
    //let carddeck = shuffleDeck();
   // let carddeck = buildDeck();
    hidden = cardDeck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {
        //<img src="./cards/A-C.png">
        let cardImg = document.createElement("img");
        let card = cardDeck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = cardDeck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);  
    }
    console.log(yourSum);
    document.getElementById("Hit").addEventListener("click", hit);
    document.getElementById("Stand").addEventListener("click", stand);
}

export function hit () {
    if (!canHit) {
        return;
    }
    //let cardDeck = shuffleDeck();
    let cardImg = document.createElement("img");
    let card = cardDeck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1+10+8 =19
        canHit = false;
    }
}

export function stand() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    let canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png"

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
    } 
    else if (dealerSum > 21) {
        message = "You Win!";
    } 
    //both you and dealer <= 21
    else if(yourSum == dealerSum) {
        message = "Tie";
    } 
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum){
        message = "You Loose!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}

