const mp = new MercadoPago('APP_USR-73587133-4f49-4846-b2ad-fa2b6214520e', {
    locale: 'es-AR'
});
const d = document;
const bricksBuilder = mp.bricks();

d.addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = {
        nombre: e.target.nombre.value,
        apellido: e.target.apellido.value,
        email: e.target.email.value,
        ubicacion: e.target.ubicacion.value,
        telefono: e.target.telefono.value
    }
    let res = await fetch(e.target.action, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    let json = await res.json();

    bricksBuilder.create("wallet", "wallet_container", {
        initialization: {
            preferenceId: json.id,
        },
    customization: {
    texts: {
    valueProp: 'smart_option',
    },
    },
    });
});

async function sendItem(item, operador, stock) {
    console.log("AÑADO")
    let product = item;
    product.operador = operador;
    stock ? product.stock = stock : product.stock = 1;

    let res = await fetch("/addItem", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    let json = await res.json();
    console.log(json);
}

function activePasarela(section) {
    section.innerHTML = `<form action="/realizarPago" method="POST">
        <input type="text" name="nombre" placeholder="Nombre">
        <input type="text" name="apellido" placeholder="Apellido">
        <input type="email" name="email" placeholder="Email">
        <input type="tel" name="telefono" placeholder="Teléfono">
        <input type="text" name="ubicacion" placeholder="Dirección">
        <input type="submit">
    </form>
    <br> 
    <div id="wallet_container"></div> 
    <script src="helpers" type="module"></script>`;
    document.querySelector(".list-products").style.display = "block";
}

export {
    sendItem,
    activePasarela
}