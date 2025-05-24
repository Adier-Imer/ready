// Productos en oferta
const ofertasPower = [
  {
    id: 1001,
    precio: 150,
    nombre: 'Zapatillas FlashRun',
    horma: "pequeña",
    tallas: "36",
    colores: ["Blanco", "Rosa"],
    imagenes: ['of/1.jpeg', 'of/2.jpeg']
  },
  {
    id: 1002,
    precio: 120,
    nombre: 'Zapatillas SprintX',
    horma: "pequeña",
    tallas: "37",
    colores: ["Beige", "Verde"],
    imagenes: ['of/2.jpeg', 'of/4.jpeg']
  },
  {
    id: 1003,
    precio: 119,
    nombre: 'Zapatillas UrbanFlex',
    horma: "pequeña",
    tallas: "35",
    colores: ["Negro", "Gris"],
    imagenes: ['of/3.jpeg', 'of/2.jpeg']
  },
  {
    id: 1004,
    precio: 145,
    nombre: 'Zapatillas SprintX',
    horma: "pequeña",
    tallas: "34",
    colores: ["Beige", "Verde"],
    imagenes: ['of/4.jpeg', 'of/4.jpeg']
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-ofertas");
  if (!contenedor) return;

  // Función para crear el HTML de productos y añadirlo al contenedor
  function agregarProductos(productos) {
    productos.forEach(p => {
      const precioOriginal = p.precio;
      const precioDescuento = (precioOriginal * 0.70).toFixed(2); // 30% off

      const div = document.createElement("div");
      div.classList.add("producto-oferta");
      div.addEventListener("click", () => mostrarModalOfertaDelDia(p.id)); // Tu función global

     div.innerHTML = `
      <div class="descuento-label">-30%</div>
      <img src="${p.imagenes[0]}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p class="precio-original">S/ ${precioOriginal}</p>
      <p class="precio-oferta">S/ ${precioDescuento}</p>
      `;
      contenedor.appendChild(div);
      div.addEventListener("click", () => mostrarModalOfertaDelDia(p.id));
    });
  }

  // Agregamos productos originales
  agregarProductos(ofertasPower);

  // Variables para scroll
  let velocidad = 2; // px por tick
  let intervaloTiempo = 20; // ms

  // El ancho total después de agregar productos (solo originales, no duplicados)
  const anchoOriginal = contenedor.scrollWidth;

  function scrollLento() {
    contenedor.scrollLeft += velocidad;

    // Cuando hemos desplazado toda la primera copia, reseteamos el scroll a 0 (sin salto visual)
    if (contenedor.scrollLeft >= anchoOriginal) {
      contenedor.scrollLeft = 0;
    }
  }

  let intervalo = setInterval(scrollLento, intervaloTiempo);

  // Pausar al interactuar
  contenedor.addEventListener("mouseenter", () => clearInterval(intervalo));
  contenedor.addEventListener("mouseleave", () => intervalo = setInterval(scrollLento, intervaloTiempo));
  contenedor.addEventListener("touchstart", () => clearInterval(intervalo));
  contenedor.addEventListener("touchend", () => intervalo = setInterval(scrollLento, intervaloTiempo));
});

function mostrarModalOfertaDelDia(id) {
  const producto = ofertasPower.find(p => p.id === id);
  if (!producto) return;

  const modal = document.getElementById("modal-oferta-dia");

  // Cargar imagen principal
  const imgPrincipal = document.getElementById("oferta-img");
  imgPrincipal.src = producto.imagenes[0];

  // Nombre y precios
  document.getElementById("oferta-nombre").textContent = producto.nombre;
  const precioOriginal = producto.precio;
  const precioConDescuento = (precioOriginal * 0.70).toFixed(2); // 30% descuento
  document.getElementById("oferta-precio-original").textContent = `Precio original: S/ ${precioOriginal.toFixed(2)}`;
  document.getElementById("oferta-precio-descuento").textContent = `Oferta: S/ ${precioConDescuento}`;

  // Otros detalles
  document.getElementById("oferta-detalles").textContent = `Horma: ${producto.horma}`;
  document.getElementById("oferta-tallas").textContent = `Talla única: ${producto.tallas}`;
  document.getElementById("oferta-colores").textContent = `Colores: ${producto.colores.join(", ")}`;

  // Miniaturas
  const miniaturasContainer = document.getElementById("miniaturas-modal");
miniaturasContainer.innerHTML = producto.imagenes.map((img, index) => `
  <img src="${img}" class="miniatura-oferta ${index === 0 ? 'activa' : ''}" data-src="${img}">
`).join("");


  // Mostrar modal
  modal.style.display = "flex";
  modal.dataset.productoId = producto.id;
}

function cerrarModalOfertaDia() {
  document.getElementById("modal-oferta-dia").style.display = "none";
}

// Función básica de ejemplo para agar al carrito
function agregarAlCarritoDesdeOferta() {
  const modal = document.getElementById("modal-oferta-dia");
  const id = parseInt(modal.dataset.productoId);
  const producto = ofertasPower.find(p => p.id === id);
  if (!producto) return;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const existente = carrito.find(item => item.id === producto.id);

  if (!existente) {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: parseFloat((producto.precio * 0.70).toFixed(2)),
      horma: producto.horma,
      talla: producto.tallas,
      color: Array.isArray(producto.colores) ? producto.colores : [producto.colores],
      imagen: producto.imagenes[0],
      cantidad: 1,
      tipo: "oferta"
    });


  } else {
    existente.cantidad += 1;
  }

  // Guardamos en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

   // Mostrar mensaje de éxito
  mostrarMensajeConfirmacion("¡Producto agregado al carrito!");

  // Cerrar el modal
  cerrarModalOfertaDia();
  document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
});

}


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("miniatura-oferta")) {
    const nuevaSrc = e.target.dataset.src;
    document.getElementById("oferta-img").src = nuevaSrc;

    document.querySelectorAll(".miniatura-oferta").forEach(img => {
      img.classList.remove("activa");
    });
    e.target.classList.add("activa");
  }
});

// Cerrar el modal al hacer clic fuera del contenido (con delay para no interferir con apertura)
document.getElementById("modal-oferta-dia").addEventListener("click", function (e) {
  const contenido = document.querySelector(".modal-contenido-oferta");
  if (!contenido.contains(e.target)) {
    cerrarModalOfertaDia();
  }
});


function mostrarMensajeConfirmacion(texto) {
  let mensaje = document.createElement("div");
  mensaje.textContent = texto;
  mensaje.className = "mensaje-confirmacion";

  document.body.appendChild(mensaje);

  setTimeout(() => {
    mensaje.remove();
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  const listaCarrito = document.getElementById("carrito-items");

  listaCarrito.addEventListener("click", (e) => {
    const item = e.target.closest(".carrito-item");
    if (!item) return;

    const index = Array.from(listaCarrito.children).indexOf(item);
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = carrito[index];

    if (!producto) return;

    if (producto.tipo === "oferta") {
      mostrarModalOfertaDelDia(producto.id);
    } else {
      mostrarModalProducto(producto.id);
    }
  });
});

