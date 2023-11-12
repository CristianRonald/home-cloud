import Lista from './Lista.js';
export default class Tree {
  constructor(l) {
    //findFile.value = '/';
    this.lista = new Lista();
    this.obtenerData("/");
  }
  crearDirectorios(directorios) {
    directorios.forEach(elem => {
      let dir = document.createElement('div');
      dir.ondblclick = () => {
        this.obtenerData("/" + dir.innerText);
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
  separarxBotones(titulo){
    const t = this.lista.getCabeza().titulo.split('/');
    const partes = titulo.split('/');
    indexP.innerHTML = '';
    for(let i=0;i<partes.length;i++){
      if(t[i] == partes[i] && i<t.length-1)continue;
      const btn = document.createElement('button');
      btn.innerText = partes[i];
      btn.onclick = ()=>{
        const obj = this.lista.encontrar(partes[i]);
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
      img.addEventListener("error",()=>{
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
      "path":path.split('/')[1]
    };
    try {
      const resp = await ((await fetch('/api/data/title')).json());
      if(title.innerText === '') title.innerText = resp.message.replace('\n',''); 
      if(path!='/') {
      title.innerText += path;
			title.innerText = title.innerText.replace('\n','');
      path = title.innerText.replace(/\//g,'+').replace(/\\/g,'+');
      path = "/"+path;
      }
      const respuesta = await ((await fetch('/api/tree'+path)).json());
      obj.titulo = title.innerText;
      obj.respuesta = respuesta;
      this.lista.agregarNodo(obj);
      this.separarxBotones(obj.titulo);
      dirFile.value = resp.message;
      caja_tree.innerHTML = '';
      this.crearDirectorios(
        respuesta.filter(elem => elem.tipo === 'directorio')
      );
      this.crearArchivos(
        respuesta.filter(elem => elem.tipo === 'archivo')
      );
    } catch (err) {
      console.log(err);
    }
  }
  actualizarTree(respuesta){
      caja_tree.innerHTML = '';
      this.crearDirectorios(
        respuesta.filter(elem => elem.tipo === 'directorio')
      );
      this.crearArchivos(
        respuesta.filter(elem => elem.tipo === 'archivo')
      );
  }
}
