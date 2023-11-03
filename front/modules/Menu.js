export default class Menu {
  constructor() {
    this.crearCasita();
    findFile.value = '';
    nameHost.value = window.location.host;
    newFile.onclick = () => upArchivo.classList.remove("oculto");
    cerrarAlerta.onclick = () => upArchivo.classList.add("oculto");
    newCarpeta.onclick = () => crearDir.classList.remove("oculto");
    cerrar.onclick = () => crearDir.classList.add("oculto");
  }
  async nuevaCarpeta() {
    try {
      const res = await fetch('/api/subir/'+dirUp.value);
      const data = await res.json();
      alert(data.msg);
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
    } catch (error) {
      console.log(error);
    }
  }
  buscarElemento(elem){
    const ps = caja_tree.querySelectorAll('p');
    for(let p of ps){
      p.parentElement.style.display = 'none';
      if(p.innerText.toLowerCase().indexOf(elem.toLowerCase())!=-1) p.parentElement.style.display = '';
    }
  }
  async crearCasita() {
    const resp = await ((await fetch('/api/data/title')).json());
    dirFile.value = resp.message;
  }
}