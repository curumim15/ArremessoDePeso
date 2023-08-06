class Peso{

  constructor (px, py, dir, vel){
      // -- posição
      this.x; 
      this.y;

      // -- velocidade
      this.myvx;
      this.myvy;

      // -- diâmetro
      this.diam = 58;

      // -- imagem do peso
      this.peso = loadImage("media/peso4.png");

      // -- posicionar
      this.x = px;
      this.y = py;

      // -- calcular as componentes da velocidade e direção
      this.myvx = vel * cos (dir);
      this.myvy = vel * sin  (dir);

  }

  // -- movePeso
  movePeso(){
      this.x += this.myvx;
      this.y += this.myvy;

      imageMode (CENTER);
      image (this.peso, this.x, this.y);
      imageMode (CORNER);

      // -- verificar se saiu fora do canvas
      if ( this.x > width || this.x < 0 || this.y > height || this.y < 0) {

          // -- remover o peso
          this.eliminaPeso();
      }
  }

  // -- eliminaPeso
  eliminaPeso() {

      // -- esta função estará na class principal
      // -- remover o objeto (peso) do array de pesos
      removePeso(this);
  }
}