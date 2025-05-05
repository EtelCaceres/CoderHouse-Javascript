const productos = [
  { id: 1, nombre: "Cactus", precio: 1200, imagen: "img/cactus.jpg" },
  { id: 2, nombre: "Suculenta", precio: 1000, imagen: "img/suculenta.jpg" },
  { id: 3, nombre: "Potus", precio: 1500, imagen: "img/potus.jpg" },
  { id: 4, nombre: "Lavanda", precio: 1300, imagen: "img/lavanda.jpg" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function imprimirProductosEnHTML(productos) {
  const contenedor = document.getElementById("cards-container");
  contenedor.innerHTML = "";
  productos.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button id="btn-${producto.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
    document.getElementById(`btn-${producto.id}`).addEventListener("click", () => agregarAlCarrito(producto));
  });
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  imprimirCarritoEnHTML(carrito);
}

function imprimirCarritoEnHTML(carrito) {
  const contenedor = document.getElementById("carrito-container");
  contenedor.innerHTML = "";
  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }
  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.classList.add("card");
    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button id="btn-eliminar-${index}">Eliminar</button>
    `;
    contenedor.appendChild(item);

    document.getElementById(`btn-eliminar-${index}`).addEventListener("click", () => eliminarDelCarrito(index));
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  imprimirCarritoEnHTML(carrito);
}

imprimirProductosEnHTML(productos);
imprimirCarritoEnHTML(carrito);
