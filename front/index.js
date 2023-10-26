  class Tree{
    crearDirectorios(directorios){
      directorios.forEach(elem => {
      let dir = document.createElement('div');
      dir.className = 'square';
      const img = document.createElement('img');
      img.src = './images/folder.png'
      const label = document.createElement('label');
      label.innerText = elem.nombre;
      dir.appendChild(img);
      dir.appendChild(label);
      caja_tree.appendChild(dir);
      });
    }
    crearArchivos(archivos){
      archivos.forEach(elem => {
      let ar = document.createElement('div');
      ar.className = 'square';
      const img = document.createElement('img');
      img.src = './images/file.png'
      const label = document.createElement('label');
      label.innerText = elem.nombre;
      ar.appendChild(img);
      ar.appendChild(label);
      caja_tree.appendChild(ar);
      });
    }
    async obtenerData(){
      try {
       const respuesta = await((await fetch('/api/tree')).json());
       this.crearDirectorios(
          respuesta.filter(elem=>elem.tipo==='directorio')
          );
       this.crearArchivos(
          respuesta.filter(elem=>elem.tipo==='archivo')
          );
      } catch (err) {
        console.log(err);       
      }
    }
  }
  new Tree().obtenerData();