
const productos = [
  { id: 1,
    precio: 110,  
    nombre: 'Zapatillas Write Level',
    horma: "pequeña",
    talla: ["35", "36", "37", "38"],
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/1.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 2, 
    precio: 140,  
    nombre: 'Zapatillas Briw',
    horma: "pequeña",
    talla: ["36", "37", "38"],
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/2.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg']},
  

  { id: 3, 
    precio: 130,  
    nombre: 'Zapatillas Lonchad',
    horma: "pequeña",
    talla: ["35", "37", "38"],
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/3.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 4, 
    precio: 140,  
    nombre: 'Zapatillas Mrgaret',
    horma: "pequeña",
    talla: ["35", "37", "38"],
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/4.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 5, 
    precio: 145,  
    nombre: 'Zapatillas Importadas',
    horma: "pequeña",
    talla: ["35", "37", "38"],
    colores: ["Blanco", "Verde"], // otro ejemplo
    imagenes: ['img/5.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 6, 
    precio: 110,  
    nombre: 'Zapatillas Womn',
    horma: "pequeña",
    talla: ["35", "37", "38"],
    colores: ["Blanco", "Verde"], // otro ejemplo
    imagenes: ['img/6.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 7, 
    precio: 110,  
    nombre: 'Zapatillas Tantal',
    horma: "pequeña",
    talla: ["35", "37", "38"],
    colores: ["Blanco", "Verde"], // otro ejemplo
    imagenes: ['img/7.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 8, 
    precio: 110,  
    nombre: 'Zapatillas Renee',
    horma: "pequeña",
    talla: ["33", "37", "38"],
    colores: ["Blanco", "Verde"], // otro ejemplo
    imagenes: ['img/8.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 9, 
    precio: 135,  
    nombre: 'Zapatillas Brave',
    horma: "pequeña",
    talla: ["35", "37", "38"],
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/9.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 10, 
    precio: 150,  
    nombre: 'Zapatillas Scool',
    horma: "pequeña",
    talla: ["35", "37", "38"],
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/10.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 11, 
    precio: 120,  
    nombre: 'Zapatillas Coreanas',
    horma: "pequeña",
    talla: ["35", "37", "39"],
    colores: ["Blanco", "Beige", "Rosa"], // ← array
    imagenes: ['img/1.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/6.jpeg' ]},

  { id: 12, 
    precio: 110,  
    nombre: 'Zapatillas Write',
    horma: "pequeña",
    talla: ["36", "37", "38"],
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
      <button class="precio">S/ ${p.precio} </button>
    `;

    catalogo.appendChild(div);
  });
}


// Actualizar carrito
function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  const carritoItems = document.getElementById("carrito-items");
  const totalElemento = document.getElementById("total");

  carritoItems.innerHTML = '';
  let total = 0;

  carrito.forEach((p, index) => {
    const precioUnitario = parseFloat(p.precio);
    const subtotal = precioUnitario * p.cantidad;
    total += subtotal;

    const li = document.createElement('li');
    li.className = 'carrito-item';
    li.style.cursor = "pointer"; // Para indicar que es clickeable

    li.onclick = () => {
      if (p.tipo === "oferta") {
        mostrarModalOfertaDelDia(p.id);
      } else {
        mostrarModalProducto(p.id);
  }
};

    li.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <div style="flex: 1;">
         <div><strong>${p.nombre}</strong></div>
         <div>Talla: ${p.talla} | Color: ${Array.isArray(p.color) ? p.color.join(', ') : p.color}</div>
         <div>Cantidad: ${p.cantidad}</div>
         <div>Subtotal: S/ ${subtotal.toFixed(2)}</div>
         <div class="cantidad-control-min">
          <button onclick="cambiarCantidad(${index}, -1)">−</button>
       <button onclick="cambiarCantidad(${index}, 1)">+</button>
      </div>
      </div>
      <button onclick="eliminarProducto(${index})">✕</button>
    `;
    carritoItems.appendChild(li);
  });

  totalElemento.textContent = total.toFixed(2);
}

function cambiarCantidad(index, cambio) {
  if (carrito[index]) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad < 1) {
      carrito[index].cantidad = 1; // O puedes eliminarlo si prefieres
    }
    actualizarCarrito();
  }
}


const carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado) {
  carrito = JSON.parse(carritoGuardado);
  actualizarCarrito();
  actualizarContadorCarrito();
}

// Eliminar producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  actualizarContadorCarrito();
}

