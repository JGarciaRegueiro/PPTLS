const tabla = 
{   "piedra":   ["tijeras","lagarto"],
    "papel":    ["piedra","spock"],
    "tijeras":  ["papel","lagarto"],
    "lagarto":  ["papel","spock"],
    "spock":    ["piedra","tijeras"] 
};
let firstTime = true;
let historyGames;

let scorePlayer, scoreOpponent;

function jugar() {
    if (validar()) {
        let main = document.querySelector("main");
        let colorPlayer = document.getElementById("colorPlayer");
        let colorOpponent = document.getElementById("colorOpponent");
        let nombre = document.getElementById("nombre");
        let nombreJugador = document.getElementById("nombreJugador");

        main.style.pointerEvents="auto";
        main.style.opacity=1;                
        
        document.querySelector("html").style.setProperty("--jugador", colorPlayer.value);
        document.querySelector("html").style.setProperty("--oponente", colorOpponent.value);

        nombreJugador.textContent = nombre.value;
        
        if(firstTime) firstTime = false;            
        else SaveMatch(nombre.value);
        
        reset();        
    }
}

function eleccionJugador(img){
    let imagenes = document.getElementsByClassName("select__image");
    let imagenes2 = document.getElementsByClassName("select__image2");
    let eleccionJugador = document.getElementById("eleccionJugador");

    let eleccion = eleccionOponente();

    for(let i=0; i<imagenes.length; i++){
        imagenes[i].removeAttribute("style","opacity");
    }
    for(let i=0; i<imagenes2.length; i++){
        imagenes2[i].removeAttribute("style","opacity");
    }
    
    eleccionJugador.src = img.src;

    img.setAttribute("style","opacity:1");
    
    resultado(img, eleccion);
    contador();
}

function eleccionOponente(){
    let eleccionOponente = document.getElementById("eleccionOponente");
    let opciones = ["piedra","papel","tijeras","lagarto","spock"];
    let eleccion = opciones[getRandomInt(0,5)];    

    eleccionOponente.src = document.getElementById(eleccion).src;
    document.getElementById(eleccion+"Op").style.opacity = "1";
    
    return eleccion;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function resultado(img, eleccionOponente){
    let resultado = document.getElementById("resultado");

    if (eleccionOponente === img.id) {
        resultado.textContent = "empate";
    } else if (tabla[img.id].includes(eleccionOponente)) {
        resultado.textContent = "ganaste";
    } else {
        resultado.textContent = "perdiste";
    }

    contador(resultado.textContent);
}

function contador(resultado) {
    let puntuacionJugador = document.getElementById("puntuacionJugador");
    let puntuacionOponente = document.getElementById("puntuacionOponente");
    
    if (resultado == "ganaste"){
        puntuacionJugador.textContent = parseInt(puntuacionJugador.textContent) + 1;
    } 
    else if (resultado == "perdiste") {
        puntuacionOponente.textContent = parseInt(puntuacionOponente.textContent) + 1;
    }
}

function validar() {
    if (nombre.value.trim() == ''){
        alert("El nombre es obligatorio");
        return false;
    } else return true;
}

function reset() {
    let puntuacionJugador = document.getElementById("puntuacionJugador");
    let puntuacionOponente = document.getElementById("puntuacionOponente");
    let resultado = document.getElementById("resultado");
    
    let eleccionJugador = document.getElementById("eleccionJugador");
    let eleccionOponente = document.getElementById("eleccionOponente");

    let imagenes = document.getElementsByClassName("select__image");
    let imagenes2 = document.getElementsByClassName("select__image2");

    document.getElementById("nombre").value="";

    puntuacionJugador.textContent = 0;
    puntuacionOponente.textContent = 0;
    resultado.textContent="";
    
   

    for(let i=0; i<imagenes.length; i++){
        imagenes[i].removeAttribute("style","opacity");
    }
    
    for(let i=0; i<imagenes2.length; i++){
        imagenes2[i].removeAttribute("style","opacity");
    }
    
    
    eleccionJugador.setAttribute("src"," ");
    eleccionOponente.setAttribute("src"," ");
}

function SaveMatch(){
    historyGames.push(scorePlayer.textContent + " vs " + scoreOpponent.textContent);
}

function ShowMatch(){
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
    console.log("loading...");    
    historyGames = [];
    
    scorePlayer = document.getElementById("puntuacionJugador");
    scoreOpponent = document.getElementById("puntuacionOponente");
}