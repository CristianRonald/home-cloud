class Menu {
  constructor() {
    this.crearCasita();
    newFile.onclick = () => upArchivo.classList.remove("oculto");
    cerrarAlerta.onclick = () => upArchivo.classList.add("oculto");
    newCarpeta.onclick = () => crearDir.classList.remove("oculto");
    cerrar.onclick = () => crearDir.classList.add("oculto");
  }
  async nuevaCarpeta() {
    const formData = new FormData();
    const dirName = dirUp.value;
    try {
      formData.append('directorio', dirName);
      const res = await fetch('/api/crear/carpeta', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log(data.msg);
      t.obtenerData("/");
    }
    catch (e) {
      console.log(e);
    }
  }
  async subirArchivo() {
    const formData = new FormData();
    const archivo = fileUpload.files[0];
    try {
      formData.append('archivo', archivo);
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      alert(data.msg);
      t.obtenerData("/");
    } catch (error) {
      console.log(error);
    }
  }
  async crearCasita() {
    const resp = await ((await fetch('/api/data/title')).json());
    dirMain.value = resp.message;
  }
}
class Tree {
  constructor() {
    this.cont = 0;
    path.value = '/';
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
      const p = document.createElement('p');
      p.innerText = elem.nombre;
      ar.appendChild(img);
      ar.appendChild(p);
      caja_tree.appendChild(ar);
    });
  }
  async obtenerData(path) {
    this.cont++;
    try {
      const respuesta = await ((await fetch('/api/tree' + path)).json());
      console.log(respuesta);
      if (respuesta.length === 0) {
        alert("No existe el path o no existe archivos");
        return;
      }
      const resp = await ((await fetch('/api/data/title')).json());
      if (this.cont === 1) dirMain.value = resp.message;
      arrow.style.display = '';
      if (resp.message === dirMain.value) arrow.style.display = 'none';
      title.innerText = resp.message;
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
const t = new Tree();
const m = new Menu();
/*path.addEventListener("keydown",(e)=>{
  if(e.keyCode === 13){
   t.obtenerData(path.value);
   path.value='/';
   e.preventDefault();
  }
});*/
arrow.onclick = () => {
}
crearDir.onclick = () => m.nuevaCarpeta();
upFile.onclick = () => m.subirArchivo();