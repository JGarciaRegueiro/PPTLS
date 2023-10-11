const tabla = 
{   "piedra":   ["tijeras","lagarto"],
    "papel":    ["piedra","spock"],
    "tijeras":  ["papel","lagarto"],
    "lagarto":  ["papel","spock"],
    "spock":    ["piedra","tijeras"] 
};
let firstTime = true;
let nombre;
let historyGames;

let choicePlayer, choiceOpponent;
let scorePlayer, scoreOpponent;
let gameResult;

function jugar() {
    if (validar()) {
        let main = document.querySelector("main");               

        main.style.pointerEvents="auto";
        main.style.opacity=1;                
        
        document.querySelector("html").style.setProperty("--jugador", document.getElementById("colorPlayer").value);
        document.querySelector("html").style.setProperty("--oponente", document.getElementById("colorOpponent").value);

        document.getElementById("nombreJugador").textContent = nombre.value;
        
        if(firstTime) firstTime = false;            
        else saveMatch(nombre.value);
        
        reset();        
    }
}

function reset() {    
    nombre.value="";

    scorePlayer.textContent = 0;
    scoreOpponent.textContent = 0;
    
    gameResult.textContent="";   

    imagesRemoveAttributes();

    choicePlayer.setAttribute("src"," ");
    choiceOpponent.setAttribute("src"," ");
}

function eleccionJugador(img){

    imagesRemoveAttributes();
    
    choicePlayer.src = img.src;

    img.setAttribute("style","opacity:1");
    
    resultado(img, eleccionOponente());
    contador();
}

function eleccionOponente(){    
    let opciones = ["piedra","papel","tijeras","lagarto","spock"];
    let eleccion = opciones[getRandomInt(0,5)];    

    choiceOpponent.src = document.getElementById(eleccion).src;
    document.getElementById(eleccion+"Op").style.opacity = "1";
    
    return eleccion;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function resultado(img, eleccionOponente){
    if (eleccionOponente === img.id) 
        gameResult.textContent = "empate";
     else if (tabla[img.id].includes(eleccionOponente))
        gameResult.textContent = "ganaste";
     else 
        gameResult.textContent = "perdiste";

    contador(gameResult.textContent);
}

function contador(resultado) {
    if (resultado == "ganaste")
        scorePlayer.textContent = parseInt(scorePlayer.textContent) + 1;
    else if (resultado == "perdiste")
        scoreOpponent.textContent = parseInt(scoreOpponent.textContent) + 1;
}

function validar() {
    if (nombre.value.trim() == ''){
        alert("El nombre es obligatorio");
        return false;
    } else return true;
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

window.onload = function(){    
    historyGames = [];
    
    init();
}

function init(){
    document.getElementById("bPlay").addEventListener("click", jugar);
    document.getElementById("bHistory").addEventListener("click", showMatch);

    nombre = document.getElementById("nombre");

    scorePlayer = document.getElementById("puntuacionJugador");
    scoreOpponent = document.getElementById("puntuacionOponente");
    choicePlayer = document.getElementById("eleccionJugador");
    choiceOpponent = document.getElementById("eleccionOponente");
    gameResult = document.getElementById("resultado");
}

//-------------------------------------

