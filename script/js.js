function jugar(){
    var nombre = document.getElementById("nombre");
    var nombreJugador = document.getElementById("nombreJugador");
    nombreJugador.appendChild(document.createTextNode(nombre.value));
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
    }

}

function contador() {

}

