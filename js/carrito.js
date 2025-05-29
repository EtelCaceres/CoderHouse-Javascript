let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

mostrarCarrito();
