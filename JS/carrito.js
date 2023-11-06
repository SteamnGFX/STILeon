function notificacionAumenta() {
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

function notificacionDisminuye() {
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
            title: 'Se disminuyó la cantidad'
        })
    }, 500);
}

let carrito = []
const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('contenedor-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')
const contadorCarrito2 = document.getElementById('contadorCarrito2')
const precioTotal = document.getElementById('precioTotal')

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

const aumentarCantidad = (prodId) => {
    const prod = carrito.map(prod => {
        if (prod.id === prodId)
            prod.cantidad++
        notificacionAumenta();

    })
    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    Swal.fire({
        title: 'Estás seguro de eliminar el producto de tu carrito?',
        showDenyButton: true,
        confirmButtonText: 'Cancelar' + ` <i class="fa-solid fa-ban"></i>`,
        denyButtonText: `Vaciar <i class="fa-solid fa-trash-can"></i>`,
    }).then((result) => {
        if (result.isConfirmed) {

        } else if (result.isDenied) {
            const item = carrito.find((prod) => prod.id === prodId)
            const indice = carrito.indexOf(item)
            carrito.splice(indice, 1)
            actualizarCarrito()
            console.log(carrito)

            carrito = JSON.parse(localStorage.clear('carrito'))
        }
    })
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('row borderItem')
        div.innerHTML = `
        <div class="col align-self-center"><center><img src="${prod.img}" style="width: 100px"></center></div>
        <div class="col carrito-item align-self-center"><p class="textocarrito">${prod.nombre}</p></div>
        <div class="col carrito-item align-self-center"><p class="textocarrito">$${(prod.precio).toLocaleString('es-MX')}.00 MXN</p></div>
        <div class="col carrito-item align-self-center"><div class="row d-flex justify-content-center"><div class="col-3" style="width:50px"><button class='btn btn-primary'>-</button></div><div class="col-3" style="width:50px"><p class="textocarrito" style="padding-top:25%">${prod.cantidad}</p></div><div class="col-3" style="width:50px"><button id='${prod.id}' class='btn btn-primary' onclick="aumentarCantidad(${prod.id})">+</button></div></div></div>
        <div class="col carrito-item align-self-center"><p class="textocarrito"><button class="btn" onclick="eliminarDelCarrito(${prod.id})" style="color:red"><i class="fa-solid fa-trash-can"></i></button></p></div>
        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarrito2.innerText = ' ' + (carrito.reduce((acc, prod) => acc + prod.cantidad, 0));
    precioTotal.innerText = (carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)).toLocaleString('es-MX')
    document.title = 'Carrito (' + (carrito.reduce((acc, prod) => acc + prod.cantidad, 0)) +') - Soluciones TI León'
}



function vaciarCarrito() {
    Swal.fire({
        title: 'Estás seguro de vaciar tu carrito?',
        showDenyButton: true,
        confirmButtonText: 'Cancelar' + ` <i class="fa-solid fa-ban"></i>`,
        denyButtonText: `Vaciar <i class="fa-solid fa-trash-can"></i>`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Cancelado!', '', 'success')

        } else if (result.isDenied) {
            Swal.fire('Tu carrito se ha vaciado', '', 'info')
            carrito.length = 0;
            actualizarCarrito();

            carrito = JSON.parse(localStorage.clear('carrito'))
        }
    })

}


function btnCarrito() {
    window.location.href = "carrito.html";
}

const testhover = (prodId) => {
    const item = stockProductos.find((prod) => prod.id === prodId)
    document.getElementById(`agregar` + prodId).classList.remove("btn-testOculto");
    $('.producto').mouseleave(function () {
        document.getElementById(`agregar` + prodId).classList.add("btn-testOculto");
    })
}



volver.addEventListener('click', () => {
    window.location.href = "tienda.html"
})


const pagar = (prod) => {
    if(carrito.length === 0 ) {
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
                icon: 'error',
                title: 'Tu carrito está vacío!'
            })
        }, 500);
    } else {
        let concat = "";
        let cuerpo = "";
        let producto = "";
        let precio = "";
        let cantidad = "";
    
        carrito.forEach((prod) => {
    
            producto = prod.nombre
            cantidad = prod.cantidad
            precio = prod.precio.toLocaleString('es-MX')
    
            concat = "%0A - " + producto + ", cantidad: " + cantidad + " " + ", precio: " + "$" + precio + ".00 MXN" + concat;
    
        })
        precioTotalSuma = (carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)).toLocaleString('es-MX')
    
        // cuerpo = "Hola, escribo para obtener más información de: " + concat + "con un total de: ";
        cuerpo = "Hola, escribo para obtener más información sobre la compra de:%0A%0A *PRODUCTOS* %0A" + concat + "%0A%0ACon un total de: " + "*$" + precioTotalSuma.toLocaleString('es-MX') + ".00 MXN*.";
    
        window.location.href = "https://wa.me/524775876555?text=" + cuerpo;
    }

}



