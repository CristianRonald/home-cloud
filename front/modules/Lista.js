class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.atras = null;
    this.siguiente = null;
  }
}
export default class Lista {
  constructor() {
    this.cabeza = null;
  }
  getCabeza(){
    return this.cabeza.valor;
  }
  agregarNodo(valor) {
    if (!this.cabeza){ 
      const t = valor.titulo.split('/');
      this.cabeza = new Nodo(valor);
      this.cabeza.valor.path = t[t.length-1];
      return;
    }
    let nodoActual = this.cabeza;
    while (nodoActual.siguiente) nodoActual = nodoActual.siguiente;
    nodoActual.siguiente = new Nodo(valor);
    nodoActual.siguiente.atras = nodoActual;
  }
  encontrar(valor){
    let nodoActual = this.cabeza;
    do{
      console.log(nodoActual.valor,valor);
      if(nodoActual.valor.path === valor)return nodoActual;
      nodoActual = nodoActual.siguiente;
    }while(nodoActual);
  }
  remplazar(nodoInicial,nodoR){
    let nodoActual = this.cabeza;
    do{
      if(nodoInicial.valor === nodoActual.valor){
        nodoActual.siguiente = null;

      }
      nodoActual = nodoActual.siguiente;
    }while(nodoActual);
  }
  imprimir(){
    let nodoActual = this.cabeza;
    if(!nodoActual.siguiente) console.log(nodoActual);
    while (nodoActual.siguiente){
      nodoActual = nodoActual.siguiente;
    } 
  }
}