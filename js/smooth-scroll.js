/* se obtiene referencia a los enlaces de navegacion */
var navItemList = document.getElementsByClassName('navbar-item');
var offsetQuienSoy = cumulativeOffset(document.getElementById('quien-soy')) - 50;
var offsetExperiencia = cumulativeOffset(document.getElementById('experiencia')) - 50;
var offsetSobreMi = cumulativeOffset(document.getElementById('sobre-mi')) - 50;

/* metodo inicial */
activate();

//////////////////

/* metodo inicial */
function activate(){
  /* se crea el evento de escucha de scroll */
  window.addEventListener('scroll', changeMenuStyle);

  /* se agrega el evento de escucha de click de cada enlace de la barra de navegacion */
  for(var i=0; i<navItemList.length; i++){
    navItemList[i].addEventListener('click',function(evt){
      removeAllActives();
      this.children[0].className = "active";
      var sectionToGo = this.getElementsByTagName('a')[0].href.split('#');

      if(sectionToGo.length > 1) {
        evt.preventDefault();
        var goTo = sectionToGo[sectionToGo.length - 1];
        getElementByIdAndScroll(goTo);
      }

    });
  };
};

/* metodo que obtiene la referencia a la seccion a navegar */
function getElementByIdAndScroll(name) {
  var elem;
  if (name == '') {
    elem = document.getElementById('header');
  } else {
    elem = document.getElementById(name);
  }
  scrollToElement(elem);
};

/* metodo que posiciona la pantalla hasta la seccion elegida */
function scrollToElement(element) {
  var jump = parseInt(element.getBoundingClientRect().top * .3);
  document.body.scrollTop += jump;
  document.documentElement.scrollTop += jump;

  if (!element.lastJump || element.lastJump > Math.abs(jump)) {
    element.lastJump = Math.abs(jump);

    setTimeout(function() {
      scrollToElement(element);
    }, 40);

  } else {
    element.lastJump = null;
  }
};

/**/
function cumulativeOffset(element) {
  var top = 0;
    do {
        top += element.offsetTop  || 0;
        element = element.offsetParent;
    } while(element);

    return top;
};

/* metodo que cambia el estilo del enlace de navegacion segun la posicion de la pagina en el navegador */
function changeMenuStyle(evt){
  var previous;

  if (window.pageYOffset >= 0 && window.pageYOffset < offsetQuienSoy) {
    if(!previous) {
      previous = 1;
    } else if (previous == 1) {
      return false;
    }
    removeAllActives();
    document.querySelector('a[href="#"]').className = "active";
  } else if (window.pageYOffset >= offsetQuienSoy && window.pageYOffset < offsetExperiencia){
    if(!previous) {
      previous = 2;
    } else if (previous == 2) {
      return false;
    }
    removeAllActives();
    document.querySelector('a[href$="quien-soy"]').className = "active";
  } else if (window.pageYOffset >= offsetExperiencia && window.pageYOffset < offsetSobreMi){
    if(!previous) {
      previous = 3;
    } else if (previous == 3) {
      return false;
    }
    removeAllActives();
    document.querySelector('a[href$="experiencia"]').className = "active";
  } else if (window.pageYOffset >= offsetSobreMi){
    if(!previous) {
      previous = 4;
    } else if (previous == 4) {
      return false;
    }
    removeAllActives();
    document.querySelector('a[href$="sobre-mi"]').className = "active";
  }
};

/* metodo que quita la clase active a todos los elementos de la barra de navegacion */
function removeAllActives(){
  for(var i=0; i<navItemList.length; i++){
    navItemList[i].children[0].className = '';
  }
};