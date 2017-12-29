
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
//NAVE
var y = 15; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
var aterrizado = false;

//al cargar por completo la página...
window.onload = function(){

	//Paneles de la derecha (PC)
	document.getElementById("Pausa").onclick=function(){Pausa();}
	document.getElementById("Jugar").onclick=function(){Jugar();}
	document.getElementById("reinicio").onclick=function(){reinicio();}


	//Paneles de la derecha (movil)

	//Fin de partida.

	//Funciones de velocidad, combustible y altura.
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("combustible");

	
	//definición de eventos

	
	//Asignación de la función del boton (con raton).
	document.getElementById("boton").onmousedown=function(){motorOn();}
	document.getElementById("boton").onmouseup=function(){motorOff();}	
	
	//Asignación de la función del boton (con tactil)
	document.getElementById("boton").ontouchstart=function(){motorOn();}
	document.getElementById("boton").ontouchend=function(){motorOff();}

	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else {
		stop();
		alert("Nave aterrizada")
	}
}
function motorOn(){
	//el motor da aceleración a la nave
	if (aterrizado){
		motorOff();
	} else {
	a=-g;
	//mientras el motor esté activado gasta combustible
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
	document.getElementById("imgnaveon").style.display="block";
	}
}
//Funcion que la nave apague el motor

function motorOff(){
	a=g;
	document.getElementById("imgnaveon").style.display="none";
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ) c = 0;
}

//función de info//

//Resetear el juego//
function reinicio(){
	y = 15;
	v = 0;
	g = 1.622;
	a = g;
	dt = 0.016683;
}
//función de pausa//
function Pausa(){
	stop();
	document.getElementById("Pausa").style.display="none";
	document.getElementById("Jugar").style.display="inline-block";
}

//función de continuar//
function Jugar(){
	start();
	document.getElementById("Jugar").style.display="none";
	document.getElementById("Pausa").style.display="inline-block";
}
