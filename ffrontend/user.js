const joinUsButton = document.getElementById('join-us');
const loggedInUser = localStorage.getItem('loggedInUser');
const cart = document.getElementById('cartItem');
const shopNow = document.getElementById('shopNow');
const logo = document.getElementById('logo');
const cartLogin = document.getElementById('cartLogin');

const syncCartCount = () => {
  if (!cart) {
    return;
  }

  const isLoggedIn = Boolean(localStorage.getItem('loggedInUser'));

  if (!isLoggedIn) {
    cart.textContent = '0';
    return;
  }

  const savedItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  cart.textContent = Array.isArray(savedItems) ? savedItems.length : 0;
};

if (joinUsButton) {
  if (loggedInUser) {
    joinUsButton.innerHTML = `
      ${loggedInUser}
      <i class="fas fa-sign-out-alt ml-2 hover:scale-102 hover:text-red-500"></i>
    `;

    joinUsButton.addEventListener('click', () => {
      const confirmLogout = confirm('Do you want to logout?');

      if (confirmLogout) {
        localStorage.removeItem('loggedInUser');
        alert('You have been logged out successfully.');
        window.location.href = 'index.html';
      }
    });
  } else {
    joinUsButton.innerHTML = 'Join Us <i class="fas fa-user-plus ml-2"></i>';

    joinUsButton.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
}

syncCartCount();

document.addEventListener('click', (event) => {
  const button = event.target.closest('.buy-button');

  if (!button) {
    return;
  }

  const productCard = button.closest('.product-card');

  if (!productCard) {
    return;
  }

  if (!loggedInUser) {
    alert('Please login to continue!');
    window.location.href = 'login.html';
    return;
  }

  const shouldAdd = confirm('Do you want to add this item to cart?');

  if (!shouldAdd) {
    alert('Item was not added to cart.');
    return;
  }

  const product = {
    name: productCard.dataset.name,
    description: productCard.dataset.description,
    price: productCard.dataset.price,
    image: productCard.dataset.image,
  };

  const savedItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

  savedItems.push(product);
  localStorage.setItem('cartItems', JSON.stringify(savedItems));
  syncCartCount();
  alert('Order successful! Items added to cart.');
  button.textContent = 'Added';
  button.disabled = true;
});

if (shopNow) {
  shopNow.addEventListener('click', () => {
    window.location.href = 'product.html';
  });
}

if (logo) {
  logo.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

cartLogin.addEventListener('click', () => {
  if(loggedInUser) {
    window.location.href = 'cart.html';
    cart.innerHTML = '0';
  } else {
    alert('Please login to continue!');
  }
})