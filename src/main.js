// Selecciona elementos HTML por su ID y almacena las referencias en variables
const productGrid = document.getElementById('product-grid');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const clearButton = document.getElementById('clear-button');
const orderHistory = document.getElementById('order-history');

// Define una clase llamada "Product" para representar productos
class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }

    // Genera una tarjeta de producto en el DOM
  generateProductCard() {
    const card = document.createElement('div');
    card.classList.add('bg-white', 'h-64', 'rounded', 'p-4', 'shadow', 'product-card');
    card.innerHTML = `
      <h2 class="text-xl font-bold mb-2">${this.name}</h2>
      <p class="mb-2">Descripción del ${this.name}</p>
      <p class="text-gray-500">$${this.price}</p>
      <button class="add-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Agregar al carrito</button>
    `;

    // Agrega un manejador de eventos al botón "Agregar al carrito"
    const addButton = card.querySelector('.add-button');
    addButton.addEventListener('click', () => addToCart(this));

    return card;
  }
}