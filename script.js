// -------------------------------
// LISTA DE PRODUCTOS
// -------------------------------
const products = [
    {
        name: "Camiseta Compresión BreatheDivinity – Negra",
        price: 39.99,
        description: "Compresión profesional, tejido de secado rápido, ajuste anatómico y alta elasticidad para entrenamientos fuertes.",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            {name:"Negro", code:"#000", img:"img/prod1_black.jpg"},
            {name:"Gris", code:"#666", img:"img/prod1_grey.jpg"},
            {name:"Blanco", code:"#fff", img:"img/prod1_white.jpg"}
        ],
        gallery: [
            "img/prod1_1.jpg",
            "img/prod1_2.jpg",
            "img/prod1_3.jpg"
        ]
    },
    {
        name: "Compresión Onyx – Gymshark",
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
    card.innerHTML = `
        <div class="product-left">
            <img id="main${index}" src="${p.gallery[0]}" onclick="openModal('${p.gallery[0]}')">
            <div class="thumb-row">
                ${p.gallery.map(g=>`<img src="${g}" onclick="openModal('${g}')">`).join("")}
            </div>
        </div>

        <div class="product-right">
            <h2>${p.name}</h2>
            <p>${p.description}</p>
            <div class="price">${p.price} €</div>

            <label>Talla:</label><br>
            <select id="size${index}">
                ${p.sizes.map(s=>`<option>${s}</option>`).join("")}
            </select>

            <p><strong>Color:</strong></p>
            <div class="color-selector">
                ${p.colors.map(c=>`
                    <div class="color" style="background:${c.code}" onclick="
                        document.getElementById('main${index}').src='${c.img}'
                    "></div>
                `).join("")}
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
// CARRITO
// -------------------------------
let cart = [];

function addToCart(i){
    cart.push(products[i]);
    document.getElementById("cartBtn").innerHTML = `🛒 Carrito (${cart.length})`;
    openCart();
}

function openCart(){
    document.getElementById("cartPage").style.display = "block";
    const list = document.getElementById("cartItems");

    list.innerHTML = cart.map(p=>`
        <div class="cart-item">
            ${p.name} — ${p.price} €
        </div>
    `).join("");
}

function closeCart(){
    document.getElementById("cartPage").style.display = "none";
}
