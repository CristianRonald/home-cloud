import Lista from './Lista.js';
export default class Tree {
  constructor(l) {
    //findFile.value = '/';
    this.titulo = '';
    this.lista = new Lista();
    this.obtenerData("/");
  }
  crearDirectorios(directorios) {
    directorios.forEach(elem => {
      let dir = document.createElement('div');
      dir.ondblclick = () => {
        this.obtenerData("/" + dir.innerText);
        const node = this.lista.encontrar(this.titulo+'/');
        this.lista.fillEx(node);
        if(node.siguiente && node.atras){
          this.titulo = node.atras.valor.titulo;
          this.lista.eliminarSiguiente(node);
        } 
        this.separarxBotones(this.titulo);
        //path.value='/';
      };
      dir.className = 'square';
      const img = document.createElement('img');
      img.src = './images/folder.png'
      const p = document.createElement('p');
      p.innerText = elem.nombre;
      dir.appendChild(img);
      dir.appendChild(p);
      caja_tree.appendChild(dir);
    });
  }
  separarxBotones(titulo) {
    //const t = this.lista.getCabeza().titulo.split('/');
    //const partes = titulo.split('/');
    const partes = this.lista.getPaths();
    indexP.innerHTML = '';
    for (let i = 0; i < partes.length; i++) {
      //if (t[i] == partes[i] && i < t.length - 1) continue;
      const btn = document.createElement('button');
      btn.innerText = partes[i];
      btn.onclick = () => {
        btn.style.cssText = `
          background-color:#c56b3b;
        `;
        const obj = this.lista.encontrar(titulo);
        this.actualizarTree(obj.valor.respuesta);
      };
      indexP.append(btn);
    }
  }
  crearArchivos(archivos) {
    archivos.forEach(elem => {
      let ar = document.createElement('div');
      ar.className = 'square';
      const img = document.createElement('img');
      img.src = './images/' + elem.extension;
      img.addEventListener("error", () => {
        img.src = './images/regular.png';
      });
      const p = document.createElement('p');
      p.innerText = elem.nombre;
      ar.appendChild(img);
      ar.appendChild(p);
      caja_tree.appendChild(ar);
    });
  }
  async obtenerData(path) {
    const obj = {
      "path": path.split('/')[1]
    };
    try {
      const resp = await ((await fetch('/api/data/title')).json());
      if (this.titulo === '') this.titulo = resp.message.replace('\n', '');
      if (path != '/' ) {
        this.titulo += path;
        this.titulo = this.titulo.replace('\n', '');
        path = this.titulo.replace(/\//g, '+').replace(/\\/g, '+');
        path = "/" + path;
      }
      const respuesta = await ((await fetch('/api/tree' + path)).json());
      obj.titulo = this.titulo;
      obj.respuesta = respuesta;
      this.lista.agregarNodo(obj);
      dirFile.value = resp.message;
      this.actualizarTree(respuesta);
    } catch (err) {
      console.log(err);
    }
  }
  actualizarTree(respuesta) {
    this.separarxBotones(this.titulo);
    caja_tree.innerHTML = '';
    this.crearDirectorios(
      respuesta.filter(elem => elem.tipo === 'directorio')
    );
    this.crearArchivos(
      respuesta.filter(elem => elem.tipo === 'archivo')
    );
  }
  getTitle(){
    return this.titulo;
  }
}
