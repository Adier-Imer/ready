const productos = [
  { id: 1,
    precio: 110,  
    nombre: 'Zapatillas Write Level',
    horma: "pequeña",
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/1.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 2, 
    precio: 140,  
    nombre: 'Zapatillas Briw',
    horma: "pequeña",
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/2.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg']},

  { id: 3, 
    precio: 130,  
    nombre: 'Zapatillas Lonchad',
    horma: "pequeña",
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/3.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 4, 
    precio: 140,  
    nombre: 'Zapatillas Mrgaret',
    horma: "pequeña",
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/4.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 5, 
    precio: 145,  
    nombre: 'Zapatillas Importadas',
    horma: "pequeña",
    colores: ["Blanco", "Verde"], // otro ejemplo
    imagenes: ['img/5.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 6, 
    precio: 110,  
    nombre: 'Zapatillas Womn',
    horma: "pequeña",
    colores: ["Blanco", "Verde"], // otro ejemplo
    imagenes: ['img/6.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 7, 
    precio: 110,  
    nombre: 'Zapatillas Tantal',
    horma: "pequeña",
    colores: ["Blanco", "Verde"], // otro ejemplo
    imagenes: ['img/7.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 8, 
    precio: 110,  
    nombre: 'Zapatillas Renee',
    horma: "pequeña",
    colores: ["Blanco", "Verde"], // otro ejemplo
    imagenes: ['img/8.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 9, 
    precio: 135,  
    nombre: 'Zapatillas Brave',
    horma: "pequeña",
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/9.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 10, 
    precio: 150,  
    nombre: 'Zapatillas Scool',
    horma: "pequeña",
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/10.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 11, 
    precio: 120,  
    nombre: 'Zapatillas Coreanas',
    horma: "pequeña",
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/1.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 12, 
    precio: 110,  
    nombre: 'Zapatillas Write',
    horma: "pequeña",
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/2.jpeg', 'img/3.jpeg']}
];

let carrito = [];

const catalogo = document.getElementById('catalogo');
const carritoContenedor = document.getElementById('carrito');
const carritoItems = document.getElementById('carrito-items');
const totalElemento = document.getElementById('total');
const botonVaciar = document.querySelector(".vaciar-carrito");

// Mostrar productos en el catálogo
function mostrarProductos() {
  productos.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.addEventListener('click', () => mostrarModalProducto(p.id));

    div.innerHTML = `
      <div class="imagen-contenedor">
        <img src="${p.imagenes[0]}" alt="${p.nombre}">
      </div>
      <h2>${p.nombre}</h2>
      <p class="descripcion">Zapatillas importadas Premium</p>
      <button class="precio">S/ ${p.precio} Soles</button>
    `;

    catalogo.appendChild(div);
  });
}


// Actualizar carrito
function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  carritoItems.innerHTML = '';
  let total = 0;

  carrito.forEach((p, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
     <img src="${p.imagen}" alt="${p.nombre}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; margin-right:8px;">
     <span>${p.nombre} - Talla ${p.talla} - Color ${p.color} - ${p.cantidad} und. - S/ ${p.precio}</span>
     <button onclick="eliminarProducto(${index})">X</button>
     `;
    carritoItems.appendChild(li);
    total += p.precio * p.cantidad;
  });

  totalElemento.textContent = total.toFixed(2);
}



const carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado) {
  carrito = JSON.parse(carritoGuardado);
  actualizarCarrito();
}

// Eliminar producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Vaciar todo el carrito
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

// Mostrar u ocultar el carrito
function toggleCart() {
  carritoContenedor.style.display = (carritoContenedor.style.display === "none" || carritoContenedor.style.display === "") ? "block" : "none";
}

// Cerrar carrito
function cerrarCarrito() {
  carritoContenedor.style.display = "none";
}

// Mostrar catálogo al cargar
mostrarProductos();
botonVaciar.addEventListener("click", vaciarCarrito);

// Contactar por WhatsApp con el carrito
function contactarWhatsApp() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  let mensaje = "¡Hola! Me gustaría realizar el siguiente pedido:\n\n";
  carrito.forEach((producto) => {
    mensaje += `Producto: ${producto.nombre} | Precio: S/ ${producto.precio}\n`;
  });
  mensaje += `\nTotal: S/ ${totalElemento.textContent}\n`;
  mensaje += "¡Gracias por tu atención!";
  const numeroWhatsApp = "+51904529674";
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// Carrusel de imágenes
let indice = 0;
const imagenes = document.querySelectorAll('#carrusel img');
const indicadores = document.getElementById('indicadores');

// Mostrar imagen del carrusel
function mostrarImagen(indiceNuevo) {
  imagenes[indice].classList.remove('activo');
  indice = (indiceNuevo + imagenes.length) % imagenes.length;
  imagenes[indice].classList.add('activo');
  actualizarIndicadores();
}

// Actualizar los puntos indicadores
function actualizarIndicadores() {
  const indicadoresSpan = document.querySelectorAll('#indicadores span');
  indicadoresSpan.forEach((span, index) => {
    span.classList.remove('activo');
    if (index === indice) {
      span.classList.add('activo');
    }
  });
}

// Crear indicadores dinámicamente
function crearIndicadores() {
  imagenes.forEach((_, index) => {
    const span = document.createElement('span');
    span.onclick = () => mostrarImagen(index);
    indicadores.appendChild(span);
  });
}


// Iniciar carrusel
crearIndicadores();
setInterval(() => {
  mostrarImagen(indice + 1);
}, 2000);


// NODAL
function mostrarModalProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const modalDetalle = document.getElementById("modal-detalle");
  let imagenActual = 0;

  modalDetalle.innerHTML = `
  <div class="modal-carrusel">
    <button class="modal-flecha izquierda" onclick="cambiarImagenModal(${id}, -1)">‹</button>
    <div class="modal-img-zoom-container">
      <img 
        id="modal-img" 
        src="${producto.imagenes[imagenActual]}" 
        onmousemove="lupaZoom(event)"
       onmouseleave="resetZoom()"
      />
    </div>
    <button class="modal-flecha derecha" onclick="cambiarImagenModal(${id}, 1)">›</button>
  </div>



  <div class="modal-miniaturas" id="modal-miniaturas">
  ${producto.imagenes.map((img, index) => `
    <img 
      src="${img}" 
      class="miniatura ${index === imagenActual ? 'activa' : ''}" 
      onclick="irAImagenModal(${index})"
    />
  `).join('')}
  </div>


  <button class="cerrar-modal" onclick="cerrarModal()">×</button>

  <h2>${producto.nombre}</h2>
  <p><strong>Precio:</strong> S/ ${producto.precio}</p>
  <p>Zapatillas importadas premium de Horma ${producto.horma}, seleccione una talla más.</p>

  <p><strong>Talla:</strong> 
    <select id="modal-talla">
      <option>35</option>
      <option>36</option>
      <option>37</option>
      <option>38</option>
      <option>39</option>
      <option>40</option>
    </select>
  </p>
   
  <p><strong>Color:</strong> 
    <select id="modal-color">
      ${producto.colores.map(color => `
        <option value="${color}">${color}</option>
      `).join('')}
     </select>
  </p>

  <p><strong>Cantidad:</strong> <input id="modal-cantidad" type="number" min="1" value="1"></p>

  <div class="centrado">
    <button onclick="agregarAlCarritoDesdeModal(${producto.id})">Agregar al carrito</button>
  </div>
`;

  document.getElementById("modal-producto").classList.remove("oculto");
  window.imagenActualModal = 0;
  window.productoModal = producto;
}
 //Auxiliares 

 function cerrarModal() {
  document.getElementById("modal-producto").classList.add("oculto");
}

function cambiarImagenModal(id, direccion) {
  if (!window.productoModal) return;

  const totalImagenes = window.productoModal.imagenes.length;
  window.imagenActualModal += direccion;

  if (window.imagenActualModal < 0) {
    window.imagenActualModal = totalImagenes - 1;
  } else if (window.imagenActualModal >= totalImagenes) {
    window.imagenActualModal = 0;
  }

  // Cambia imagen grande
  document.getElementById("modal-img").src = window.productoModal.imagenes[window.imagenActualModal];

  // Actualiza miniatura activa
  actualizarMiniaturasModal();
}


function agregarAlCarritoDesdeModal(id) {
  const cantidad = parseInt(document.getElementById("modal-cantidad").value) || 1;
  const talla = document.getElementById("modal-talla").value;
  const color = document.getElementById("modal-color").value;
  const imagen = window.productoModal.imagenes[window.imagenActualModal];
  const producto = productos.find(p => p.id === id);

  const productoEnCarrito = carrito.find(item => 
    item.id === id &&
    item.talla === talla &&
    item.color === color &&
    item.imagen === imagen
  );

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: imagen,
      talla: talla,
      color: color,
      cantidad: cantidad
    });
  }

  actualizarCarrito();
  cerrarModal();
}


function irAImagenModal(index) {
  if (!window.productoModal) return;
  window.imagenActualModal = index;
  document.getElementById("modal-img").src = window.productoModal.imagenes[index];
  actualizarMiniaturasModal();
}

function actualizarMiniaturasModal() {
  const miniaturas = document.querySelectorAll('#modal-miniaturas .miniatura');
  miniaturas.forEach((img, i) => {
    img.classList.toggle('activa', i === window.imagenActualModal);
  });
}

 // FUNCION LUPA DEL MODAL
function lupaZoom(event) {
  const img = event.currentTarget;
  const rect = img.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  img.style.transform = "scale(2)";
  img.style.transformOrigin = `${x}% ${y}%`;
}

function resetZoom() {
  const img = document.getElementById("modal-img");
  img.style.transform = "scale(1)";
  img.style.transformOrigin = "center center";
}
