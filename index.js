
const slider = ((sliderContainer) => {     
    
    // trae todas las imagenes del html
    let imgLista = sliderContainer.querySelectorAll('img'); 
    let posicionMax = imgLista.length - 1;    // me guarda cantidad de imagenes
    let posicion = 0;
    let indicador = document.createElement('div');  
    let tiempo_activado = true;
    let retroceder = false;
  
    
    // boton siguiente
    let botonSiguiente = document.createElement('button');  // creo el boton
    botonSiguiente.classList.add('next');    
    botonSiguiente.textContent = '>>>';
    botonSiguiente.addEventListener('click', () => {
      siguiente();
      retroceder = false;
    })
  

    //boton anterior
    let botonAnterior = document.createElement('button');
    botonAnterior.classList.add('prev');
    botonAnterior.textContent = '<<<';
    botonAnterior.addEventListener('click', () => {
      anterior();
      retroceder = true;
      tiempo_activado = true;

    })
  
    
    indicador.classList.add('indicator');
    imgLista.forEach((img, index) => {
      let div = document.createElement('div');
      div.addEventListener('click', () => {
        seleccionarImagen(index);
      })
      
      indicador.appendChild(div);
    });
  
    
    sliderContainer.appendChild(botonSiguiente);
    sliderContainer.appendChild(botonAnterior);
    sliderContainer.appendChild(indicador);
  


    sliderContainer.querySelectorAll('.indicator>*, button')
      .forEach((element) => {
        element.addEventListener('mouseover', () => {
          //tiempo_activado = false;
        });
        element.addEventListener('mouseleave', () => {
          tiempo_activado = true;
        });
      });
  

    function siguiente() {
      if (posicion + 1 > posicionMax) {
        posicion = 0;
      } else {
        posicion++;
      }
      seleccionarImagen(posicion);
    }



    function anterior() {
      if (posicion - 1 < 0) {
        posicion = posicionMax;
      } else {
        posicion--;
      }
      seleccionarImagen(posicion);
    }


    // Funcion que recibe la posicion y se las pasa a las dos funciones
    function seleccionarImagen(posicion) {
      alternarVista(posicion);
      alternarIndicador(posicion);
    }

    function alternarVista(posicion) {
      imgLista.forEach((img, indImg) => {
        if (indImg === posicion) {
          img.classList.add('visible');
        } else {
          img.classList.remove('visible');
        }
      });
    }
  
    function alternarIndicador(index) {
      Array.from(indicador.children).forEach((div, indexx) => {
        if (indexx === index) {
          div.classList.add('position');
        } else {
          div.classList.remove('position');
        }
      });
    }
  
  
    
    setInterval(   () => {  
    if(retroceder){
      slider.anterior()
    }else if (tiempo_activado) {
      slider.siguiente();     
    }
  
    },
    3000);
    seleccionarImagen(0);
    return { siguiente, anterior, seleccionarImagen };
  })(document.querySelector('.slider'));
  