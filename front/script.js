import { sendItem, activePasarela } from "./helpers.js";

const d = document,
    seccionProductos = d.querySelector('.productos'),
    seccionCarrito = d.querySelector('.carrito-layout'),
    totalCarrito = d.querySelector('.total-carrito'),
    opcionesCategorias = d.querySelector('.opciones-categorias');
    
var precioCarrito = 0,
    indexes = [];

const productos = [
    {id: 1, categoria: 'bebidas', titulo: 'Coca Cola 1lt', precio: 1400, enlace: 'https://http2.mlstatic.com/D_NQ_NP_996000-MLA51197971619_082022-O.webp'},
    {id: 2, categoria: 'bebidas', titulo: 'Sprite 3lt', precio: 3900, enlace: 'https://alberdisa.vteximg.com.br/arquivos/ids/174069-1000-1000/Gaseosa-Sprite-x-3-Lt.png?v=638146577437100000'},
    {id: 3, categoria: 'alimentos', titulo: 'Fideo La Caserona', precio: 1200, enlace: 'https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/2540676_f.jpg'},
    {id: 4, categoria: 'alimentos', titulo: 'Arroz Gallo Oro', precio: 2500, enlace: 'https://masonlineprod.vtexassets.com/arquivos/ids/231041/front-view-26868.jpg?v=637859470915700000'},
    {id: 5, categoria: 'bebidas', titulo: 'Agua Mineral 2lt', precio: 900, enlace: 'https://dcdn.mitiendanube.com/stores/001/151/835/products/77927990000971-38ea3e9535f91d68f216745868299335-640-0.jpg'},
    {id: 6, categoria: 'alimentos', titulo: 'Aceite de Oliva Virgen Extra', precio: 3500, enlace: 'https://masonlineprod.vtexassets.com/arquivos/ids/230978/front-view-26832.jpg?v=637859470665070000'},
    {id: 7, categoria: 'bebidas', titulo: 'Pepsi 2.5lt', precio: 3100, enlace: 'https://http2.mlstatic.com/D_NQ_NP_796584-MLM49360572956_032022-O.webp'},
    {id: 8, categoria: 'alimentos', titulo: 'Harina de Trigo 1kg', precio: 800, enlace: 'https://d3340tyzmtlo4u.cloudfront.net/users/864/images/detailed/13/Favorita_Harina_de_Trigo_Enriquecida_Tipo_000,_1_kg.webp'},
    {id: 9, categoria: 'bebidas', titulo: 'Jugo de Naranja 1lt', precio: 1800, enlace: 'https://jumboargentina.vtexassets.com/arquivos/ids/770839/Ades-Soja-Jugo-De-Naranja-1-L-1-17842.jpg?v=638128606018400000'},
    {id: 10, categoria: 'alimentos', titulo: 'Leche Descremada 1lt', precio: 1200, enlace: 'https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/3263432_f.jpg'},
    {id: 11, categoria: 'bebidas', titulo: 'Cerveza Stella Artois 6 pack', precio: 4500, enlace: 'https://jumboargentina.vtexassets.com/arquivos/ids/611945/Cerveza-Rubia-Stella-Artois-6-Pack-473-Ml-Lata-1-770942.jpg'},
    {id: 12, categoria: 'alimentos', titulo: 'Atún en Lata', precio: 2600, enlace: 'https://carrefourar.vtexassets.com/arquivos/ids/381220/7790580138769_E01.jpg?v=638315050151870000'},
    {id: 13, categoria: 'bebidas', titulo: 'Vino Tinto Reserva 750ml', precio: 2800, enlace: 'https://walmartcr.vtexassets.com/arquivos/ids/508075/Vino-Riunite-Lambrusco-750ml-1-36479.jpg?v=638416007130170000'},
    {id: 14, categoria: 'alimentos', titulo: 'Azúcar Blanca 1kg', precio: 1000, enlace: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrRDKhIYGG67X6cCZkzVUzlBVB3O8w-2YPCOJJvC66lg&s'},
    {id: 15, categoria: 'bebidas', titulo: 'Gatorade 500ml', precio: 1200, enlace: 'https://cdn11.bigcommerce.com/s-b156nxvmdp/images/stencil/1280x1280/products/405/688/unnamed__26125.1691005562.jpg?c=1'},
    {id: 16, categoria: 'alimentos', titulo: 'Chocolate Amargo 100g', precio: 700, enlace:'https://jumbo.vtexassets.com/arquivos/ids/467625/Chocolate-barra-extra-fino-dark-amargo-70---cacao-100-g.jpg?v=637782183860800000'},
    {id: 17, categoria: 'bebidas', titulo: 'Té Verde 50 bolsitas', precio: 1500, enlace: 'https://http2.mlstatic.com/D_NQ_NP_979308-MLC51220969836_082022-O.webp'},
    {id: 18, categoria: 'alimentos', titulo: 'Miel de Abeja 500g', precio: 2000, enlace: 'https://http2.mlstatic.com/D_NQ_NP_825804-MLU72700584287_112023-O.webp'},
    {id: 19, categoria: 'bebidas', titulo: 'Café en Grano 250g', precio: 3500, enlace: 'https://http2.mlstatic.com/D_NQ_NP_750467-MLA49314584959_032022-O.webp'},
    {id: 20, categoria: 'alimentos', titulo: 'Salsa de Tomate Casera 500ml', precio: 1300, enlace: 'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750100658494L.jpg'}
];

function configPrecio(monto, operador) {
    operador == "+" ? precioCarrito = precioCarrito + monto : precioCarrito = precioCarrito - monto;
};

function renderizarProductos() {
    setTimeout(() => {
        d.querySelectorAll(".item-producto").forEach(prod => {
            prod.classList.add("active");
        });
    }, 10);
};

function loadProductos() {
    let button;
    productos.forEach(producto => {
        if (indexes.includes(producto.id)) {
            button = `<button id='${String(producto.id)}' class='agregar-carrito' disabled="true">Agregar al carrito</button>`;
        } else {
            button  = `<button id='${String(producto.id)}' class='agregar-carrito'>Agregar al carrito</button>`;
        };
        seccionProductos.insertAdjacentHTML('beforeend', `<div class='item-producto'>
            <div class='imagen-producto'>
                <img src="${producto.enlace}" alt="">
            </div>
            <h3>${producto.titulo}</h3>
            <p>$${String(producto.precio)} ARS</p>
            ${button}
        </div>`);
        renderizarProductos();
    });
};

function renderizarTotal() {
    totalCarrito.textContent = `Total: $${String(precioCarrito)} ARS`;
};

function actCarritoByEvent(productos, e) {
    productos.forEach(producto => {
        if (producto.id == e.target.getAttribute('id')) {
            indexes.push(producto.id);
            configPrecio(producto.precio, "+");
            sendItem(producto, "+");
            document.getElementById(`${String(producto.id)}`).setAttribute('disabled', true);
            let string = `<div class='producto-carrito productocarrito-${producto.id}'>
                <p>${producto.titulo}</p>
                <button class='sumarstock sumarstock-${producto.id}'>+</button>
                <span class='conteostock-${producto.id}'>1</span>
                <button class='restarstock restarstock-${producto.id}'>-</button>
                <button class='borrar-carrito borrarcarrito-${producto.id}'>Borrar del carrito</button>
            </div>`;
            totalCarrito.insertAdjacentHTML('beforebegin', string);
            renderizarTotal();
            document.querySelector(".list-products").insertAdjacentHTML("beforeend", string)
            seccionCarrito.classList.add("active");
        };
    });
};

d.addEventListener('click', e => {
    if (e.target.matches('.agregar-carrito')) {
        actCarritoByEvent(productos, e);
    };

    if (e.target.matches('.sumarstock')) {
        let idProducto = e.target.classList[1].split('-')[1];
        let conteoProducts = document.querySelectorAll(`.conteostock-${idProducto}`);
        
        conteoProducts.forEach(product => {
            let conteoActual = Number(product.textContent);
            product.textContent = String(conteoActual += 1);
        })
    
        let productsInCarts = document.querySelectorAll(`.productocarrito-${idProducto}`);
        productsInCarts.forEach(product => {
            product.dataset.stock = product.textContent;
        })
        productos.forEach(producto => {
            if (producto.id == idProducto) {
                configPrecio(producto.precio, "+");
                sendItem(producto, "+");
                renderizarTotal();
            };
        });
    };

    if (e.target.matches('.restarstock')) {
        let idProducto = e.target.classList[1].split('-')[1];
        let producto = document.querySelector(`.conteostock-${idProducto}`);
        let conteoActual = Number(producto.textContent);
        if (conteoActual > 1) {
            producto.textContent = String(conteoActual -= 1);
            document.querySelector(`.productocarrito-${idProducto}`).dataset.stock = producto.textContent;
            productos.forEach(producto => {
                if (producto.id == idProducto) {
                    configPrecio(producto.precio, "-");
                    sendItem(producto, "-");
                    renderizarTotal();
                };
            });
        };
    };

    if (e.target.matches('.borrar-carrito')) {
        let idProducto = e.target.classList[1].split('-')[1];
        let index;
        for (let i = 0; i < indexes.length; i++) {
            if (indexes[i] === idProducto) {
                index = i;
            };
        };
        indexes.splice(index, 1);
        let producto = document.querySelector(`.productocarrito-${idProducto}`);
        producto.remove();
        var stock = Number(producto.dataset.stock);
        productos.forEach(producto => {
            if (producto.id == idProducto) {
                let monto = stock ? producto.precio * stock : producto.precio;
                configPrecio(monto, "-");
                sendItem(producto, "0", stock);
                renderizarTotal();
            };
        });
        document.getElementById(idProducto).removeAttribute('disabled');
    };

    if (e.target.matches(".abrir-carrito") || e.target.matches(".cerrar-carrito")) {
        seccionCarrito.classList.toggle("active");
    };

    if (e.target.matches(".opcion-categorias")) {
      opcionesCategorias.classList.toggle("active");
    };

    if (e.target.matches(".categoria")) {
        let categoria = e.target.textContent.toLowerCase();
        seccionProductos.innerHTML = "";
        productos.forEach(producto => {
            if (producto.categoria === categoria) {
                seccionProductos.insertAdjacentHTML('beforeend', `<div class='item-producto'>
                    <div class='imagen-producto'>
                        <img src="${producto.enlace}" alt="">
                    </div>
                    <h3>${producto.titulo}</h3>
                    <p>$${String(producto.precio)} ARS</p>
                    <button id='${String(producto.id)}' class='agregar-carrito'>Agregar al carrito</button>
                </div>`);
                renderizarProductos();
            };
        });
    };

    if (e.target.matches(".logo-inicio") || e.target.matches(".img-logo") || e.target.matches(".todos")) {
        seccionProductos.innerHTML = "";
        loadProductos();
    };

    if (e.target.matches(".btn-pasarela")) {
        activePasarela(seccionProductos);
    };
});

d.querySelector(".input-search").addEventListener("input", (e) => {
    seccionProductos.innerHTML = ""
    productos.forEach(producto => {
        if (producto.titulo.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
            seccionProductos.insertAdjacentHTML('beforeend', `<div class='item-producto'>
            <div class='imagen-producto'>
                <img src="${producto.enlace}" alt="">
            </div>
            <h3>${producto.titulo}</h3>
            <p>$${String(producto.precio)} ARS</p>
            <button id='${String(producto.id)}' class='agregar-carrito'>Agregar al carrito</button>
        </div>`);
        renderizarProductos();
        };
    });
});

d.addEventListener("DOMContentLoaded", () => {
    loadProductos();
    fetch("/reset");
})