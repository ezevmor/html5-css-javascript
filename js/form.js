/* se obtiene referencia al formulario y a sus imputs */
var form = document.getElementsByTagName('form');
var nameImput = form[0].elements.namedItem('nombre');
var emailInput = form[0].elements.namedItem('email');
var telephoneInput = form[0].elements.namedItem('numero');

var optionsList = document.getElementsByName('opcion');
var otherOptionInput = form[0].elements.namedItem('otro');

var inputOculto = document.getElementById('otro');
var messageInput = form[0].elements.namedItem('comentario');
var maxWordsNumber = 150;

var sendButton = document.getElementsByTagName('button');
var sendLabel = document.getElementById('send-label');

/* se crea el elemento icono de carga */
var loadingIcon = document.createElement('i');

/* metodo inicial  */
activate();


//////////////////

/* metodo inicial */
function activate(){

	/* se deshabilita el envio del formulario al pulsar el boton de enviar */
	form[0].addEventListener("submit", function(evt){
		evt.preventDefault();
	});

	/* se agregan clases al elemento icono de carga */
	loadingIcon.className = "fa fa-cog fa-spin fa-2x fa-fw";

	/* se agrega el evento onclick a cada uno de los radiobuttons */
	for(var i = 0; i<optionsList.length; i++){
		agregarOnclick(optionsList[i])
	};
}

/* metodo que agrega el evento onclick a un elemento */
function agregarOnclick(element){
	element.onclick = function(){
		if(element.value == 'opcion4'){
			inputOculto.className = '';
		}else{
			otherOptionInput.value = '';
			inputOculto.className = 'hidden';
		}
	}
};

/* metodo que simula el envio del formulario */
function enviar(){
	if(isNameValid() & isEmailValid() & isTelephoneValid() & isTextAreaValid()){
		removeElement(sendLabel);
		addElement(loadingIcon);
		sendButton[0].disabled = true;
		setTimeout(function(){
			removeElement(loadingIcon);
			addElement(sendLabel);
			sendButton[0].disabled = false;
			cleanInputs();
		}, 2000);
	}else{
		console.error("el formulario no esta completo")
	}
};

/* funcion que valida el input de nombre y lo marca en rojo si es invalido */
function isNameValid(){
	if(nameImput.value != ''){
		nameImput.className = '';
		return true;
	}else{
		nameImput.className = 'input-error';
		return false;
	};
};

/* funcion que valida el input de email y lo marca en rojo si es invalido */
function isEmailValid(){
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(emailInput.value)){
    	emailInput.className = '';
    	return true;
    }else{
    	emailInput.className = 'input-error';
    	return false;
    };
};

/* funcion que valida el input de numero de telefono y lo marca en rojo si es invalido */
function isTelephoneValid(){
	var re = /^[9|6]{1}([\d]{2}[-]*){3}[\d]{2}$/;
	if(re.test(telephoneInput.value)){
		telephoneInput.className = '';
		return true;
	}else{
		telephoneInput.className = 'input-error';
		return false;
	};
};

/* funcion que valida el input de mensaje */
function isTextAreaValid(){
	var re = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/;
	if(messageInput.value=='' ||  ( re.test(messageInput.value) && (isValidWordsNumber()) ) ){
		messageInput.className = '';
		return true;
	}else{
		messageInput.className = 'input-error';
		return false;
	};
};

/* funcion que  */
function isValidWordsNumber(){
	if(messageInput.value.match(/\S+/g).length>maxWordsNumber){
		return false;
	}else{
		return true;
	}
};

/* metodo que agrega un elemento hijo dentro del elemento boton */
function addElement(element){
	sendButton[0].appendChild(element);
};

/* metodo que elimina un elemento hijo dentro del elemento boton */
function removeElement(element){
	sendButton[0].removeChild(element);
};

/* metodo que limpia los valores de los imputs del formulario */
function cleanInputs(){
	nameImput.value = '';
	emailInput.value = '';
	telephoneInput.value = '';
	otherOptionInput.value = '';
	messageInput.value = '';
};