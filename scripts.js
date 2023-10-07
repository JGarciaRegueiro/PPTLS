var marcadorJugador = 0;
var marcadorOrdenador =0;


var botonesJugador = document.getElementsByClassName("btn-jugador");
var botonesOrdenador = document.getElementsByClassName("btn-ordenador");


function getNombre(indice) {
    var nombre_input_0 = document.getElementById("nombre").value;
    var nombre_input_1 = document.getElementById("nombre-input").value;
    var visu = document.getElementById("nombre-jugador");
    var popup_inicial = document.getElementById("popup-inicial")

    if(indice == 1)  {
        visu.innerHTML = nombre_input_1
        popup_inicial.style.display='none';
    }else{
        visu.innerHTML = nombre_input_0
    }

    resetearSeleccion();
    reiniciarJuego();
   
    
}

function resetearSeleccion(){
    for (var i = 0; i <= 4; i++) {
            botonesJugador[i].style.transform = "scale(1)"; 
            botonesOrdenador[i].style.transform = "scale(1)";// Imprime los números del 1 al 5 en la consola
    }

}

function resaltarSeleccion(seleccionJugador,seleccionOrdenador){
    botonesJugador[seleccionJugador].style.transform = "scale(1.5)";
    botonesOrdenador[seleccionOrdenador].style.transform = "scale(1.5)";
}


function jugar(seleccionJugador){

    var visu = document.getElementById("nombre-jugador");

    resetearSeleccion();
    seleccionOrdenador= Math.floor(Math.random() * 5);
    resultado = ganador(seleccionJugador,seleccionOrdenador);

    actualizarImagenes(seleccionJugador,seleccionOrdenador);
    actualizarMarcador(resultado);
    resaltarSeleccion(seleccionJugador,seleccionOrdenador);


    // Definimos el numero de intentos para fin partida

    if (marcadorJugador >= 3 && marcadorOrdenador<3 ){
        finPartida();
        sonido(victoria);
    }else if (marcadorOrdenador>=3 && marcadorJugador<3){
        finPartida();
        sonido(derrota);    
    }
    

}


function random(){
    const rndInt = Math.floor(Math.random() * 5) + 1
    return rndInt;
}

function actualizarImagenes(seleccionJugador,seleccionOrdenador){
    var visu_jugador = document.getElementById("imagen-visu-jugador");
    var visu_ordenador = document.getElementById("imagen-visu-ordenador");
    // Actualizamos segun seleccion del jugador
    if (seleccionJugador==0) {
        visu_jugador.src="images/piedra.png";
    }else if (seleccionJugador==1){
        visu_jugador.src="images/papel.png";
    }else if (seleccionJugador==2){
        visu_jugador.src="images/tijeras.png";
    }else if (seleccionJugador==3){
        visu_jugador.src="images/lagarto.png";
    }else if (seleccionJugador==4){
        visu_jugador.src="images/spoke.png";
    }else{
    }

    // Actualizamos segun seleccion del ordenador
    if (seleccionOrdenador==0) {
        visu_ordenador.src="images/piedra.png";
    }else if (seleccionOrdenador==1){
        visu_ordenador.src="images/papel.png";
    }else if (seleccionOrdenador==2){
        visu_ordenador.src="images/tijeras.png";
    }else if (seleccionOrdenador==3){
        visu_ordenador.src="images/lagarto.png";
    }else if (seleccionOrdenador==4){
        visu_ordenador.src="images/spoke.png";
    }else{
    }
}


function ganador(seleccionJugador,seleccionOrdenador){
                    // 0 Piedra / 1 Papel / 2 Tijeras / 3 Lagarto / 4 Spock
    // 0 Piedra           0         2           1           1           2
    // 1 Papel            1         0           2           2           1
    // 2 Tijeras          2         1           0           1           2   
    // 3 Lagarto          2         1           2           0           1
    // 4 Spock            1         2           1           2           0
    // Matriz de resultados segun enfrentamientos
    var matrix = [[0,2,1,1,2],[1,0,2,2,1],[2,1,0,1,2],[2,1,2,0,1],[1,2,1,2,0]];
    // Definimos un valor aleatorio del 0 al 4
    // Guardamos el resultado del enfrentamiento ( 0 es Empate / 1 es Ganaste / 2 Es Perdiste)
    resultado = (matrix[seleccionJugador][seleccionOrdenador]);  
    
    return resultado;
}


function sonido(id){
    if(id=='victoria'){
        let audio = new Audio("sounds/victoria.mp3");
        audio.play();
    }else if(id=='derrota'){
        let audio = new Audio("sounds/derrota.mp3");
        audio.play();
    }else if(id=='win'){
        let audio = new Audio("sounds/win.mp3");
        audio.play();
    }
    
}

function actualizarMarcador(resultado){
    var visuMarcadorJug = document.getElementById("marcador-jugador");
    var visuMarcadorOrd = document.getElementById("marcador-ordenador");
    var texto_resultado = document.getElementById("resultado");

    if (resultado == 0){
        texto_resultado.innerHTML ="Empate!"

    } else if (resultado == 1){
        texto_resultado.innerHTML ="Ganaste!";
        sonido('victoria');
        marcadorJugador++;
        console.log(marcadorJugador);
        visuMarcadorJug.textContent =marcadorJugador;
    } else if (resultado == 2){
        texto_resultado.innerHTML ="Perdiste!";
        sonido('derrota');
        marcadorOrdenador++;
        visuMarcadorOrd.textContent =marcadorOrdenador;
    }

}


function finPartida() {
    var modal = document.getElementById("popup");
    var texto_popup = document.getElementById("texto-popup");

    modal.style.display = "block";

    if (marcadorJugador >= 3 && marcadorOrdenador<3 ){
        texto_popup.innerHTML="Has Ganado! ¿Quieres volver a jugar?"
        sonido('win');
    }else if (marcadorOrdenador>=3 && marcadorJugador<3){
        texto_popup.innerHTML="Has Perdido! ¿Quieres volver a jugar?"  
        sonido('derrota');
    }
    
}

function reiniciarJuego(){
    var modal = document.getElementById("popup");
    var visuMarcadorJug = document.getElementById("marcador-jugador");
    var visuMarcadorOrd = document.getElementById("marcador-ordenador");

    modal.style.display = "none";
    marcadorJugador = 0;
    marcadorOrdenador= 0;
    visuMarcadorJug.textContent =marcadorJugador;
    visuMarcadorOrd.textContent =marcadorOrdenador;
    resetearSeleccion();
}

