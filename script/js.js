let firstTime = true;
let historyGames;

let scorePlayer, scoreOpponent;

function jugar() {
    if (validar()) {
        var main = document.querySelector("main");
        main.style.pointerEvents="auto";
        main.style.opacity=1;
        var colorPlayer = document.getElementById("colorPlayer");
        var colorOpponent = document.getElementById("colorOpponent");
        document.querySelector("html").style.setProperty("--jugador", colorPlayer.value);
        document.querySelector("html").style.setProperty("--oponente", colorOpponent.value);
        var nombre = document.getElementById("nombre");
        var nombreJugador = document.getElementById("nombreJugador");
        nombreJugador.textContent = nombre.value;
        if(firstTime){
            firstTime = false;
            console.log("Not first time");
        }
        else SaveMatch(nombre.value);
        reset();        
    }
}

function eleccionJugador(img){
    var imagenes = document.getElementsByClassName("select__image");
    for(let i=0; i<imagenes.length; i++){
        imagenes[i].removeAttribute("style","opacity");
    }
    var imagenes2 = document.getElementsByClassName("select__image2");
    for(let i=0; i<imagenes2.length; i++){
        imagenes2[i].removeAttribute("style","opacity");
    }
    var eleccionJugador = document.getElementById("eleccionJugador");
    eleccionJugador.src = img.src;
    img.setAttribute("style","opacity:1");
    var eleccion = eleccionOponente();
    resultado(img, eleccion);
    contador();
}

function eleccionOponente(){
    var eleccionOponente = document.getElementById("eleccionOponente");
    var opciones = ["piedra","papel","tijeras","lagarto","spock"];
    var eleccion = opciones[getRandomInt(0,5)];
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
    var resultado = document.getElementById("resultado");
    var tabla = {"piedra": ["tijeras","lagarto"],
                "papel": ["piedra","spock"],
                "tijeras": ["papel","lagarto"],
                "lagarto": ["papel","spock"],
                "spock": ["piedra","tijeras"]
                };

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
    var puntuacionJugador = document.getElementById("puntuacionJugador");
    var puntuacionOponente = document.getElementById("puntuacionOponente");
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
    document.getElementById("nombre").value="";
    var puntuacionJugador = document.getElementById("puntuacionJugador");
    var puntuacionOponente = document.getElementById("puntuacionOponente");
    var resultado = document.getElementById("resultado");
    puntuacionJugador.textContent = 0;
    puntuacionOponente.textContent = 0;
    resultado.textContent="";
    var imagenes = document.getElementsByClassName("select__image");
    for(let i=0; i<imagenes.length; i++){
        imagenes[i].removeAttribute("style","opacity");
    }
    var imagenes2 = document.getElementsByClassName("select__image2");
    for(let i=0; i<imagenes2.length; i++){
        imagenes2[i].removeAttribute("style","opacity");
    }
    var eleccionJugador = document.getElementById("eleccionJugador");
    var eleccionOponente = document.getElementById("eleccionOponente");

    eleccionJugador.setAttribute("src"," ");
    eleccionOponente.setAttribute("src"," ");

    //var historyButton = ;
    
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