//variaveis bolinha
let xBolinha = 300; 
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//variaveis raquete
let xRaquete = 20;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90; 
let colidiu = false; 

//variaveis placar 
let meusPontos = 0;
let pontosOponentes = 0;

//variaveis raquete inimiga
let xRaquete2 = 570;
let yRaquete2 = 150;
let velocidadeRaquete2;
let chanceDeErrar = 0;
let direcaoRaqueteOponente = 1;

//variaveis velocidade bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//função que seta o tamanho da tela
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//função que desenha na tela 
function draw() {
  background(135, 206, 250);
  desenhaBolinha();
  moveBolinha();
  ChecktouchEdges();
  bolinhaNaoBuga();
  desenhaRaquete(xRaquete, yRaquete, larguraRaquete, alturaRaquete);
  desenhaRaquete(xRaquete2, yRaquete2, larguraRaquete, alturaRaquete);
  movimentaRaquete();
  verificaColisao(xRaquete, yRaquete);
  desenhaRaquete();
  moveRaquete2();
  verificaColisao(xRaquete2, yRaquete2);
  mostraPlacar();
  marcaPontos();
}

function moveRaquete2(){
  const mediaYBolinha = yBolinha + raio;
  const mediaYRaquete2 = yRaquete2 + (alturaRaquete/2);

  if(mediaYBolinha > mediaYRaquete2){
    direcaoRaqueteOponente = 1;
  } else {
    direcaoRaqueteOponente = -1;
  }
  yRaquete2 += 5 * random(0.55, 0.95) * direcaoRaqueteOponente;
}

function moveBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function desenhaBolinha(){
  circle(xBolinha,yBolinha,diametro)
}

function ChecktouchEdges(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }

  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function desenhaRaquete(x, y, largura, altura){
  rect(x, y, largura, altura); 
}

function movimentaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete += -5;
  } else if(keyIsDown(DOWN_ARROW)){
    yRaquete += 5;
  }

  // if(keyIsDown(87)){
  //   yRaquete2 += -5;
  // } else if(keyIsDown(83)){
  //   yRaquete2 += 5;
  // }
}

function verificaColisao(x,y){
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio)
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function mostraPlacar(){
  stroke(0);
  textSize(16);
  textAlign(CENTER);
  fill(color(70,130,180));
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(70,130,180));
  rect(280, 10, 40,20);
  fill(255);
  text("X", 300, 26);
  fill(color(70,130,180));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosOponentes, 450, 26);
}

function marcaPontos(){
  if(xBolinha > 585){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 15){
    pontosOponentes += 1;
    ponto.play();
  }
}

function bolinhaNaoBuga(){
  if (xBolinha - raio <= 0){
    xBolinha = 23;
  } else if (xBolinha >= 588){
    xBolinha = width - 20;
  }
}