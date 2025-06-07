let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(producto) {
    const productoEnCarrito = carrito.find(item => item.id === producto.id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

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
            <p>Precio unitario: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Subtotal: $${producto.precio * producto.cantidad}</p>
            <div class="botones-cantidad">
                <button class="btn-restar" data-id="${producto.id}">-</button>
                <button class="btn-sumar" data-id="${producto.id}">+</button>
            </div>
            <button class="boton-eliminar" id="eliminar-${indice}">Eliminar</button>
        `;

        contenedor.appendChild(item);

        // Botones + y -
        document.querySelector(`.btn-sumar[data-id="${producto.id}"]`)
            .addEventListener("click", () => cambiarCantidad(producto.id, 1));

        document.querySelector(`.btn-restar[data-id="${producto.id}"]`)
            .addEventListener("click", () => cambiarCantidad(producto.id, -1));

        // Botón eliminar
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

function cambiarCantidad(id, cambio) {
    const producto = carrito.find(p => p.id === id);
    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
    mostrarCarrito();
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
        Swal.fire({
            icon: "warning",
            title: "Tu carrito está vacío",
            text: "Agregá productos antes de finalizar la compra",
            confirmButtonColor: "#b02a2a"
        });
        return;
    }

    Swal.fire({
        icon: "success",
        title: "¡Gracias por tu compra! 🌿",
        text: "Pronto recibirás tus plantas en casa",
        confirmButtonColor: "#b02a2a"
    });

    vaciarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

mostrarCarrito();
