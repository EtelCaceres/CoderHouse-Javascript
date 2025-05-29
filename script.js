const listaDeProductos = [
  { id: 1, nombre: "Cactus", precio: 1200, imagen: "img/cactus.jpg" },
  { id: 2, nombre: "Suculenta", precio: 1000, imagen: "img/suculenta.jpg" },
  { id: 3, nombre: "Potus", precio: 1500, imagen: "img/potus.jpg" },
  { id: 4, nombre: "Lavanda", precio: 1300, imagen: "img/lavanda.jpg" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductosEnPantalla(productos) {
  const contenedor = document.getElementById("cards-container");
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card");

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button class="boton-agregar" id="boton-${producto.id}">Agregar al carrito</button>
    `;

    contenedor.appendChild(tarjeta);

    const boton = document.getElementById(`boton-${producto.id}`);
    boton.addEventListener("click", () => agregarAlCarrito(producto));
  });
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  guardarCarrito();
  mostrarCarrito();
}

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-container");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  carrito.forEach((producto, indice) => {
    const item = document.createElement("div");
    item.classList.add("card");

    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button class="boton-eliminar" id="eliminar-${indice}">Eliminar</button>
    `;

    contenedor.appendChild(item);

    const botonEliminar = document.getElementById(`eliminar-${indice}`);
    botonEliminar.addEventListener("click", () => eliminarProductoDelCarrito(indice));
  });

  const total = calcularTotal();
  const textoTotal = document.createElement("p");
  textoTotal.classList.add("texto-total");
  textoTotal.innerHTML = `<strong>Total: $${total}</strong>`;
  contenedor.appendChild(textoTotal);

  const botonVaciar = document.createElement("button");
  botonVaciar.textContent = "Vaciar carrito";
  botonVaciar.classList.add("boton-vaciar");
  botonVaciar.addEventListener("click", vaciarCarrito);
  contenedor.appendChild(botonVaciar);

  const botonFinalizar = document.createElement("button");
  botonFinalizar.textContent = "Finalizar compra";
  botonFinalizar.classList.add("boton-finalizar");
  botonFinalizar.addEventListener("click", finalizarCompra);
  contenedor.appendChild(botonFinalizar);
}

function calcularTotal() {
  let total = 0;
  carrito.forEach(producto => {
    total += producto.precio;
  });
  return total;
}

function eliminarProductoDelCarrito(indice) {
  carrito.splice(indice, 1);
  guardarCarrito();
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  alert("¡Gracias por tu compra! Pronto recibirás tus plantas 🌿");
  vaciarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar productos y carrito al cargar
mostrarProductosEnPantalla(listaDeProductos);
mostrarCarrito();
