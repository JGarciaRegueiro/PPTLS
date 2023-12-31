const TABLE = 
{   "piedra":   ["tijeras","lagarto"],
    "papel":    ["piedra","spock"],
    "tijeras":  ["papel","lagarto"],
    "lagarto":  ["papel","spock"],
    "spock":    ["piedra","tijeras"] 
};
let firstTime = true;
let player;
let historyGames;

let choicePlayer, choiceOpponent;
let scorePlayer, scoreOpponent;
let gameResult;

window.onload = function(){    
    historyGames = [];
    
    init();
    setEventListeners();
}
function init(){
    player = document.getElementById("player");

    scorePlayer = document.getElementById("scorePlayer");
    scoreOpponent = document.getElementById("scoreOpponent");
    choicePlayer = document.getElementById("choicePlayer");
    choiceOpponent = document.getElementById("choiceOpponent");
    gameResult = document.getElementById("gameResult");
}
function setEventListeners(){
    document.getElementById("bPlay").addEventListener("click", play);
    document.getElementById("bHistory").addEventListener("click", showMatch);

    document.getElementById("piedra").addEventListener("click", (ev) => choicingPlayer(ev.target));
    document.getElementById("papel").addEventListener("click", (ev) => choicingPlayer(ev.target));
    document.getElementById("tijeras").addEventListener("click", (ev) => choicingPlayer(ev.target));
    document.getElementById("lagarto").addEventListener("click", (ev) => choicingPlayer(ev.target));
    document.getElementById("spock").addEventListener("click", (ev) => choicingPlayer(ev.target));
}

function play() {
    if (validate()) {
        let main = document.querySelector("main");               

        main.style.pointerEvents="auto";
        main.style.opacity=1;                
        
        document.querySelector("html").style.setProperty("--player", document.getElementById("colorPlayer").value);
        document.querySelector("html").style.setProperty("--opponent", document.getElementById("colorOpponent").value);

        document.getElementById("namePlayer").textContent = player.value;
        
        if(firstTime) firstTime = false;            
        else saveMatch(player.value);
        
        reset();        
    }
}
function validate() {
    if (player.value.trim() == ''){
        alert("El nombre es obligatorio");
        return false;
    } else return true;
}
function reset() {    
    player.value="";

    scorePlayer.textContent = 0;
    scoreOpponent.textContent = 0;
    
    gameResult.textContent="";   

    imagesRemoveAttributes();

    choicePlayer.setAttribute("src"," ");
    choiceOpponent.setAttribute("src"," ");
}

function result(img, electionOpponent){
    if (electionOpponent === img.id) 
        gameResult.textContent = "empate";
     else if (TABLE[img.id].includes(electionOpponent))
        gameResult.textContent = "ganaste";
     else 
        gameResult.textContent = "perdiste";

    counter(gameResult.textContent);
}
function counter(result) {
    if (result == "ganaste")
        scorePlayer.textContent = parseInt(scorePlayer.textContent) + 1;
    else if (result == "perdiste")
        scoreOpponent.textContent = parseInt(scoreOpponent.textContent) + 1;
}
function choicingPlayer(img){

    imagesRemoveAttributes();
    
    choicePlayer.src = img.src;

    img.setAttribute("style","opacity:1");
    
    result(img, choicingOpponent());
    counter();
}

function choicingOpponent(){    
    let options = ["piedra","papel","tijeras","lagarto","spock"];
    let choice = options[getRandomInt(0,5)];    

    choiceOpponent.src = document.getElementById(choice).src;
    document.getElementById(choice+"Op").style.opacity = "1";
    
    return choice;
}

function saveMatch(){
    historyGames.push(scorePlayer.textContent + " vs " + scoreOpponent.textContent);
}
function showMatch(){
    if(!firstTime) {        
        let str = "Games";
        for(let i = 0; i < historyGames.length; i++){
            str += "\nGame " + (i+1) + ": " + historyGames[i];            
        }
    
        str += "\nCurrent Game: " + scorePlayer.textContent + " vs " + scoreOpponent.textContent;
        alert(str);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function imagesRemoveAttributes(){
    let images = document.getElementsByClassName("select__image");
    let images2 = document.getElementsByClassName("select__image2");    

    for(let i=0; i<images.length; i++){
        images[i].removeAttribute("style","opacity");
    }
    for(let i=0; i<images2.length; i++){
        images2[i].removeAttribute("style","opacity");
    }    
}
