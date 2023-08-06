class Obstaculo{

  constructor (px, py){
    this.x = px;
    this.y = py;
    this.altura = 5;
    this.largura = 50;
  }

  // -- Função desenhaObstaculo()
  desenhaObstaculo(){

    noStroke();
    fill (186, 186, 186);

    rect (this.x, this.y, this.altura, this.largura);

  }

}