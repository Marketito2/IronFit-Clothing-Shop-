// -------------------------------
// LISTA DE PRODUCTOS
// -------------------------------
const products = [
    {
        name: "Camiseta Compresión BreatheDivinity",
        price: 39.99,
        description: "Fabricadas con materiales de alto rendimiento, estas camisetas de compresión de BreatheDivinity se ajustan al cuerpo como una segunda piel, acompañando cada movimiento y ofreciendo soporte donde más lo necesitas. La compresión estratégica ayuda a mejorar la circulación permitiéndote rendir al máximo en cualquier entrenamiento o competición.",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            {name:"Negro", code:"#000", img:"img/prod1_black_1.jpg", gallery: ["img/prod1_black_1.jpg","img/prod1_black_2.jpg"]},
            {name:"Blanco", code:"#fff", img:"img/prod1_white_1.jpg", gallery: ["img/prod1_white_1.jpg","img/prod1_white_2.jpg"]}
        ],
        gallery: [
            "img/prod1_1.jpg",
            "img/prod1_2.jpg",
            "img/prod1_3.jpg"
        ]
    },
    {
        name: "Gymshark Onyx Compression shirt",
        price: 44.99,
        description: "Compresión intensa, diseño Onyx, realza la forma del torso y mejora el rendimiento muscular.",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            {name:"Negro Mate", code:"#111", img:"img/onyx_black.jpg"},
            {name:"Azul Noche", code:"#002244", img:"img/onyx_blue.jpg"}
        ],
        gallery: [
            "img/onyx_1.jpg",
            "img/onyx_2.jpg"
        ]
    },
    {
        name: "Tank Top BreatheDivinity – Negro",
        price: 29.99,
        description: "Ligero, fresco, ideal para entrenamientos de espalda y pecho. Corte atlético.",
        sizes: ["S","M","L"],
        colors: [
            {name:"Negro", code:"#000", img:"img/tank_black.jpg"},
            {name:"Rojo", code:"#c00", img:"img/tank_red.jpg"}
        ],
        gallery: [
            "img/tank_1.jpg",
            "img/tank_2.jpg"
        ]
    }
];

// -------------------------------
// RENDER DE PRODUCTOS
// -------------------------------
const container = document.getElementById("productContainer");

products.forEach((p, index)=>{
    const card = document.createElement("div");
    card.className = "product-card";

    // Creamos la galería principal
    let mainGallery = '';
    if(index === 0){ // Primera camiseta: 3 imágenes principales
        mainGallery = p.gallery.map(g=>`<img src="${g}" onclick="openModal('${g}')">`).join("");
    } else {
        mainGallery = `<img id="main${index}" src="${p.gallery[0]}" onclick="openModal('${p.gallery[0]}')">`;
    }

    // Colores y sus mini-galerías
    let colorSelector = '';
    p.colors.forEach((c,i)=>{
        colorSelector += `
            <div class="color" title="${c.name}" style="background:${c.code}" onclick="
                document.getElementById('main${index}').src='${c.img}';
                ${c.gallery ? `document.getElementById('thumbRow${index}').innerHTML='${c.gallery.map(g=>`<img src=${g} onclick=openModal(\\'${g}\\')>`).join("")}'` : ''}
            "></div>
        `;
    });

    card.innerHTML = `
        <div class="product-left">
            <div id="thumbRow${index}" class="thumb-row">
                ${mainGallery}
            </div>
            <img id="main${index}" src="${p.gallery[0]}" onclick="openModal('${p.gallery[0]}')">
        </div>

        <div class="product-right">
            <h2>${p.name}</h2>
            <p>${p.description}</p>
            <div class="price">${p.price} €</div>

            <label>Talla:</label><br>
            <select id="size${index}">
                ${p.sizes.map(s=>`<option>${s}</option>`).join("")}
            </select>

            <p>Color:</p>
            <div class="color-selector">
                ${colorSelector}
            </div>

            <button class="btn" onclick="addToCart(${index})">Añadir al carrito</button>
        </div>
    `;

    container.appendChild(card);
});

// -------------------------------
// MODAL DE IMÁGENES
// -------------------------------
function openModal(src){
    const modal = document.getElementById("modalBg");
    document.getElementById("modalImg").src = src;
    modal.style.display = "flex";
}
function closeModal(){ 
    document.getElementById("modalBg").style.display = "none"; 
}

// -------------------------------
// CARRITO POPUP
// -------------------------------
let cart = [];

function addToCart(i){
    cart.push(products[i]);
    updateCartPopup();
}

function updateCartPopup(){
    const cartPage = document.getElementById("cartPage");
    const list = document.getElementById("cartItems");

    let total = cart.reduce((acc, p)=> acc + p.price, 0).toFixed(2);

    list.innerHTML = cart.map(p=>`
        <div class="cart-item">
            ${p.name} — ${p.price} €
        </div>
    `).join("") + `<div class="cart-total">Total: ${total} €</div>`;

    cartPage.style.display = "block";
}

function closeCart(){
    document.getElementById("cartPage").style.display = "none";
}
