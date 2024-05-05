console.table(Productos);
let carrito = []

const articuloCartas = document.getElementById("carta");
articuloCartas.className = "row container gap-3 mx-auto my-3"
const tablaBody = document.getElementById('tablabody');

function renderizarProductos(listProds){
    for (const prod of listProds){
        articuloCartas.innerHTML+=`
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src=${prod.foto} alt=${prod.foto}>
            <div class="card-body">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">${prod.precio}</p>
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

function agregarACarrito(producto){
    carrito.push(producto);
    console.table(carrito);
    tablaBody.innerHTML+=`
    <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
    </tr>
    `
// agregar calculo total
}

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

function borrarC(){
    campoNombre.value = '';
    campoEmail.value = '';
}

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', validar);

function validar (ev){
    if((campoNombre.value == '') || (campoEmail.value == '')){
        ev.preventDefault();
        alert('ingrese nombre o email valido');
    }
}