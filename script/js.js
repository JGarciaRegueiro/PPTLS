const GAME_TABLE = 
{   "piedra":   ["tijeras","lagarto"],
    "papel":    ["piedra","spock"],
    "tijeras":  ["papel","lagarto"],
    "lagarto":  ["papel","spock"],
    "spock":    ["piedra","tijeras"] 
};
let firstTime = true;
let currentName;
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
    currentName = document.getElementById("nombre");

    scorePlayer = document.getElementById("puntuacionJugador");
    scoreOpponent = document.getElementById("puntuacionOponente");
    choicePlayer = document.getElementById("eleccionJugador");
    choiceOpponent = document.getElementById("eleccionOponente");
    gameResult = document.getElementById("resultado");
}
function setEventListeners(){
    document.getElementById("bPlay").addEventListener("click", play);
    document.getElementById("bHistory").addEventListener("click", showMatch);

    document.getElementById("piedra").addEventListener("click", (ev) => electionPlayer(ev.target));
    document.getElementById("papel").addEventListener("click", (ev) => electionPlayer(ev.target));
    document.getElementById("tijeras").addEventListener("click", (ev) => electionPlayer(ev.target));
    document.getElementById("lagarto").addEventListener("click", (ev) => electionPlayer(ev.target));
    document.getElementById("spock").addEventListener("click", (ev) => electionPlayer(ev.target));
}

function play() {
    if (validate()) {
        let main = document.querySelector("main");               

        main.style.pointerEvents="auto";
        main.style.opacity=1;                
        
        document.querySelector("html").style.setProperty("--jugador", document.getElementById("colorPlayer").value);
        document.querySelector("html").style.setProperty("--oponente", document.getElementById("colorOpponent").value);

        document.getElementById("nombreJugador").textContent = currentName.value;
        
        if(firstTime) firstTime = false;            
        else saveMatch(currentName.value);
        
        reset();        
    }
}
function validate() {
    if (currentName.value.trim() == ''){
        alert("El nombre es obligatorio");
        return false;
    } else return true;
}
function reset() {    
    currentName.value="";

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
     else if (GAME_TABLE[img.id].includes(electionOpponent))
        gameResult.textContent = "ganaste";
     else 
        gameResult.textContent = "perdiste";

    cont(gameResult.textContent);
}
function cont(result) {
    if (result == "ganaste")
        scorePlayer.textContent = parseInt(scorePlayer.textContent) + 1;
    else if (result == "perdiste")
        scoreOpponent.textContent = parseInt(scoreOpponent.textContent) + 1;
}
function electionPlayer(img){

    imagesRemoveAttributes();
    
    choicePlayer.src = img.src;

    img.setAttribute("style","opacity:1");
    
    result(img, electionOpponent());
    cont();
}
function electionOpponent(){    
    let opciones = ["piedra","papel","tijeras","lagarto","spock"];
    let eleccion = opciones[getRandomInt(0,5)];    

    choiceOpponent.src = document.getElementById(eleccion).src;
    document.getElementById(eleccion+"Op").style.opacity = "1";
    
    return eleccion;
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
    let imagenes = document.getElementsByClassName("select__image");
    let imagenes2 = document.getElementsByClassName("select__image2");    

    for(let i=0; i<imagenes.length; i++){
        imagenes[i].removeAttribute("style","opacity");
    }
    for(let i=0; i<imagenes2.length; i++){
        imagenes2[i].removeAttribute("style","opacity");
    }
}