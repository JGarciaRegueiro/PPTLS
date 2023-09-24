function jugar() {
    if (validar()) {
        var main = document.querySelector("main");
        main.style.pointerEvents="auto";
        main.style.opacity=1;
        var nombre = document.getElementById("nombre");
        var nombreJugador = document.getElementById("nombreJugador");
        nombreJugador.textContent = nombre.value;
        reset();
    }
}

function eleccionJugador(img){
    var imagenes = document.getElementsByClassName("select__image");
    for(let i=0; i<imagenes.length; i++){
        imagenes[i].style.opacity="0.2";
    }
    var imagenes2 = document.getElementsByClassName("select__image2");
    for(let i=0; i<imagenes2.length; i++){
        imagenes2[i].style.opacity="0.2";
    }
    var eleccionJugador = document.getElementById("eleccionJugador");
    eleccionJugador.src = img.src;
    img.style.opacity="1";
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

    if (img.id == "piedra"){
        if (eleccionOponente == "piedra"){
            resultado.textContent="empate";
        }
        else if (eleccionOponente == "papel"){
            resultado.textContent="perdiste";
        }
        else if (eleccionOponente == "tijeras"){
            resultado.textContent="ganaste";
        }
        else if (eleccionOponente == "lagarto"){
            resultado.textContent="ganaste";
        }
        else if (eleccionOponente == "spock"){
            resultado.textContent="perdiste";
        }
        contador(resultado.textContent);
    }

    
    if (img.id == "papel"){
        if (eleccionOponente == "piedra"){
            resultado.textContent="ganaste";
        }
        else if (eleccionOponente == "papel"){
            resultado.textContent="empate";
        }
        else if (eleccionOponente == "tijeras"){
            resultado.textContent="perdiste";
        }
        else if (eleccionOponente == "lagarto"){
            resultado.textContent="perdiste";
        }
        else if (eleccionOponente == "spock"){
            resultado.textContent="ganaste";
        }
        contador(resultado.textContent);
    }

    if (img.id == "tijeras"){
         if (eleccionOponente == "piedra"){
            resultado.textContent="perdiste";
        }
        else if (eleccionOponente == "papel"){
            resultado.textContent="ganaste";
        }
        else if (eleccionOponente == "tijeras"){
            resultado.textContent="empate";
        }
        else if (eleccionOponente == "lagarto"){
            resultado.textContent="ganaste";
        }
        else if (eleccionOponente == "spock"){
            resultado.textContent="perdiste";
        }
        contador(resultado.textContent);
    }

    if (img.id == "lagarto"){
        if (eleccionOponente == "piedra"){
            resultado.textContent="perdiste";
        }
        else if (eleccionOponente == "papel"){
            resultado.textContent="ganaste";
        }
        else if (eleccionOponente == "tijeras"){
            resultado.textContent="perdiste";
        }
        else if (eleccionOponente == "lagarto"){
            resultado.textContent="empate";
        }
        else if (eleccionOponente == "spock"){
            resultado.textContent="ganaste";
        }
        contador(resultado.textContent);
    }

    if (img.id == "spock"){
        if (eleccionOponente == "piedra"){
            resultado.textContent="ganaste";
        }
        else if (eleccionOponente == "papel"){
            resultado.textContent="perdiste";
        }
        else if (eleccionOponente == "tijeras"){
            resultado.textContent="ganaste";
        }
        else if (eleccionOponente == "lagarto"){
            resultado.textContent="perdiste";
        }
        else if (eleccionOponente == "spock"){
            resultado.textContent="empate";
        }
        contador(resultado.textContent);
    }
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
        imagenes[i].style.opacity="0.2";
    }
    var imagenes2 = document.getElementsByClassName("select__image2");
    for(let i=0; i<imagenes2.length; i++){
        imagenes2[i].style.opacity="0.2";
    }
    
}
