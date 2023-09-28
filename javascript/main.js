//Clases y constantes
class GameOption{
    constructor(option, win, source){
        this.option = option;
        this.win = win;              
        this.source = source;  
    }
}

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


//Referencias
let playerNameChoose, iaDifficult, buttonPlay; 

let playerName, enemyName;
let playerChoice, enemyChoice;

let scoreText, gameStatus;
let bRock, bPaper, bScissor, bLizard, bSpock;
let ebRock, ebPaper, ebScissor, ebLizard, ebSpock;

//Atributos
let firsTime = true;

let scorePlayer, scoreEnemy;

const probabilityEnemyElectionsStartValue = 5;
let probabilityEnemyElections;
let enemyElections;
let getEnemyElection;


let shinyButton;

//-------------------------------------------
//Main code
function compareElections(playerOption, enemyOption){    
    //Se repite 2 o más veces este código
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

    // bRock = document.getElementById("p_rock");
    // bPaper = document.getElementById("p_paper");
    // bScissor = document.getElementById("p_scissor");
    // bLizard = document.getElementById("p_lizard");
    // bSpock = document.getElementById("p_spock");
}

function addEvents(){
    buttonPlay.addEventListener("click", (event) => {
        event.preventDefault();
        start();
    });
}

function initPlayerOptions(target, myClass){
    //border: solid 2px black;

    target.style.backgroundColor = 'white';
    let revertColor = target.style.backgroundColor;

    target.addEventListener("click", () => handleMyOption(myClass));    
    target.addEventListener("click", () => setButtonShiny(target, revertColor));    

    target.addEventListener("mouseenter", () => target.style.backgroundColor = "yellow");
    target.addEventListener("mouseleave", () => target.style.backgroundColor = getColor(target, revertColor));
}

function start(){

    if(playerNameChoose.value == "")
        alert("Not name available");
    else{
        console.log("Loading game...");    
    
        playerName.innerHTML = playerNameChoose.value;
        enemyName.innerHTML = iaDifficult.value;
    
        playerChoice.src = srcEmpty;
        enemyChoice.src = srcEmpty;

        scorePlayer = 0;
        scoreEnemy = 0;
    
        console.log("Enemy level = " + iaDifficult.value);
        getEnemyElection = getEnemyIAFunctionality();
    
        drawGameStatus("Waiting...");
        document.querySelector("main").style.opacity = 1;

        let _argButtonsPlayerOptions = [bRock, bPaper, bScissor, bLizard, bSpock];
        
        shinyButton = null;
        for (let i = 0; i < _argButtonsPlayerOptions.length; i++)
            _argButtonsPlayerOptions[i].style.backgroundColor = 'white';                        

        if(firsTime){            

            let _argGameOptions = [rock, paper, scissor, lizard, spock];

            for (let i = 0; i < _argButtonsPlayerOptions.length; i++) {
                initPlayerOptions(_argButtonsPlayerOptions[i], _argGameOptions[i]);    
            }

            // initPlayerOptions(bRock, rock);            
            // initPlayerOptions(bPaper, paper);
            // initPlayerOptions(bScissor, scissor);
            // initPlayerOptions(bLizard, lizard);
            // initPlayerOptions(bSpock, spock);

            firsTime = false;
        }

        console.log("GAME START!");  
    }
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
       
    let e = getEnemyElection();
    battle(election, e);
}
function setButtonShiny(target, revert){
    if(shinyButton != null)
        shinyButton.style.backgroundColor = revert; 

    shinyButton = target;
    shinyButton.style.backgroundColor = 'green';
}

function getColor(target, savedColor){
    if(target == shinyButton)
        return 'green';
    return savedColor;
}

//-------------------------------------------
//Enemy functions
function getEnemyIAFunctionality(){
    console.log("You choose " + iaDifficult.value); 

    let aux;

    switch(iaDifficult.value){    
        case "Normal": 
            enemyElections = [rock, paper, scissor, lizard, spock]            
            aux = getEnemyElectionNormal;            
            break;
        case "Classic": 
            enemyElections = [rock, paper, scissor]
            aux = getEnemyElectionClassic;            
            break;
        case "Spock": 
            enemyElections = [spock]
            aux = getEnemyElectionSpock;    
            break;        
        case "Intelligent": 
            enemyElections = [rock, paper, scissor, lizard, spock]
            aux = getEnemyElectionIntelligent;
            break;
        default:
            return null;
    }

    probabilityEnemyElections = []

    console.log(enemyElections);
    for (let i = 0; i < enemyElections.length; i++) {
        probabilityEnemyElections[i] = probabilityEnemyElectionsStartValue;
    }

    return aux;
}

function getEnemyElectionNormal(){
    return convertNumberIntoClass(getRandomOption(5));
}
function getEnemyElectionSpock(){
    return spock;
}
function getEnemyElectionClassic(){
    return convertNumberIntoClass(getRandomOption(3));
}
function getEnemyElectionIntelligent(){
    return getRandomOption();
}

function getRandomOption(){
    let total = 0;
    let rng = 0, waste = 0;

    for (let i = 0; i < probabilityEnemyElections.length; i++) {
        total += probabilityEnemyElections[i];
    }

    rng = Math.floor(Math.random() * total + 1);    

    for (let i = 0; i < enemyElections.length; i++) {
        waste += probabilityEnemyElections[i];

        console.log(">>> " +rng + " <= " + waste + " | " + total);

        if(rng <= waste){
            console.log(enemyElections[i].option + " is the decision");
            console.log(enemyElections[i].source + "");            
            return enemyElections[i];          
        }
    }
}

function getRandomOption(max){
    return Math.floor(Math.random() * max) + 1;
}

function convertNumberIntoClass(number){    
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

    document.querySelector("main").style.opacity = .1;
}