const products = [
  { name: "Mint", slug: "mint", image: "images/mint.jpg", description: "Refreshing mint green pop for summer.", price: 12, flavor: "green" },
  { name: "Strawberry", slug: "strawberry", image: "images/strawberry.jpg", description: "Bright pink with speckles of fun.", price: 12, flavor: "pink" },
  { name: "French Vanilla", slug: "french-vanilla", image: "images/french-vanilla.jpg", description: "Chic off-white perfect for French manicures.", price: 12, flavor: "neutral" },
  { name: "Cookies n’ Cream", slug: "cookies", image: "images/cookies.jpg", description: "Trendy speckled black-and-white style.", price: 12, flavor: "neutral" },
  { name: "Triple Chocolate", slug: "chocolate", image: "images/chocolate.jpg", description: "Rich and deep brown for elegant looks.", price: 12, flavor: "brown" },
  { name: "Lemonade", slug: "lemonade", image: "images/lemonade.jpg", description: "Pastel yellow like fresh summer drinks.", price: 12, flavor: "yellow" },
  { name: "Blue Razz", slug: "blue-razz", image: "images/bluerazz.jpg", description: "Fun, bright blue hue with a twist.", price: 12, flavor: "blue" },
  { name: "Cherry Bomb", slug: "cherry", image: "images/cherrybomb.jpg", description: "Bold red with a juicy pop.", price: 12, flavor: "red" },
  { name: "Orange Creme", slug: "orange", image: "images/orangecreme.jpg", description: "Smooth orange-peach pastel for summer.", price: 12, flavor: "orange" },
  { name: "Cotton Candy", slug: "cotton-candy", image: "images/cottoncandy.jpg", description: "Pastel blue with dreamy vibes.", price: 12, flavor: "blue" },
  { name: "Whipped Cream", slug: "whipped", image: "images/whipped.jpg", description: "Matte white with soft finish.", price: 12, flavor: "neutral" },
  { name: "Pistachio", slug: "pistachio", image: "images/pistachio.jpg", description: "Gentle, calming green for spring.", price: 12, flavor: "green" },
  { name: "Ube", slug: "ube", image: "images/ube.jpg", description: "Lavender dream with Filipino flair.", price: 12, flavor: "purple" },
  { name: "Coffee", slug: "coffee", image: "images/coffee.jpg", description: "Simple brown, perfect for everyday.", price: 12, flavor: "brown" },
  { name: "Sprinkles", slug: "sprinkles", image: "images/sprinkles.jpg", description: "Clear gloss with glittery bits.", price: 12, flavor: "multi" },
  { name: "Cherries", slug: "cherries", image: "images/cherries.jpg", description: "Glossy finish with floating cherries.", price: 12, flavor: "red" },
];

let cart = [];

function renderProducts(filter = "all") {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  const filtered = filter === "all" ? products : products.filter(p => p.flavor === filter);

  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <a href="product/${product.slug}.html">
        <img src="${product.image}" alt="${product.name}">
      </a>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>$${product.price.toFixed(2)}</strong></p>
      <button onclick="addToCart('${product.slug}')">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

function addToCart(slug) {
  const item = cart.find(i => i.slug === slug);
  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.slug === slug);
    cart.push({ ...product, qty: 1 });
  }
  updateCartIcon();
  renderCart();
}

function updateCartIcon() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const icon = document.getElementById("cart-icon");
  icon.textContent = `🛒 ${count}`;
}

function renderCart() {
  const sidebar = document.getElementById("cart-items");
  sidebar.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    sidebar.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item) => {
      total += item.price * item.qty;
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${item.name}</strong> x${item.qty} — $${(item.price * item.qty).toFixed(2)}</p>
      `;
      sidebar.appendChild(div);
    });
  }

  document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

function toggleCart() {
  document.getElementById("cart-sidebar").classList.toggle("visible");
}

function setupFilter() {
  const select = document.getElementById("flavorFilter");
  select.addEventListener("change", () => {
    renderProducts(select.value);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupFilter();
  updateCartIcon();
});
