import Menu from './modules/Menu.js';
import Tree from './modules/Tree.js';
const m = new Menu();
const t = new Tree();
arrow.onclick = () => t.retornarPath();
crearDir.onclick = () => m.nuevaCarpeta();
upFile.onclick = () => m.subirArchivo();
findFile.addEventListener('input', () => m.buscarElemento(findFile.value)); 