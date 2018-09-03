export class Model {
  constructor(objeto?) {
      Object.assign(this, objeto);
  }
}
//classe configuracoes extendendo a classe Model
export class Configuracoes extends Model {
    palavra_tela: number;
    imagem: string;

}