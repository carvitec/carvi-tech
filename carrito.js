let carrito = JSON.parse(localStorage.getItem('carritoCarVi')) || [];

function actualizarVistaCarrito() {
    const contenedor = document.getElementById('elementos-carrito');
    const totalElemento = document.getElementById('total-carrito');
    const contador = document.getElementById('contador-carrito');

    if (!contenedor) return;

    contenedor.innerHTML = '';
    let total = 0;
    let itemsTotales = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        itemsTotales += item.cantidad;

        const elemento = document.createElement('div');
        elemento.classList.add('item-carrito');
        elemento.innerHTML = `
            <div>
                <strong>${item.nombre}</strong><br>
                <small>$${item.precio.toFixed(2)} x ${item.cantidad}</small>
            </div>
            <div>
                <button onclick="eliminarDelCarrito(${index})">❌</button>
            </div>
        `;
        contenedor.appendChild(elemento);
    });

    totalElemento.innerText = total.toFixed(2);
    contador.innerText = itemsTotales;

    // Guardar estado localmente
    localStorage.setItem('carritoCarVi', JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio) {
    const existe = carrito.find(item => item.nombre === nombre);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarVistaCarrito();
    document.getElementById('panel-carrito').classList.add('abierto');
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarVistaCarrito();
}

function toggleCarrito() {
    const panel = document.getElementById('panel-carrito');
    panel.classList.toggle('abierto');
}

// Carga inicial al refrescar la página
document.addEventListener('DOMContentLoaded', actualizarVistaCarrito);