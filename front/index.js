
  class Tree{
    async getTitle(){
    }
    crearDirectorios(directorios){
      directorios.forEach(elem => {
      let dir = document.createElement('div');
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
    crearArchivos(archivos){
      archivos.forEach(elem => {
      let ar = document.createElement('div');
      ar.className = 'square';
      const img = document.createElement('img');
      img.src = './images/file.png'
      const p = document.createElement('p');
      p.innerText = elem.nombre;
      ar.appendChild(img);
      ar.appendChild(p);
      caja_tree.appendChild(ar);
      });
    }
    async obtenerData(path){
      try {
       const respuesta = await((await fetch('/api/tree'+path)).json());
       const resp = await((await fetch('/api/data/title')).json());
      console.log(resp);
      title.innerText = resp.message;
      caja_tree.innerHTML = '';
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
  const t = new Tree();
  path.value='/';
  t.obtenerData("/");
  path.addEventListener("keydown",(e)=>{
    if(e.keyCode === 13){
     t.obtenerData(path.value);
     path.value='/';
     e.preventDefault();
    }
  });
  upFile.onclick=async ()=>{
    const formData = new FormData();
    const archivo = fileUpload.files[0];
    try {
    formData.append('archivo',archivo);
    const res = await fetch('/upload',{
      method:'POST',
      body:formData,
    });
    const data = await res.json();
    alert(data.msg);
    t.obtenerData("/");
    } catch (error) {
      console.log(error);
    }
  }
  newFile.onclick=()=>alerta.classList.remove("oculto");
  cerrarAlerta.onclick=()=> alerta.classList.add("oculto");