const express = require("express");
const {exec} = require("child_process");
const fileUpload = require("express-fileupload");

const {Tree} = require('./back/modulo/Tree');

const app = express();
//Middwa
app.use(express.static('front'));
app.use(fileUpload());
app.get("/",(req,res)=>res.sendFile(__dirname+"/front/index.html"));
app.post("/api/crear/directorio",(req,res)=>{
 res.send({msg:req.files});
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
    const nombre = req.params.nombre;
    const t = new Tree();
    try {
        const resp = await getFiles(nombre);
        await cambiarPath(await solicitarPath(),nombre);
        t.agregarNodos(resp);
        res.send(JSON.stringify(t.getData()));
    } catch (err) {
        res.send({message: err});
    }
});
app.post('/upload',async (req,res)=>{
    if(!req.files || Object.keys(req.files).length ===0) return res.status(400).send({ message: "No files upload"});
    const archivo = req.files.archivo;
    let path = '';
    await solicitarPath().then(resp=>path = resp+'/'+archivo.name);
    console.log(path);
    archivo.mv(path,(err)=>{
        if(err) res.status(500).send(err);
        res.send({msg:"Archivo subido"});
    });
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
    let comando = "hc -l "+path;
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