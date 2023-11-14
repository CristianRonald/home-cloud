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
  eliminarSiguiente(nodo){
    let nodoActual = this.cabeza;
    do{
      if(nodoActual === nodo){
          nodoActual.siguiente = null;
      }
      nodoActual = nodoActual.siguiente;
    }while(nodoActual);
  }
  agregarNodo(valor) {
    const t = valor.titulo.split('/');
    if (!this.cabeza){ 
      this.cabeza = new Nodo(valor);
      this.cabeza.valor.path = t[t.length-1];
      //this.fillEx(this.cabeza);
      return;
    }
    let nodoActual = this.cabeza;
    while (nodoActual.siguiente) nodoActual = nodoActual.siguiente;
    nodoActual.siguiente = new Nodo(valor);
    nodoActual.siguiente.valor.path = t[t.length-1];
    nodoActual.siguiente.atras = nodoActual;
    //this.fillEx(nodoActual.siguiente);
  }
  getPaths(){
    const arr=[];
    let nodoActual = this.cabeza;
    do{
      arr.push(nodoActual.valor.path);
      nodoActual = nodoActual.siguiente;
    }while(nodoActual);
    return arr;
  }
  encontrar(valor){
    let nodoActual = this.cabeza;
    do{
      if(nodoActual.valor.titulo === valor){
        console.log(nodoActual);
        return nodoActual;
      }
      nodoActual = nodoActual.siguiente;
    }while(nodoActual);
  }
  encontrarT(){
    let nodoActual = this.cabeza;
    do{
      if(nodoActual.valor.activo)  return nodoActual;
      nodoActual = nodoActual.siguiente;
    } while(nodoActual);
    return this.cabeza;
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
  fillEx(nodoP){
    let nodoActual = this.cabeza;
    do{
      if(nodoActual.valor === nodoP.valor){
        nodoActual.valor.activo = true;
      }  
      nodoActual.valor.activo = false;
      nodoActual = nodoActual.siguiente;
    }while (nodoActual); 
  }
}