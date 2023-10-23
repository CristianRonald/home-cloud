const express = require('express');
const app = express();

const {datos} = require('./data');

app.get('/api',(req,res)=>{
    res.end("Pagina main.");
});
app.get('/data',(req,res)=>{
    res.end(JSON.stringify(datos));
});
app.get('/api/data/:persona',(req,res)=>{
    const personas = req.params.persona;
    const resultados = datos[personas];
    if(resultados.length===0) return res.status(404).send("No se encontraron cursos.")
    res.send(JSON.stringify(resultados));
});
let PUERTO = process.env.PORT || 8080;
app.listen(PUERTO,()=>{
    console.log(`Servidor activo en el puerto ${PUERTO}`);
});