import Menu from './modules/Menu.js';
import Tree from './modules/Tree.js';
const m = new Menu();
const t = new Tree();
arrow.onclick = () => t.retornarPath();
upDir.onclick = () =>{
m.nuevaCarpeta();
t.obtenerData("/");
} 
upFile.onclick = () => {
m.subirArchivo();
t.obtenerData("/");
}
findFile.addEventListener('input', () => m.buscarElemento(findFile.value)); 