// Vaciar todo el carrito
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  actualizarContadorCarrito();
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

  let mensaje = "¡Hola Ready! Vengo de la web y me gustaría realizar el siguiente pedido:\n\n";

  carrito.forEach((producto) => {
    mensaje += `🛍️ Producto: ${producto.nombre}\n`;
    mensaje += `👟 Talla: ${producto.talla}\n`;
    mensaje += `🎨 Color: ${producto.color}\n`;
    mensaje += `🔢 Cantidad: ${producto.cantidad}\n`;
    mensaje += `💵 Precio: S/ ${producto.precio}\n\n`;
  });

  mensaje += `💰 Total: S/ ${document.getElementById("total").textContent}\n`;
  mensaje += "¡Gracias por tu atención! 🙌";

  const numeroWhatsApp = "+51970669211";
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  // Abrir WhatsApp
  window.open(url, "_blank");

  // Vaciar carrito después de enviar
  vaciarCarrito();
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

// Soporte para swipe en móviles TACTIL DE CARRUSEL
let startX = 0;
let endX = 0;

const carrusel = document.getElementById('carrusel');

carrusel.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
}, false);

carrusel.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  manejarSwipe();
}, false);

function manejarSwipe() {
  const umbral = 50; // Mínima distancia para considerar swipe

  if (startX - endX > umbral) {
    mostrarImagen(indice + 1); // Swipe izquierda
  } else if (endX - startX > umbral) {
    mostrarImagen(indice - 1); // Swipe derecha
  }
}


// NODAL
function mostrarModalProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const modalDetalle = document.getElementById("modal-detalle");
  let imagenActual = 0;

  modalDetalle.innerHTML = `
  <div class="modal-carrusel">

    <div class="modal-img-zoom-container">
      <img 
        id="modal-img" 
        src="${producto.imagenes[imagenActual]}" 
        onmousemove="lupaZoom(event)"
       onmouseleave="resetZoom()"
      />
    </div>
    
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
        ${producto.talla.map(talla => `
        <option value="${talla}">${talla}</option>
      `).join('')}
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
    <button class="btn-agregar" onclick="agregarAlCarritoDesdeModal(${producto.id})">
     Agregar al carrito
    </button>
  </div>

`;

  document.getElementById("modal-producto").classList.remove("oculto");
  window.imagenActualModal = 0;
  window.productoModal = producto;
  agregarEventosTactiles();

}

// Soporte táctil para cambiar imágenes en el modal
function agregarEventosTactiles() {
  const imagen = document.getElementById("modal-img");
  if (!imagen) return;

  let xInicial = null;

  imagen.addEventListener("touchstart", (e) => {
    xInicial = e.touches[0].clientX;
  });

  imagen.addEventListener("touchend", (e) => {
    if (!xInicial) return;

    let xFinal = e.changedTouches[0].clientX;
    let diferencia = xInicial - xFinal;

    if (Math.abs(diferencia) > 50) {
      if (diferencia > 0) {
        // Swipe izquierda - siguiente imagen
        cambiarImagenModal(window.productoModal.id, 1);
      } else {
        // Swipe derecha - imagen anterior
        cambiarImagenModal(window.productoModal.id, -1);
      }
    }

    xInicial = null;
  });
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
      cantidad: cantidad,
      tipo: "catalogo"
    });
  }

  actualizarCarrito();
  actualizarContadorCarrito();
  cerrarModal();
  mostrarMensajeExito();
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

// mensaje de se agrego correctamente
function mostrarMensajeExito() {
  const mensaje = document.getElementById("mensaje-exito");
  mensaje.classList.remove("oculto");
  mensaje.classList.add("visible");

  setTimeout(() => {
    mensaje.classList.remove("visible");
    mensaje.classList.add("oculto");
  }, 2000);
}
 // CONTADOR NUMERICO DEL CARRITO
function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  if (contador) {
    if (totalProductos > 0) {
      contador.textContent = totalProductos;
      contador.style.display = 'flex'; // Mostrar contador si hay productos

      // Animación de "pop"
      contador.classList.remove("animar-pop");
      void contador.offsetWidth;
      contador.classList.add("animar-pop");

    } else {
      contador.style.display = 'none'; // Ocultar si no hay productos
    }
  }
}


