console.table(Productos);
let carrito = []

const articuloCartas = document.getElementById("carta");
articuloCartas.className = "row container gap-3 mx-auto my-3"
const tablaBody = document.getElementById('tablabody');
const finalizarCompra = document.getElementById("btnComprar");
const vaciarCarrito = document.getElementById("btnLimpiar");

function renderizarProductos(listProds){
    for (const prod of listProds){
        articuloCartas.innerHTML+=`
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src=${prod.foto} alt=${prod.foto}>
            <div class="card-body">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">$ ${prod.precio}</p>
                <button class="btn btn-primary compra" id=${prod.id}>Agregar</button>
            </div>
        </div>
        `
    }
// eventos
    const botonesCompra = document.getElementsByClassName('compra');
    for(const boton of botonesCompra){
        boton.addEventListener('click', ()=>{
            console.log('Hiciste click en el boton cuyo id es: '+boton.id); 
            const prodACarrito = listProds.find(prod => prod.id == boton.id); 
            console.log(prodACarrito);
            agregarACarrito(prodACarrito);
        })
    }
}
renderizarProductos(Productos)

function agregarACarrito(producto) {
    const index = carrito.findIndex(item => item.id === producto.id);
    Swal.fire({
        title: "Agregaste Al Carrito",
        text: `${producto.nombre}`,
        icon: "success"
      });
    if (index !== -1) {
        // Si el producto ya está en el carrito, sumar las cantidades
        carrito[index].cantidad += 1;
        // Actualizar el subtotal
        carrito[index].SubTotal = carrito[index].precio * carrito[index].cantidad;
        // Actualizar la fila correspondiente en la tabla
        const filaExistente = document.getElementById(`fila-${producto.id}`);
        filaExistente.children[1].textContent = carrito[index].cantidad;
        filaExistente.children[4].textContent = carrito[index].SubTotal;
    } else {
        // Si el producto no está en el carrito, inicializar cantidad y subtotal
        producto.cantidad = 1;
        producto.SubTotal = producto.precio;
        // Agregar el producto al carrito
        carrito.push(producto);
        tablaBody.innerHTML += `
            <tr id="fila-${producto.id}">
                <td>${producto.id}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.SubTotal}</td>
            </tr>
        `;
    }

    // Actualizar el total acumulado
    let totalAcumulado = carrito.reduce((acum, prod) => acum + prod.SubTotal, 0);
    document.getElementById("carritofinal").innerText = `Total a Pagar $: ${totalAcumulado}`;
    // Guardar el carrito en localStorage como JSON
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
function vaciarCarro(){
    carrito=[];
    tablaBody.innerHTML='';
    document.getElementById("carritofinal").innerText = `Total a Pagar $: `;  
    
    // Limpiar el localStorage
    localStorage.removeItem("carrito");
}
// Cargar el carrito desde localStorage si hay alguno
window.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        // Renderizar los productos del carrito guardado
        carrito.forEach(producto => {
            tablaBody.innerHTML += `
                <tr id="fila-${producto.id}">
                    <td>${producto.id}</td>
                    <td>${producto.cantidad}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.SubTotal}</td>
                </tr>
            `;
        });
    }
});
// eventos teclado

const campoNombre = document.getElementById('nombre');
const campoEmail = document.getElementById('email');

campoNombre.onkeyup =() =>{
    if(campoNombre.value.length < 3){
        console.log('nombre de menos de 3 letras'); 
        campoNombre.style.color='red';
    }else{
        campoNombre.style.color='black';
    }
}
campoEmail.addEventListener('input', ()=>{
    if((!campoEmail.value.includes('@')) ||(!campoEmail.value.includes('.'))){
        document.getElementById('mensaje').innerText='ingrese un email valido !'
    }else{
        document.getElementById('mensaje').innerText=''
    }
})

function borrarCampos(){
    campoNombre.value = ` `;
    campoEmail.value = ` `;
}

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', validar);

function validar (ev){
    if((campoNombre.value == '') || (campoEmail.value == '')){
        ev.preventDefault();
        alert('ingrese nombre o email valido');
    }
}

// Finalizar compra
finalizarCompra.onclick = async () => {
    const { value: datoF } = await Swal.fire({
        title: 'Completa tu información',
        html:
            '<input id="nomb" class="swal2-input" placeholder="Nombre">' +
            '<input id="apell" class="swal2-input" placeholder="Apellido">' +
            '<input id="telef" class="swal2-input" placeholder="Teléfono">',
        focusConfirm: false,
        preConfirm: () => {
            const nombre = document.getElementById('nomb').value;
            const apellido = document.getElementById('apell').value;
            const telefono = document.getElementById('telef').value;

            if (!nombre || !apellido || !telefono) {
                Swal.showValidationMessage('Por favor completa todos los datos');
                return false;
            }
            return { nombre, apellido, telefono };
        }
    });

    if (datoF) {
        Swal.fire({
            title: "Compra Efectuada",
            text: `Muchas Gracias ${datoF.nombre} ${datoF.apellido}. Teléfono: ${datoF.telefono}`,
            icon: "success"
        });
        vaciarCarro();
    }
};

//vaciar carro
vaciarCarrito.onclick=()=>{
    vaciarCarro();
}