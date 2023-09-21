function jugar(){
    var nombre = document.getElementById("nombre");
    var nombreJugador = document.getElementById("nombreJugador");
    nombreJugador.textContent = nombre.value;

    var main = document.getElementsByTagName("main");
    main.style.cssText ="pointer-events: none;";
}

function eleccionJugador(img){
    var eleccionJugador = document.getElementById("eleccionJugador");
    eleccionJugador.src = img.src;
    var eleccion = eleccionOponente();
    resultado(img, eleccion);
    contador();
}

function eleccionOponente(){
    var eleccionOponente = document.getElementById("eleccionOponente");
    var opciones = ["piedra","papel","tijeras","lagarto","spock"];
    var eleccion = opciones[getRandomInt(0,4)];
    eleccionOponente.src = document.getElementById(eleccion).src;
    return eleccion;
}

function getRandomInt(min, max) {
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

