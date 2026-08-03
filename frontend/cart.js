const cartContainer = document.getElementById('cart-container');
const totalEl = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout');
const shopMoreBtn = document.getElementById('shopMore');

let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

const getPriceValue = (price) => {
  if (typeof price === 'number') {
    return price;
  }

  const numericPrice = Number(String(price).replace('$', ''));
  return Number.isNaN(numericPrice) ? 0 : numericPrice;
};

function renderCart() {
  if (!cartContainer || !totalEl) {
    return;
  }

  cartContainer.innerHTML = '';
  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty</p>';
    totalEl.textContent = '0';
    return;
  }

  cartItems.forEach((item, index) => {
    total += getPriceValue(item.price);

    const card = document.createElement('div');

    card.className = `
      flex gap-4 bg-white p-4 rounded-lg shadow items-center justify-between
    `;

    card.innerHTML = `
      <div class="flex items-center gap-4">
        <img src="${item.image}" class="h-auto object-cover rounded w-20 h-auto">
        <div class="flex flex-col">
          <h3 class="font-semibold">${item.name}</h3>
          <p class="text-gray-700 text-sm mt-1">${item.description || 'No description'}</p>
          <p class="text-gray-700 font-semibold mt-2">$${getPriceValue(item.price).toFixed(2)}</p>
        </div>
      </div>

      <button
        class="remove-btn bg-red-500 hover:bg-red-600 text-white px-3 py-2 transition duration-300 ease rounded-md shadow-lg"
        data-index="${index}">
        <i class="fas fa-close"></i>
      </button>
    `;

    cartContainer.appendChild(card);
  });

  totalEl.textContent = total.toFixed(2);
}

renderCart();

if (cartContainer) {
  cartContainer.addEventListener('click', (event) => {
    const removeButton = event.target.closest('.remove-btn');

    if (removeButton) {
      const index = Number(removeButton.dataset.index);

      cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      renderCart();
    }
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }

    alert('Order placed');
    localStorage.removeItem('cartItems');
    cartItems = [];
    renderCart();
  });
}

if (shopMoreBtn) {
  shopMoreBtn.addEventListener('click', () => {
    window.location.href = 'product.html';
  });
}