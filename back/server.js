const express = require("express");
const {exec} = require("child_process");
const fileUpload = require("express-fileupload");
const path = require('path');
const bodyParser = require('body-parser');

const {Tree} = require('./modulo/Tree');

const app = express();
const filePath = path.join(__dirname,"..","front","index.html");
//Middwaler
app.use(express.static(path.join(__dirname,"..","front")));
app.use(fileUpload());
app.use(bodyParser.json());

app.get("/",(req,res)=>res.sendFile(filePath));

app.post("/api/subir/:nombre",async (req,res)=>{
    const nombre = req.params.nombre;
    const b = req.body;
    const t = new Tree();
    try {
       await subirCarpeta(b.titulo,nombre);
       const resp = await getFiles(b.titulo);
       t.agregarNodos(resp);
       res.send(JSON.stringify(t.getData())); 
    } catch (err) {
       res.send({"error":err}); 
    }
});
app.get("/api/data/title",async (req,res)=>{
    res.setHeader('Content-Type','application/json');
    try {
        const resp = await solicitarPath();
        res.send({message:resp});
    } catch (err) {
        console.log(err);
    }
});
app.get('/api/tree',async (req,res)=>{
    res.setHeader('Content-Type','application/json');
    const t = new Tree();
    try {
        const resp = await getFiles('/')
        t.agregarNodos(resp);
        res.send(JSON.stringify(t.getData()));
    } catch (error) {
        res.send({"error":"Vacio o no existe"});
    }
});
app.get('/api/tree/:nombre',async (req,res)=>{
    const nombre = req.params.nombre.replace(/\+/g,'/');
    const t = new Tree();
    try {
        const resp = await getFiles(nombre);
        //await cambiarPath(await solicitarPath(),nombre);
        t.agregarNodos(resp);
        res.send(JSON.stringify(t.getData()));
    } catch (err) {
        console.log(err);
        res.send({message: err});
    }
});
app.post('/upload',async (req,res)=>{
    if(!req.files || Object.keys(req.files).length ===0) return res.status(400).send({ message: "No files upload"});
    const archivo = req.files.archivo;
    const  path = req.body.titulo+'/'+archivo.name;
    const t = new Tree();
    try {
        const resp = await getFiles(req.body.titulo);
        t.agregarNodos(resp);
    archivo.mv(path,(err)=>{
        if(err) res.status(500).send(err);
        res.send(JSON.stringify(t.getData()));
    });
    } catch (error) {
        res.status(404).send(error);
    }
});
function cambiarPath(main,nombre){
    return new Promise((resolve,reject)=>{
        let comando = 'hc -c '+main+'/'+nombre;
        exec(comando,(err,stdout,stderr)=>{
            if(err) reject(stdout);
            resolve(stdout);
        });
    });
}
function solicitarPath(){
    return new Promise((resolve,reject)=>{
        let comando = 'hc -gd'
        exec(comando,(err,stdout,stderr)=>{
            if(err) reject(stdout);
            stdout = stdout.split('\r\n')[0];
            resolve(stdout);
        });
    });
}
function subirCarpeta(relPath,nombre){
    return new Promise(resolve=>{
        let comando = `hc -ad ${relPath} ${nombre}`;
        console.log(comando);
        exec(comando,(err,stdout,stderr)=>{
            resolve(stdout);
        });
    });
}
function getFiles(path){
    let comando = "hc -li"
    if(path != '/') comando = 'hc -l '+path;
    return new Promise((resolve,reject)=>{
      exec(comando,(err,stdout,stderr)=>{
        if(err) reject(stderr);
        resolve(stdout);
      });
    });
  }

const PUERTO = process.env.PORT || 8080;
app.listen(PUERTO,()=>{
    console.log(`Servidor activo en la ruta http://localhost:${PUERTO}`);
});