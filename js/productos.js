let listaDeProductos = [];

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

async function cargarProductos() {
    try {
        const response = await fetch("data/productos.json");
        listaDeProductos = await response.json();
        mostrarProductosEnPantalla(listaDeProductos);
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

function agregarAlCarrito(producto) {
    carrito.push(producto);
    guardarCarrito();
    mostrarCarrito();
}
