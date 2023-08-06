// -- Cor do fundo
let corFundo; 

let jogador;
let ponto;

// -- input de audio
let input;

// -- posição do Jogador
let posX;
let posY;


// -- Diferença para o centro (jogador)
let difCentro = 38;

// -- array dos Pesos
let osPesos = [];

// -- Número de pesos
let numPesos = 3;

// -- array de Obstaculos
let osObstaculos = [];

// -- Controlo do fim do jogo
let ganhou = false;

// -- número inicial de obstaculos
let numObstaculos = 5;

// -- pontuação
let pontuacao;

// -- Controlo das vidas
let perdeu = false;

// -- Número de vidas
let numVidas = 5;

// -- Dois ficheiros de áudio (.mp3, .wav)
let somColisaoPeso, somFundo;


// -- preload
function preload(){

  // -- o áudio deverá ser pré-carregado para depois ser ativado
  soundFormats('mp3', 'wav', 'ogg');
  somFundo = loadSound ("media/OlympicSong.mp3");
  musica = loadSound ("media/touch.mp3");

}

// -- setup()
function setup(){
  createCanvas(900,500);
  smooth();
  frameRate(30);

    // -- criar um Audio input
    input = new p5.AudioIn();
    input.start();

  corFundo = color(0, 121, 107);

  carregaMedia();

  initJogo();
  initObstaculo()

  somFundo.loop();

}

// -- initJogo()
function initJogo(){
  textAlign(LEFT);
  
      posX = width / 2 - difCentro;
      posY = height / 2 - difCentro;
  
      // -- esvaziar o arrays de Pesos
      esvaziaPesos();
  
      ganhou = false;
      numVidas = 5;
  
  }
  
// -- draw()
function draw(){
  background(corFundo);

   // -- Obter o volume
   let volume = input.getLevel();

     // -- Se o volume > 0.5, atira um peso
  let threshold = 0.2;

  if (osPesos == 0){

    if ( volume > threshold){

      var dx = mouseX - posX - difCentro;
      var dy = mouseY - posY -difCentro;
      
      var ang = atan2(dy, dx);
    
      b = new Peso (90, 250, ang, 10);  // (posX + difCentro, posY + difCentro, ang, 10)   <- Posição inicial
      osPesos.push(b);
    }

  }

  fill(212, 139, 4);            
  rect (0, 0, 150, 500);         // Coordenadas do Retângulo Laranja

  fill(186, 186, 186);           
  rect (0, 187, 150, 125);       // Coordenadas Retângulo cinzento

  fill(255); 
  ellipse (86, 250, 125, 125);   // Circulo para Área de lançamento

  if ( ganhou == false ) {

      push();
      desenhaJogador();
      pop();

      desenhaPonto();

      desenhaTexto();           // Tentativas

      movimentaPesos();

      aparecerObstaculos()

  } else {

    fill(0);                        // É a mesma coisa que apenas fill(255, 255, 255)
    text("Acertou", 40, 20);

      // -- Ganhou
      esvaziaPesos();

      textAlign(CENTER);
      text("Parabéns, conseguiu alcançar um obstáculo !", width/2, height/2);
      text("Pressione uma tecla para jogar novamente.", width/2, height/2 + 50);

  }

  perdeuJogo();

}

// -- perderJogo()
function perdeuJogo(){

  if (numVidas == 0){

    text("Falhou todos os obstáculos !", width/2, height/2);
    text("Pressione uma tecla para jogar novamente.", width/2, height/2 + 50);
    perdeu = true;
    esvaziaPesos();
    numVidas = 5;
    noLoop();

  }

}

// -- carregaMedia()
function carregaMedia(){

  jogador = loadImage("media/jogador2.png");
  ponto = loadImage("media/ponto3.png");
  noCursor();

}

// -- desenhaJogador()
function desenhaJogador(){

  image (jogador, 5, 183);

}

// -- desenhaTexto()
function desenhaTexto(){

  fill(0);
  text("Nelson | 23806 | ECGM", 10, 480)

  fill(0);
  text ("Nº de Vidas = " + numVidas, 10, 40)

  // fill(0);                        // É a mesma coisa que apenas fill(0, 0, 0)
  // text("Jogada : ", 10, 20);
  
  // text(osPesos[0], 60, 20);

  // fill(0);                        // É a mesma coisa que apenas fill(0, 0, 0)
  // text("Tentativas : ", 10, 40);
  // text(osPesos[5], 60, 40);

  // fill(0);                        // É a mesma coisa que apenas fill(0, 0, 0)
  // text("Tentativas : ", 10, 60);
  // text(osPesos[6], 60, 60);
  
}

// -- desenhaPonto()
function desenhaPonto(){

  imageMode (CENTER);
  image(ponto, mouseX, mouseY);  // Ou podiamos fazer image (ponto, mouseX - (coordenada), mouseY - (coordenada));
  imageMode (CORNER);

}

// -- movimentaPesos
function movimentaPesos(){

  // -- desenha os pesos
  if ( osPesos.length > 0 ) {
      for ( let i = 0; i < osPesos.length; i++){
          oPeso = osPesos[i];
          oPeso.movePeso();
      }

          if(osObstaculos.length > 0){

            for(let k = 0; k < osObstaculos.length; k++){
              oObstaculos = osObstaculos[k];

            // -- Chama a função de colisão entre 2 circulos 
            if ( rectBall( oObstaculos.x, oObstaculos.y, oObstaculos.largura, oObstaculos.altura, oPeso.x, oPeso.y, oPeso.diam) ){
              console.log("OkOk");          // Consultar na consola caso exista colisão
              oPeso.x = oObstaculos.x; 
              oPeso.y = oObstaculos.y;

              musica.play();

               // -- Ganhou
                esvaziaPesos();
                ganhou = true;

            }
          }
        }
  }
}

// -- removePeso
function removePeso(obj){

  var index = osPesos.indexOf(obj);
  if ( index > -1 ) {
      osPesos.splice(index, 1);
      numVidas --;
  }

}

// -- esvaziaPesos()
function esvaziaPesos(){

  for( var k = 0; k < osPesos.length; k++){

      oPeso = osPesos[k];
      removePeso(oPeso);
  }

}

// -- initObstaculo()
function initObstaculo(){

    for ( var i = 0; i < numObstaculos; i++){

      let posX = [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850];
      let posY = [100, 150, 200, 250, 300, 350, 400];
      let posxX = random(posX);
      let posyY = random(posY);

        obstaculo = new Obstaculo(posxX, posyY);
        osObstaculos.push(obstaculo);            // -- push serve para colocar os objetos dentro do array

    }
}

// -- aparecerObstaculos
function aparecerObstaculos(){

  // -- desenha os obstaculos
  if ( osObstaculos.length > 0 ) {
      for ( let i = 0; i < osObstaculos.length; i++){
          oObstaculos = osObstaculos[i];
          oObstaculos.desenhaObstaculo();

        }
      }

}

// -- keyPressed()
function keyPressed(){

  if (ganhou == true){
      initJogo();
  }

  if (perdeu == true){

    perdeu = false;
    loop();
  }

}



