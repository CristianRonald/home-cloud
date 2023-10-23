
let nombre = "Caja";
function ordenarProducto(nombre){
   return new Promise((resolve,reject)=>{
    setTimeout(() => {
      (nombre == 'Caja')? resolve(nombre):
      reject(`El producto ${nombre} no existe.`);
    }, 3000);
    });
}
function enviarProducto(nombre){
  return new Promise(resolve=>{
    console.log(`El producto ${nombre} se esta procesando.`);
    setTimeout(()=>{
      resolve(`El producto ${nombre} se esta enviando.`);
    },2000);
  });
}
//ordenarProducto(nombre)
//  .then((acept)=>{
//    console.log(acept);
//    return enviarProducto(acept);
//  })
//  .then(acept=>{
//    console.log(acept);
//  })
//  .catch(err=>{
//    console.log(err);
//  });
async function hacerPedido(nombre){
  try {
  const respuesta = await ordenarProducto(nombre);
  console.log("Respuesta recibida");
  console.log(`La respuesta es ${respuesta}`);
  const respuestaProcesada = await enviarProducto(respuesta);
  console.log(respuestaProcesada);
  } catch (err) {
   console.log(err); 
  }
}
hacerPedido(nombre);