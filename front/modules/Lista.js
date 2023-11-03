class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}
export default class Lista {
  constructor() {
    this.cabeza = null;
  }
  agregarNodo(valor) {
    if (!this.cabeza){ 
      this.cabeza = new Nodo(valor);
      return;
    }
    let nodoActual = this.cabeza;
    while (nodoActual.siguiente) nodoActual = nodoActual.siguiente;
    nodoActual = new Nodo(valor);
  }
  encontrar(valor){
    let nodoActual = this.cabeza;
    if(!nodoActual.siguiente && nodoActual.path === valor) console.log(nodoActual);
    while (nodoActual.siguiente){
      if(nodoActual.path === valor) console.log(nodoActual);
      nodoActual = nodoActual.siguiente;
    }
  }
  imprimir(){
    let nodoActual = this.cabeza;
    if(!nodoActual.siguiente) console.log(nodoActual);
    while (nodoActual.siguiente){
      nodoActual = nodoActual.siguiente;
    } 
  }
}