const productos = [
    //Monitores
    {
        id: "monitor-01",
        titulo: "Monitor 01",
        imagen: "./img/monitores/01.jpg",
        categoria: {
            nombre: "Monitores",
            id: "monitores"
        },
        precio: 12000
    },
    {
        id: "monitor-02",
        titulo: "Monitor 02",
        imagen: "./img/monitores/02.jpg",
        categoria: {
            nombre: "Monitores",
            id: "monitores"
        },
        precio: 98000
    },
    {
        id: "monitor-03",
        titulo: "Monitor 03",
        imagen: "./img/monitores/03.jpg",
        categoria: {
            nombre: "Monitores",
            id: "monitores"
        },
        precio: 85000
    },
    {
        id: "monitor-04",
        titulo: "Monitor 04",
        imagen: "./img/monitores/04.jpg",
        categoria: {
            nombre: "Monitores",
            id: "monitores"
        },
        precio: 110000
    },
    {
        id: "monitor-05",
        titulo: "Monitor 05",
        imagen: "./img/monitores/05.jpg",
        categoria: {
            nombre: "Monitores",
            id: "monitores"
        },
        precio: 110000
    },
    //Teclados
    {
        id: "teclado-01",
        titulo: "Teclado 01",
        imagen: "./img/teclados/01.jpg",
        categoria: {
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 1200
    },
    {
        id: "teclado-02",
        titulo: "Teclado 02",
        imagen: "./img/teclados/02.jpg",
        categoria: {
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 2000
    },
    {
        id: "teclado-03",
        titulo: "Teclado 03",
        imagen: "./img/teclados/03.jpg",
        categoria: {
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 1700
    },
    {
        id: "teclado-04",
        titulo: "Teclado 04",
        imagen: "./img/teclados/04.jpg",
        categoria: {
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 2500
    },
    {
        id: "teclado-05",
        titulo: "Teclado 05",
        imagen: "./img/teclados/05.jpg",
        categoria: {
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 2100
    },
    {
        id: "teclado-06",
        titulo: "Teclado 06",
        imagen: "./img/teclados/06.jpg",
        categoria: {
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 2100
    },
    {
        id: "teclado-07",
        titulo: "Teclado 07",
        imagen: "./img/teclados/07.jpg",
        categoria: {
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 2100
    },
    {
        id: "teclado-08",
        titulo: "Teclado 08",
        imagen: "./img/teclados/08.jpg",
        categoria: {
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 2100
    },
    //Notebooks
    {
        id: "notebook-01",
        titulo: "Notebook 01",
        imagen: "./img/notebooks/01.jpg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 150000
    },
    {
        id: "notebook-02",
        titulo: "Notebook 02",
        imagen: "./img/notebooks/02.jpg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 190000
    },
    {
        id: "notebook-03",
        titulo: "Notebook 03",
        imagen: "./img/notebooks/03.jpg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 280000
    },
    {
        id: "notebook-04",
        titulo: "Notebook 04",
        imagen: "./img/notebooks/04.jpg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 310000
    },
    {
        id: "notebook-05",
        titulo: "Notebook 05",
        imagen: "./img/notebooks/05.jpg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 160000
    }

];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();

}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
});


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
};

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito (e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;

    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};


function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
};

