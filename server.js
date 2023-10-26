const express = require("express");
const {exec} = require("child_process");
const fileUpload = require("express-fileupload");

const {Tree} = require('./back/modulo/Tree');

const app = express();
//Middwa
app.use(express.static('front'));
app.use(fileUpload());
app.get("/",(req,res)=>res.sendFile(__dirname+"/front/index.html"));
app.get("/api/subir",(req,res)=>{
    const tipo = req.query.tipo;
    const nombre = req.query.nombre;
    actualizarDatos(tipo,nombre).then(respuesta=>{
        res.send(respuesta);
    });
});
app.get('/api/tree',(req,res)=>{
    res.setHeader('Content-Type','application/json');
    const t = new Tree();
    getFiles('/')
    .then(resp=>{
    t.agregarNodos(resp);
    console.log(t.getData());
    res.send(JSON.stringify(t.getData()));
    })
    .catch(err=>{
    res.send({message: err});
    });
});
app.post('/upload',async (req,res)=>{
    if(!req.files || Object.keys(req.files).length ===0) return res.status(400).send({ message: "No files upload"});
    const archivo = req.files.archivo;
    let path = '';
    await solicitarPath().then(resp=>path = resp+'/'+archivo.name);
    archivo.mv(path,(err)=>{
        if(err) res.status(500).send(err);
        res.send("Archivo subido");
    });
});
function solicitarPath(){
    return new Promise((resolve,reject)=>{
        let comando = 'hc -gd'
        exec(comando,(err,stdout,stderr)=>{
            if(err) reject(stdout);
            resolve(stdout);
        });
    });
}
function actualizarDatos(tipo,nombre){
    return new Promise(resolve=>{
        let comando = `hc -a${tipo} ${nombre}`;
        console.log(comando);
        exec(comando,(err,stdout,stderr)=>{
            resolve(stdout);
        });
    });
}
function getFiles(path){
    let comando = "hc -l "+path.split('/')[1];
    if(path == '/') comando = 'hc -li';
    return new Promise((resolve,reject)=>{
      exec(comando,(err,stdout,stderr)=>{
        if(err) reject(stderr);
        resolve(stdout);
      });
    });
  }

const PUERTO = process.env.PORT || 8080;
app.listen(PUERTO,()=>{
    console.log(`Servidor activo en la ruta http//:localhost:${PUERTO}`);
});