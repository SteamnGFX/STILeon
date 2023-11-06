function notificacion(){
    setTimeout(function () {
        $(".spinner-wrapper").fadeOut("slow");
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Agregado correctamente al carrito'
        })
    }, 500);
}
function notificacionAumenta(){
    setTimeout(function () {
        $(".spinner-wrapper").fadeOut("slow");
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Se aumentó la cantidad'
        })
    }, 500);
}


let carrito = []
const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('contenedor-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')
const contadorCarrito2 = document.getElementById('contadorCarrito2')
const precioTotal = document.getElementById('precioTotal')

document.addEventListener('DOMContentLoaded',() =>{
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    const precioComa = producto.precio.toLocaleString('es-MX')
    div.classList.add('producto')
    div.setAttribute("onmouseover", `testhover(${producto.id})`)
    div.innerHTML = `
    <div class="titleProduct">
    <h3 class="titulo">${producto.nombre}</h3>
    </div>
    <div class="imagen">
    <img class="product-img" src=${producto.img} alt="">
    </div>
    <div class="texto">
    <p class="desProducto">${producto.desc}</p>
    <p class="precioProducto">$${precioComa}.00</p>
    </div>
    <div class="agregar">
    <button id="agregar${producto.id}" class="btn btn-primary btn-testOculto">Agregar al carrito</button>
    </div>
    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })

})


const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodId)
            prod.cantidad++
            notificacionAumenta();
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
        actualizarCarrito()
        console.log(carrito)
        notificacion();
    }
    actualizarCarrito();
    
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
    console.log(carrito)
}


const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('row borderItem')
        div.innerHTML = `
        <div class="col carrito-img"><img src="${prod.img}" style="width: 100px"></div>
        <div class="col carrito-item"><p class="textocarrito">${prod.nombre}</p></div>
        <div class="col carrito-item"><p class="textocarrito">$${prod.precio}.00</p></div>
        <div class="col carrito-item"><p class="textocarrito">${prod.cantidad}<button class="btn" onclick="eliminarDelCarrito(${prod.id})" style="color:red"><i class="fa-solid fa-trash-can"></i></button></p></div>
        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarrito.innerText = carrito.length;
    contadorCarrito2.innerText = carrito.length;
    precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.precio, 0)
}



function test(){
    var contenidoCarrito = "nulo"
    contenidoCarrito = localStorage.getItem('items');
    console.log(contenidoCarrito);
    console.log(carrito)
    
}



function vaciarCarrito(){
    carrito.length = 0;
    actualizarCarrito();
    carrito = JSON.parse(localStorage.clear('carrito'))
}

function btnCarrito(){
    window.location.href = "carrito.html";
}




const testhover = (prodId) => {
    const item = stockProductos.find((prod) => prod.id === prodId)
    document.getElementById(`agregar`+prodId).classList.remove("btn-testOculto");
    $('.producto').mouseleave(function(){
        document.getElementById(`agregar`+prodId).classList.add("btn-testOculto");
     })
}


document.addEventListener("keyup", e=> {
    if (e.target.matches("#buscador")){
        document.querySelectorAll(".producto").forEach(producto =>{
            producto.textContent.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
            ?producto.classList.remove("filtro")
            :producto.classList.add("filtro")
        })
    } 
})

