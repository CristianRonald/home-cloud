const express = require("express");
const {exec} = require("child_process");
const { register } = require("module");
const app = express();
app.use(express.static('front'));
app.get("/",(req,res)=>res.sendFile(__dirname+"/front/index.html"));
app.get("/api/subir",(req,res)=>{
    const tipo = req.query.tipo;
    const nombre = req.query.nombre;
    console.log(tipo,nombre);
    actualizarDatos(tipo,nombre).then(respuesta=>{
        res.send(respuesta);
    });
});
function actualizarDatos(tipo,nombre){
    return new Promise((resolve,reject)=>{
        let comando = `hc -a${tipo} ${nombre}`;
        console.log(comando);
        exec(comando,(err,stdout,stderr)=>{
            console.log(stdout);
            resolve(stdout);
        });
    });
}

const PUERTO = process.env.PORT || 8080;
app.listen(PUERTO,()=>{
    console.log(`Servidor activo en la ruta http//:localhost:${PUERTO}`);
});