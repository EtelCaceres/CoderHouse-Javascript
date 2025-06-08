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

      <div class="botones-cantidad">
        <button class="btn-restar">-</button>
        <input type="number" class="input-cantidad" value="1" min="1">
        <button class="btn-sumar">+</button>
      </div>

      <button class="boton-agregar" id="boton-${producto.id}">Agregar al carrito</button>
    `;

        contenedor.appendChild(tarjeta);

        // Cantidad controlada por input
        const inputCantidad = tarjeta.querySelector(".input-cantidad");
        const btnSumar = tarjeta.querySelector(".btn-sumar");
        const btnRestar = tarjeta.querySelector(".btn-restar");

        btnSumar.addEventListener("click", () => {
            inputCantidad.value = parseInt(inputCantidad.value) + 1;
        });

        btnRestar.addEventListener("click", () => {
            if (parseInt(inputCantidad.value) > 1) {
                inputCantidad.value = parseInt(inputCantidad.value) - 1;
            }
        });

        const boton = document.getElementById(`boton-${producto.id}`);
        boton.addEventListener("click", () => {
            const cantidad = parseInt(inputCantidad.value);
            agregarAlCarrito(producto, cantidad);
        });
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

function agregarAlCarrito(producto, cantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find(p => p.id === producto.id);

    if (existe) {
        existe.cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${producto.nombre} x${cantidad} añadido al carrito`,
        showConfirmButton: false,
        timer: 1500
    });
}

cargarProductos();


