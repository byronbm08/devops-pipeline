const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = process.env.PORT || 3000;
const db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (path === '/productos') {
    res.end(JSON.stringify(db.productos));
  } else if (path === '/categorias') {
    res.end(JSON.stringify(db.categorias));
  } else if (path === '/eval') {
    // ⚠️ Vulnerabilidad intencional — Code Injection
    const resultado = eval(query.code);
    res.end(JSON.stringify({ resultado }));
  } else if (path === '/archivo') {
    // ⚠️ Vulnerabilidad intencional — Path Traversal
    const contenido = fs.readFileSync(query.nombre, 'utf8');
    res.end(JSON.stringify({ contenido }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

server.listen(PORT, () => {
  console.log(`API corriendo en puerto ${PORT}`);
});