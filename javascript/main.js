
//Atributos

let playerNameChoose, iaDifficult, buttonPlay; 

let playerName, enemyName;
let playerChoice, enemyChoice;

let scorePlayer, scoreEnemy;
let scoreText, gameStatus;

let bRock, bPaper, bScissor, bLizard, bSpock;

const srcEmpty = "../imgs/Question.jpg";
const srcRock = "../imgs/Rock.jpg";
const srcPaper = "../imgs/Paper.jpg";
const srcScissor = "../imgs/Scissor.jpg";
const srcLizard = "../imgs/Lizard.jpg";
const srcSpock = "../imgs/Spock.jpg";
//-------------------------------------------
//Main code



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
}

function addEvents(){
    buttonPlay.addEventListener("click", (event) => {
        event.preventDefault();
        start();
    });
}

function addPlayEvents(){
    bRock.addEventListener("click", () => handleOptions(srcRock));
    bPaper.addEventListener("click", () => handleOptions(srcPaper));
    bScissor.addEventListener("click", () => handleOptions(srcScissor));
    bLizard.addEventListener("click", () => handleOptions(srcLizard));
    bSpock.addEventListener("click", () => handleOptions(srcSpock));
}

function start(){
    console.log("Loading game...");
    addPlayEvents();

    
    playerName = playerNameChoose.value;
    enemyName.innerHTML = iaDifficult.value;

    scorePlayer = 0;
    scoreEnemy = 0;
}

function handleOptions(src){
    console.log("You choose " + src);
    playerChoice.src = src;

   // enemyChoice.src = 
}

//-------------------------------------------
//Enemy functions
function getRandomOption(){
    //let argOptions = []

    return Math.floor(Math.random() * 3) + 1;
}

//-------------------------------------------
//Global events
window.onload = function(){
    init();
    addEvents();
}