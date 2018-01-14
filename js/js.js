
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
//NAVE
var y = 0; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var dificultad = 1;
var combustible = null;
var aterrizado = false;

//al cargar por completo la página...
window.onload = function(){

	//Paneles de la derecha (PC)
	document.getElementById("Pausa").onclick=function(){Pausa();}
	document.getElementById("Jugar").onclick=function(){Jugar();}
	document.getElementById("reinicio").onclick=function(){reinicio();}
	document.getElementById("conf").onclick=function(){configuracion();}
	document.getElementById("finalizar").onclick=function(){quitar();}

	//Paneles de la derecha (movil)
	document.getElementById("PausaMovil").onclick=function(){mostrarMenu();}
	document.getElementById("JugarMovil").onclick=function(){jugarMovil();}
	document.getElementById("reinicioMovil").onclick=function(){reinicio();}
	document.getElementById("confMovil").onclick=function(){configuracion();}
	document.getElementById("finalizarMovil").onclick=function(){quitarMovil();}

	//Funciones de velocidad, combustible y altura.
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("combustible");
	
	//Asignación de la función del boton (con raton).
	document.getElementById("boton").onmousedown=function(){motorOn();}
	document.getElementById("boton").onmouseup=function(){motorOff();}	
	
	//Asignación de la función del boton (con tactil)
	document.getElementById("boton").ontouchstart=function(){motorOn();}
	document.getElementById("boton").ontouchend=function(){motorOff();}

	//cambios de niveles
	document.getElementById("dificultad").onclick = function cambioDeNivel(){
		switch(dificultad){
			case 1:
				v = 0;
				document.getElementById("dificultad").innerHTML="Profesional";
				dificultad=2;
				reinicio();
				Pausa();
				break;
			case 2:
				v = 5;
				document.getElementById("dificultad").innerHTML="Basica";
				dificultad=1;
				reinicio();
				Pausa();
				break;
		}
	}
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
	document.getElementById("velocidad").innerHTML=v.toFixed(2);
	y +=v*dt;
	document.getElementById("altura").innerHTML=y.toFixed(2);
	//actualizar marcadores
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else {
		stop();
		Fin();
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
//Mostrar el menu a través del movil.
function mostrarMenu(){
	Pausa();
	document.getElementById("PausaMovil").style.display="none";
	document.getElementById("boton").style.display="none";
	document.getElementById("JugarMovil").style.display="inline-block";
	document.getElementById("reinicioMovil").style.display="inline-block";
	document.getElementById("plantilla").style.display="inline-block";
	document.getElementById("guiaMovil").style.display="inline-block";
	document.getElementById("confMovil").style.display="inline-block";
} 

function jugarMovil(){
	start();
	document.getElementById("PausaMovil").style.display="inline-block";
	document.getElementById("boton").style.display="inline-block";
	document.getElementById("JugarMovil").style.display="none";
	document.getElementById("reinicioMovil").style.display="none";
	document.getElementById("plantilla").style.display="none";
	document.getElementById("guiaMovil").style.display="none";
	document.getElementById("confMovil").style.display="none";
} 

//configuración (Seleccion de nivel)
function configuracion(){
	Pausa();
	document.getElementById("ajustes").style.display="inline-block";
	
}
//Funcion de Movil para quitar la ventana 
function quitar(){
	reinicio();
	document.getElementById("ajustes").style.display="none";
}
//Funcion de Movil para quitar la ventana 
function quitarMovil(){
	document.getElementById("ajustes").style.display="none";
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
	if (c < 0 ){
		c = 0;
		motorOff();
	}
	document.getElementById("combustible").innerHTML=c.toFixed();
}
//Resetear el juego//
function reinicio(){
	c = 100;
	y = 0;
	v = 0;
	g = 1.622;
	a = g;
	dt = 0.016683;
	document.getElementById("imgnave").src = "img/nave.png";
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

//Finalizar el juego
function Fin(){
	if (dificultad == 1){
		basico();
	}else{
		profesional();
	}

}

//Mensaje del de game over
function gameOver(){
	document.getElementById("imgnave").src = "img/explosion.gif";
	var r = confirm("La misión ha sido un fracaso. Todos los tripulantes están muertos. ¿Quieres volver a empezar?");
	if (r == true){
		reinicio();
		start();
	} 
}

//dificultad del juego final
function basico(){
	if(v > 5) {
		gameOver();
	} else {
		alert("¡ENHORABUENA! La nave está aterrizada. Sanos y salvos");
		reinicio();
		start();
	}
}

function profesional(){
	if(v > 2.5) {
		gameOver();
	} else {
		alert("¡ENHORABUENA! La nave está aterrizada. Sanos y salvos");
		reinicio();
		start();
	}
}