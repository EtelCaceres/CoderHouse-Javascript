const materiales = ["cemento", "barro", "plástico"];
const precios = [500, 800, 300];

function elegirMaterial() {
  let mensaje =  "Elegí el tipo de maceta:\n";

  for (let i = 0; i < materiales.length; i++) {
    mensaje += `${i + 1} - ${materiales[i]} ($${precios[i]})\n`;
  }

  let seleccion =  parseInt(prompt(mensaje)) - 1;
  

  if (seleccion >= 0 && seleccion < materiales.length) {
    return seleccion;
  } else {
    alert("Opción inválida. Se va a usar plástico por defecto.");
    return 2;
  }
}

function calcularCosto(cantidad, precio) {
  return cantidad * precio;
}

function confirmar(material, cantidad, total) {
  const texto = `Elegiste:\n- Material: ${material}\n- Cantidad: ${cantidad}\n- Total: $${total}\n\n¿Confirmás el pedido?`;
  return confirm(texto);
}

function producirMacetas() {
  alert("¡Bienvenida al simulador de macetas artesanales!");

  const indice = elegirMaterial();
  const material = materiales[indice];
  const precio = precios[indice];

  let cantidad = parseInt(prompt(`¿Cuántas macetas de ${material} querés hacer?`));

  while (isNaN(cantidad) || cantidad <= 0) {
    cantidad = parseInt(prompt("Ingresá una cantidad válida mayor a cero."));
  }

  const total = calcularCosto(cantidad, precio);
  const ok = confirmar(material, cantidad, total);

  if (ok) {
    alert("¡Perfecto! Vamos a empezar la producción.");
    console.log(`Producción: ${cantidad} macetas de ${material}. Total: $${total}`);
  } else {
    alert("Cancelaste el pedido.");
    console.log("Pedido cancelado.");
  }
}

producirMacetas();

