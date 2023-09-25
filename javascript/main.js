//Clases
class GameOption{
    constructor(option, win, source){
        this.option = option;
        this.win = win;              
        this.source = source;  
    }
}

//Atributos
let playerNameChoose, iaDifficult, buttonPlay; 

let playerName, enemyName;
let playerChoice, enemyChoice;

let scorePlayer, scoreEnemy;
let scoreText, gameStatus;

let getEnemyElection;

let bRock, bPaper, bScissor, bLizard, bSpock;

const srcEmpty = "../imgs/Question.jpg";
const srcRock = "../imgs/Rock.jpg";
const srcPaper = "../imgs/Paper.jpg";
const srcScissor = "../imgs/Scissor.jpg";
const srcLizard = "../imgs/Lizard.jpg";
const srcSpock = "../imgs/Spock.jpg";

const rock = new GameOption("rock", ["scissor", "lizard"], srcRock);
const paper = new GameOption("paper", ["rock", "spock"], srcPaper);
const scissor = new GameOption("scissor", ["paper", "lizard"], srcScissor);
const lizard = new GameOption("lizard", ["spock", "paper"], srcLizard);
const spock = new GameOption("spock", ["rock", "paper"], srcSpock);
//-------------------------------------------
//Main code
function compareElections(playerOption, enemyOption){    
    let aux = "";
    let strEnemy = enemyOption.option;

    console.log(playerOption.option + " vs " + enemyOption.option);

    if(playerOption.option == strEnemy){
        aux = "You have tied...";        
    }
        
    else if(playerOption.win[0] == strEnemy || playerOption.win[1] == strEnemy){
        aux = "You won!!!";
        scorePlayer++;
    }        
    else{
        aux = "You lose...";
        scoreEnemy++;
    }

    console.log(">" + aux);
    drawGameStatus(aux);
}

//-------------------------------------------
// Functions
function init(){
    let aux;

    //Asignación de inputs
    playerNameChoose = document.getElementById("player_name");
    iaDifficult = document.getElementById("enemy");        
    buttonPlay = document.getElementById("play_button");

    //Asignación de ambos contenendores de juego
    aux = document.getElementById("player_content");
    playerName = aux.querySelector("h2");
    playerChoice = aux.querySelector("img");

    aux = document.getElementById("enemy_content");
    enemyName = aux.querySelector("h2");
    enemyChoice = aux.querySelector("img");
    
    //Asignación de los puntos y el estado del juego
    scoreText = document.getElementById("score_text");
    gameStatus = document.getElementById("game_status");

    //Asignación de las opciones que se pueden tomar
    bRock = document.getElementById("option_rock");
    bPaper = document.getElementById("option_paper");
    bScissor = document.getElementById("option_scissor");
    bLizard = document.getElementById("option_lizard");
    bSpock = document.getElementById("option_spock");

    bRock.addEventListener("click", () => handleMyOption(rock));
    bPaper.addEventListener("click", () => handleMyOption(paper));
    bScissor.addEventListener("click", () => handleMyOption(scissor));
    bLizard.addEventListener("click", () => handleMyOption(lizard));
    bSpock.addEventListener("click", () => handleMyOption(spock));
}

function addEvents(){
    buttonPlay.addEventListener("click", (event) => {
        event.preventDefault();
        start();
    });
}

function start(){
    console.log("Loading game...");    
    
    playerName.innerHTML = playerNameChoose.value;
    enemyName.innerHTML = iaDifficult.value;

    scorePlayer = 0;
    scoreEnemy = 0;

    console.log("Enemy level = " + iaDifficult.value);
    getEnemyElection = getEnemyIAFunctionality();

    drawGameStatus("Waiting...");

    console.log("GAME START!");    
}

function drawGameStatus(status){    
    gameStatus.innerHTML = status;
    scoreText.innerHTML = scorePlayer + " - " + scoreEnemy;
}

function battle(electionPlayer, electionEnemy){
    playerChoice.src = electionPlayer.source;
    enemyChoice.src = electionEnemy.source;
    compareElections(electionPlayer, electionEnemy);    
}
//-------------------------------------------
//Your functions
function handleMyOption(election){
    console.log("You choose " + election.option);    
    let e = getEnemyElection();
    battle(election, e);
}

//-------------------------------------------
//Enemy functions
function getEnemyIAFunctionality(){
    
    switch(iaDifficult.value.toLowerCase){        
        default:
            return getEnemyElectionNormal;
    }
    
}

function getEnemyElectionNormal(){
    return translateNumberIntoClass(getRandomOption(5));
}


function getRandomOption(max){
    return Math.floor(Math.random() * max) + 1;
}

function translateNumberIntoClass(number){    
    switch(number){
        case 1: return rock;
        case 2: return paper;
        case 3: return scissor;
        case 4: return lizard;
        case 5: return spock;
        default: return null;
    }
}
//-------------------------------------------
//Global events
window.onload = function(){
    init();
    addEvents();
}