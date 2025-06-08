let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
    const contenedor = document.getElementById("carrito-container");
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="mensaje-vacio">Tu carrito está vacío.</p>';
        return;
    }


    carrito.forEach((producto, indice) => {
        const item = document.createElement("div");
        item.classList.add("card");

        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio unitario: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Subtotal: $${producto.precio * producto.cantidad}</p>

            <div class="botones-cantidad">
                <button class="btn-restar">-</button>
                <button class="btn-sumar">+</button>
            </div>

            <button class="boton-eliminar">Eliminar</button>
    `;

        contenedor.appendChild(item);

        item.querySelector(".btn-sumar").addEventListener("click", () => {
            carrito[indice].cantidad++;
            guardarCarrito();
            mostrarCarrito();
        });

        item.querySelector(".btn-restar").addEventListener("click", () => {
            if (carrito[indice].cantidad > 1) {
                carrito[indice].cantidad--;
                guardarCarrito();
                mostrarCarrito();
            }
        });

        item.querySelector(".boton-eliminar").addEventListener("click", () => {
            carrito.splice(indice, 1);
            guardarCarrito();
            mostrarCarrito();
        });
    });

    const total = calcularTotal();
    const textoTotal = document.createElement("p");
    textoTotal.classList.add("texto-total");
    textoTotal.innerHTML = `<strong>Total: $${total}</strong>`;
    contenedor.appendChild(textoTotal);
}

function calcularTotal() {
    return carrito.reduce((total, p) => total + p.precio * p.cantidad, 0);
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
}

// Botón "Vaciar carrito"
document.getElementById("btn-vaciar").addEventListener("click", vaciarCarrito);

// Mostrar el carrito al cargar la página
mostrarCarrito();

