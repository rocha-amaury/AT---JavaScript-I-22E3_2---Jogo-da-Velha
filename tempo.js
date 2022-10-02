let horas = 0, minutos = 0, segundos = 0, millisegundos = 0, intervalo

function formataTempo(input) {return input > 9 ? input : `0${input}`;}

function contador() {

  if((millisegundos += 1) == 99) {
    millisegundos = 0; 
    segundos++; 
  }
  if (segundos == 60) {
    segundos = 0; 
    minutos++;  
  }
  if (minutos == 60) {
    minutos = 0;
    horas = horas++;
  }

  document.getElementById('hora').innerText = formataTempo(horas);
  document.getElementById('minuto').innerText = formataTempo(minutos);
  document.getElementById('segundo').innerText = formataTempo(segundos);
  document.getElementById('millisegundo').innerText = formataTempo(millisegundos);
}

iniciaCronometro()

function iniciaCronometro() {
  intervalo = setInterval(contador, 10);  
}

function resetaCronometro() {
    clearInterval(intervalo);

    horas = 0;
    minutos = 0;
    segundos = 0;
    millisegundos = 0;
  
    document.getElementById('hora').innerText = "00";
    document.getElementById('minuto').innerText = "00";
    document.getElementById('segundo').innerText = "00";
    document.getElementById('millisegundo').innerText = "00";
    iniciaCronometro()
}

function paraCronometro() {
  clearInterval(contador);
  // alteraMelhorTempo();
  comparaTempo();
}

function alteraMelhorTempo() {
    document.getElementById('melhorHora').innerText = formataTempo(horas);
    document.getElementById('melhorMinuto').innerText = formataTempo(minutos);
    document.getElementById('melhorSegundo').innerText = formataTempo(segundos);
    document.getElementById('melhorMillisegundo').innerText = formataTempo(millisegundos);
}

function comparaTempo() {

  melhorTempo = converteMillisegundos(+document.getElementById('melhorHora').innerText, 
                                     +document.getElementById('melhorMinuto').innerText, 
                                     +document.getElementById('melhorSegundo').innerText,
                                     +document.getElementById('melhorMillisegundo').innerText);
  
  tempoAtual = converteMillisegundos(horas, minutos, segundos, millisegundos);
  if (tempoAtual < melhorTempo || melhorTempo === 0) {
    alteraMelhorTempo()
  }
}

function converteMillisegundos(horas, minutos, segundos, millisegundos) {
    
    horaParaMillisegundos = horas * 3600000
    minutoParaMillisegundos = minutos * 60000;
    segundoParaMillisegundos = segundos * 1000;

    totalMillisegundos = 0
    totalMillisegundos = horaParaMillisegundos + minutoParaMillisegundos + segundoParaMillisegundos + millisegundos
    return totalMillisegundos;  
}
  



