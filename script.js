let jogador, vencedor = null; contJogadas = 0; numPontos = 0; 
let jogadorAtual = document.getElementById('sJogadorDaVez');
let vencedorAtual = document.getElementById('sVencedor');
let numVitoriasX = document.getElementById('numVitoriasX');
let numVitoriasO = document.getElementById('numVitoriasO');
let jogoLiberado = true;

// let casa1 = document.getElementById('casa1');
// let casa2 = document.getElementById('casa2');
// let casa3 = document.getElementById('casa3');
// let casa4 = document.getElementById('casa4');
// let casa5 = document.getElementById('casa5');
// let casa6 = document.getElementById('casa6');
// let casa7 = document.getElementById('casa7');
// let casa8 = document.getElementById('casa8');
// let casa9 = document.getElementById('casa9');

sortJogador();

function sortJogador() {
    if (Math.ceil(Math.random() * 2) == 1)
        atualizaJogador('X'); else
        atualizaJogador('O');
}

function resetJogo() {
  vencedor = null;
  vencedorAtual.innerHTML = '';
  contJogadas = 0;
  jogoLiberado = true;
  for (let i = 1; i <= 9; i++) {
    let casa = document.getElementById('casa' + i);
    casa.innerHTML = '';
    casa.style.background = 'cadetblue';
  }
  sortJogador()
  resetaCronometro();
}

function atualizaJogador(proximoJogador) {
  jogador = proximoJogador;
  jogadorAtual.innerHTML = jogador;
}

function atualizaVencedor(vencedor) {
  if (vencedor!=='Empate') {
    vencedorAtual.innerHTML='Jogador '+vencedor;
    comparaTempo();
  } else{vencedorAtual.innerHTML=vencedor;}      
  jogoLiberado = false;
  if (contJogadas <= 5) numPontos = 2; else numPontos = 1;    
  switch (vencedor) {
    case 'X': numVitoriasX.innerHTML = +numVitoriasX.innerHTML + numPontos; break;
    case 'O': numVitoriasO.innerHTML = +numVitoriasO.innerHTML + numPontos; break;
  }  
  resetaCronometro();
}
 
function validaJogada(casa) {
  if (casa.innerHTML === 'X' || casa.innerHTML === 'O' || !jogoLiberado) {
    return false;
  }
  return true;
}

function selecionarCasa(event, numCasa){
  if (jogoLiberado) {
    const elemento = event.currentTarget;
    const id = elemento.id;
    // alert('Casa selecionada: ' + id.replace("casa", ""));
    casa = document.getElementById(id)
    if (validaJogada(casa)) {
      casa.innerHTML = jogador;
      if (jogador === 'X') atualizaJogador('O'); else atualizaJogador('X'); 
      contJogadas++;
      if (contJogadas >= 4) checkResultado();  
    }  
  }
}

function marcarCasas(casa1, casa2, casa3) {
  // console.log("mudarCorQuadrado" + casa1.id)
  casa1.style.background = 'steelblue';
  casa2.style.background = 'steelblue';
  casa3.style.background = 'steelblue';
}

function checkResultado(){
  checkLinhas()
  checkColunas()
  checkDiagonais()
  checkEmpate()
}

function defineResultado(resp, casa1, casa2, casa3) {
  switch (resp) {
      case 'XXX': vencedor = 'X'; marcarCasas(casa1, casa2, casa3); break;
      case 'OOO': vencedor = 'O'; marcarCasas(casa1, casa2, casa3); break;
      default: vencedor = null;
  }
  if (vencedor !== null) {
      atualizaVencedor(vencedor);
      console.log(vencedor);
  }
}

function checkLinhas() {
   
  for(let i = 1; i <= 7; i += 3) {
    let resp1 = document.getElementById('casa' + i);
    let resp2 = document.getElementById('casa' + (i + 1).toString());
    let resp3 = document.getElementById('casa' + (i + 2).toString());   
    
    let resp = ""
    resp = resp1.innerHTML + resp2.innerHTML + resp3.innerHTML;
    defineResultado(resp, resp1, resp2, resp3);
  }
}

function checkColunas() {
  
  for(let i = 1; i <= 3; i += 1) {
    let resp1 = document.getElementById('casa' + i);
    let resp2 = document.getElementById('casa' + (i + 3).toString());
    let resp3 = document.getElementById('casa' + (i + 6).toString());
    
    let resp = ""
    resp = resp1.innerHTML + resp2.innerHTML + resp3.innerHTML
    defineResultado(resp, resp1, resp2, resp3);
  }
}

function checkDiagonais() {
  
  let respCasa1 = document.getElementById('casa1');
  let respCasa5 = document.getElementById('casa5');
  let respCasa9 = document.getElementById('casa9');
  let respCasa3 = document.getElementById('casa3');
  let respCasa7 = document.getElementById('casa7');

  let respDiagonal1 = null;
  let respDiagonal2 = null;  
  respDiagonal1 = respCasa1.innerHTML + respCasa5.innerHTML + respCasa9.innerHTML
  respDiagonal2 = respCasa3.innerHTML + respCasa5.innerHTML + respCasa7.innerHTML
  
  if (jogoLiberado) defineResultado(respDiagonal1, respCasa1, respCasa5, respCasa9);
  if (jogoLiberado) defineResultado(respDiagonal2, respCasa3, respCasa5, respCasa7);
}

function checkEmpate(){
  // console.log(vencedor);
  // console.log(contJogadas);
  
  if (contJogadas === 9 && vencedor === null) {
    vencedor = 'Empate';
    atualizaVencedor(vencedor);    
  }
}








