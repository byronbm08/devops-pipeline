fetch('/api/productos')
  .then(res => res.json())
  .then(data => {
    const lista = document.getElementById('productos');
    data.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.nombre} — $${p.precio}`;
      lista.appendChild(li);
    });
  })
  .catch(() => {
    document.getElementById('productos').innerHTML = '<li>API no disponible en este modo</li>';
  });

fetch('/api/categorias')
  .then(res => res.json())
  .then(data => {
    const lista = document.getElementById('categorias');
    data.forEach(c => {
      const li = document.createElement('li');
      li.textContent = c.nombre;
      lista.appendChild(li);
    });
  })
  .catch(() => {
    document.getElementById('categorias').innerHTML = '<li>API no disponible en este modo</li>';
  });