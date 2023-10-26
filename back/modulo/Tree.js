const {exec} = require("child_process");
class Tree {
  constructor(){
    this.data;
  }
  async agregarNodos(path) {
    try{
      console.log(path +">");
      console.log(__dirname);
      let arr = path.split('\n');
      const data = [];
    for (let a of arr) {
      if(a == '') continue;
      let dat = {};
      dat.nombre = a.split(',')[0].split('\r')[0]; 
      dat.tipo = a.split(',')[1].split('\r')[0]; 
      dat.extension = '';
      if(dat.nombre.split('.').length>1) dat.extension = dat.nombre.split('.')[1];
      data.push(dat);
    }
    this.data = data;
    }
    catch(err){
      console.log(err);
    }
  }
  getData(){return this.data;}
}
module.exports.Tree = Tree;