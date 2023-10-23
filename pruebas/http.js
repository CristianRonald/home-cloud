const http = require('http');
const data = require('./data');
const server = http.createServer((req, res) => {
  const { method } = req;
  if (method === 'GET') return manejarSolicitudGet(req, res);
  if (method === 'POST') return manejarSolicitudPost(req, res);
  else {
    res.end("Error 501");
    res.statusCode = 501;
  }
});
function manejarSolicitudGet(req, res) {
  if (req.url === '/') res.end("Html base");
  if (req.url === '/data') res.end(JSON.stringify(data.datos));
  else {
    res.end("Error 404");
    res.statusCode = 404;
  }
  console.log(res.statusCode);
}
function manejarSolicitudPost(req, res) {
  console.log("POST");
}
let puerto = 8080;
server.listen(puerto, () => {
  console.log(`El servidor se creo  en el localhost:${puerto}`);
});