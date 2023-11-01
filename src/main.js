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

// Define una clase llamada "CartItem" para representar elementos del carrito
class CartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    // Genera un elemento de carrito en el DOM
    generateCartItem() {
      const item = document.createElement('li');
      item.classList.add('cart-item');
      item.dataset.id = this.product.id;
      item.innerHTML = `
        <span>${this.product.name}</span><br>
        <span class="quantity">${this.quantity}</span><br>
        <button class="remove-button bg-red-500 hover-bg-red-700 text-white font-bold py-1 px-2 rounded">Eliminar</button>
      `;
  
      // Agrega un manejador de eventos al botón "Eliminar"
      const removeButton = item.querySelector('.remove-button');
      removeButton.addEventListener('click', () => removeFromCart(this.product));
  
      return item;
    }
  }

// Crea una lista de productos
const products = [
    new Product('1', 'Producto 1', 19.99),
    new Product('2', 'Producto 2', 29.99),
    new Product('3', 'Producto 3', 9.99),
  ];
  
  // Inicializa un carrito vacío
  const cart = [];
  
  // Agrega un producto al carrito
  function addToCart(product) {
    const cartItem = cart.find(item => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push(new CartItem(product, 1));
    }
  
    renderCart(); // Actualiza la vista del carrito
  }

// Elimina un producto del carrito
function removeFromCart(product) {
    const index = cart.findIndex(item => item.product.id === product.id);
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
  
      renderCart(); // Actualiza la vista del carrito
    }
  }
  
  // Vacía el carrito
  function clearCart() {
    cart.length = 0;
    renderCart(); // Actualiza la vista del carrito
  }
  
  // Procesa la compra
  function checkout() {
    if (cart.length === 0) {
      return;
    }

    const orderItems = [...cart];
    const orderTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const orderDate = new Date().toLocaleString();

    // Crea un objeto "Order" y lo agrega al historial de pedidos
    const order = new Order(orderItems, orderTotal, orderDate);
    orderHistory.appendChild(order.generateOrderElement());

    clearCart(); // Vacía el carrito después de la compra
}

// Actualiza la vista del carrito
function renderCart() {
    cartItems.innerHTML = '';
    cartTotal.textContent = '0';
  
    // Agrega elementos de carrito al DOM
    cart.forEach(cartItem => {
      cartItems.appendChild(cartItem.generateCartItem());
    });
  
    // Calcula y muestra el total del carrito
    const total = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
  }

  // Define una clase llamada "Order" para representar un pedido
class Order {
    constructor(items, total, date) {
      this.items = items;
      this.total = total;
      this.date = date;
    }
  
    // Genera un elemento de pedido en el DOM
    generateOrderElement() {
      const orderElement = document.createElement('li');
      orderElement.innerHTML = `
        <p>Pedido realizado el ${this.date}</p>
        <ul>
          ${this.items.map(item => `<li>${item.quantity} x ${item.product.name}</li>`).join('')}
        </ul>
        <p>Total: $${this.total.toFixed(2)}</p>
      `;
  
      return orderElement;
    }
  }