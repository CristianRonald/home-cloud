import Menu from './modules/Menu.js';
import Tree from './modules/Tree.js';
const m = new Menu();
const t = new Tree();
upDir.onclick = async() =>{
t.actualizarTree(await m.nuevaCarpeta());
} 
upFile.onclick = async() => {
t.actualizarTree(await m.subirArchivo());
}
findFile.addEventListener('input', () => m.buscarElemento(findFile.value)); 