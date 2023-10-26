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
    async obtenerData(){
      try {
       const respuesta = await((await fetch('/api/tree')).json());
       this.crearDirectorios(
          respuesta.filter(elem=>elem.tipo==='directorio')
          );
      } catch (err) {
        console.log(err);       
      }
    }
  }
  new Tree().obtenerData();