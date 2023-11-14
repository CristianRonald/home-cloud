import Menu from './modules/Menu.js';
import Tree from './modules/Tree.js';
const m = new Menu();
const t = new Tree();

upDir.onclick = async() =>{
const resp = await m.nuevaCarpeta(t.getTitle());
alert("Directorio creado");
dirUp.value='';
crearDir.classList.add("oculto");
t.actualizarTree(resp);
} 
upFile.onclick = async() => {
const resp = await m.subirArchivo(t.getTitle());
alert("Archivo creado");
upArchivo.classList.add("oculto");
console.log(t.getTitle());
t.actualizarTree(resp);
}
findFile.addEventListener('input', () => m.buscarElemento(findFile.value)); 
