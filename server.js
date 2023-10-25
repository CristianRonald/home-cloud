const express = require("express");
const {exec} = require("child_process");
const fileUpload = require("express-fileupload");
const { homedir } = require("os");
const app = express();
app.use(express.static('front'));
app.use(fileUpload());
app.get("/",(req,res)=>res.sendFile(__dirname+"/front/index.html"));
app.get("/api/subir",(req,res)=>{
    const tipo = req.query.tipo;
    const nombre = req.query.nombre;
    console.log(tipo,nombre);
    actualizarDatos(tipo,nombre).then(respuesta=>{
        res.send(respuesta);
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

const PUERTO = process.env.PORT || 8080;
app.listen(PUERTO,()=>{
    console.log(`Servidor activo en la ruta http//:localhost:${PUERTO}`);
});