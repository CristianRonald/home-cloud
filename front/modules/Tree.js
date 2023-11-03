import Lista from './Lista.js';
export default class Tree {
  constructor() {
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
  retornarPath(){
    let t = title.innerText;
    t = t.slice(0,t.lastIndexOf('/'));
    if(t === dirFile.value){
        this.lista.encontrar('/');
        return;
    }
    t = t.slice(t.lastIndexOf('/'));
    this.lista.encontrar(t); 
  }
  async obtenerData(path) {
    try {
      const resp = await ((await fetch('/api/data/title')).json());
      if(title.innerText === '') title.innerText = resp.message; 
      if(path!='/') {
      title.innerText += path;
      path = title.innerText.replace(/\//g,'+').replace(/\\/g,'+');
      path = "/"+path;
      }
      const respuesta = await ((await fetch('/api/tree'+path)).json());
      this.lista.agregarNodo({
        "valor": respuesta,
        "path": path,
        "title": title.innerText
      });
      arrow.style.display='';
      if(title.innerText === dirFile.value) arrow.style.display = 'none';
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
}