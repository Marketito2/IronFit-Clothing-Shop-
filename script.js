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
            {name:"Negro", code:"#000", img:"img/prod1_black_1.jpg", gallery:["img/prod1_black_1.jpg","img/prod1_black_2.jpg"]},
            {name:"Blanco", code:"#fff", img:"img/prod1_white_1.jpg", gallery:["img/prod1_white_1.jpg","img/prod1_white_2.jpg"]}
        ],
        gallery: ["img/prod1_1.jpg","img/prod1_2.jpg","img/prod1_3.jpg"]
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
        gallery: ["img/onyx_1.jpg","img/onyx_2.jpg"]
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
        gallery: ["img/tank_1.jpg","img/tank_2.jpg"]
    }
];

// -------------------------------
// RENDER DE PRODUCTOS
// -------------------------------
const container = document.getElementById("productContainer");

products.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Left side
    const leftDiv = document.createElement("div");
    leftDiv.className = "product-left";

    const thumbRow = document.createElement("div");
    thumbRow.className = "thumb-row";
    thumbRow.id = `thumbRow${index}`;

    const mainImg = document.createElement("img");
    mainImg.id = `main${index}`;
    mainImg.src = p.gallery[0];
    mainImg.addEventListener("click", () => openModal(p.gallery[0]));

    // Mini-galería inicial
    p.gallery.forEach(imgSrc => {
        const thumb = document.createElement("img");
        thumb.src = imgSrc;
        thumb.addEventListener("click", () => openModal(imgSrc));
        thumbRow.appendChild(thumb);
    });

    leftDiv.appendChild(thumbRow);
    leftDiv.appendChild(mainImg);

    // Right side
    const rightDiv = document.createElement("div");
    rightDiv.className = "product-right";

    const title = document.createElement("h2");
    title.textContent = p.name;

    const desc = document.createElement("p");
    desc.textContent = p.description;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `${p.price} €`;

    const sizeLabel = document.createElement("label");
    sizeLabel.textContent = "Talla:";

    const sizeSelect = document.createElement("select");
    sizeSelect.id = `size${index}`;
    p.sizes.forEach(s => {
        const option = document.createElement("option");
        option.textContent = s;
        sizeSelect.appendChild(option);
    });

    const colorLabel = document.createElement("p");
    colorLabel.textContent = "Color:";

    const colorDiv = document.createElement("div");
    colorDiv.className = "color-selector";

    p.colors.forEach(c => {
        const colorBtn = document.createElement("div");
        colorBtn.className = "color";
        colorBtn.title = c.name;
        colorBtn.style.background = c.code;

        colorBtn.addEventListener("click", () => {
            mainImg.src = c.img;
            if(c.gallery){
                thumbRow.innerHTML = "";
                c.gallery.forEach(g => {
                    const thumb = document.createElement("img");
                    thumb.src = g;
                    thumb.addEventListener("click", () => openModal(g));
                    thumbRow.appendChild(thumb);
                });
            }
        });

        colorDiv.appendChild(colorBtn);
    });

    const addBtn = document.createElement("button");
    addBtn.className = "btn";
    addBtn.textContent = "Añadir al carrito";
    addBtn.addEventListener("click", () => addToCart(index));

    rightDiv.append(title, desc, price, sizeLabel, sizeSelect, colorLabel, colorDiv, addBtn);

    card.append(leftDiv, rightDiv);
    container.appendChild(card);
});

// -------------------------------
// MODAL
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
    updateCartPopup();
}

function updateCartPopup(){
    const cartPage = document.getElementById("cartPage");
    const list = document.getElementById("cartItems");

    let total = cart.reduce((acc,p)=> acc + p.price, 0).toFixed(2);

    list.innerHTML = cart.map(p=>`
        <div class="cart-item">
            ${p.name} — ${p.price} €
        </div>
    `).join("") + `<div class="cart-total">Total: ${total} €</div>`;

    document.getElementById("cartBtn").textContent = `🛒 Carrito (${cart.length})`;

    cartPage.style.display = "block";
}

function closeCart(){
    document.getElementById("cartPage").style.display = "none";
}

function openCart(){
    document.getElementById("cartPage").style.display = "block";
}
