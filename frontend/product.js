const productList = document.getElementById("product-list");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchButton = document.getElementById("searchButton");
const noProductsMessage = document.getElementById("no-products");
const loggedInUser = localStorage.getItem('loggedInUser');

const products = [
  {
    image: "images/tshirt1.jpg",
    name: "Harajuku Tee",
    description: "A bold streetwear tee with a graphic print and soft cotton feel.",
    price: 24.99,
    category: "T-Shirt",
  },
  {
    image: "images/tshirt2.jpg",
    name: "Cat Print Tee",
    description: "A playful tee with a cute cat graphic for everyday comfort.",
    price: 21.5,
    category: "T-Shirt",
  },
  {
    image: "images/tshirt3.jpg",
    name: "Anime Girl Tee",
    description: "A stylish anime-inspired shirt with a relaxed fit.",
    price: 26.25,
    category: "T-Shirt",
  },
  {
    image: "images/tshirt4.jpg",
    name: "Cloudy Blue Tee",
    description: "A lightweight tee designed for casual layering and all-day comfort.",
    price: 19.99,
    category: "T-Shirt",
  },
  {
    image: "images/tshirt5.jpg",
    name: "Vintage Street Tee",
    description: "A retro-inspired shirt with faded details and a premium hand feel.",
    price: 23.75,
    category: "T-Shirt",
  },
  {
    image: "images/tshirt6.jpg",
    name: "Minimalist Tee",
    description: "A clean, modern tee with a simple cut and smooth finish.",
    price: 18.5,
    category: "T-Shirt",
  },
  {
    image: "images/jacket1.jpg",
    name: "Urban Bomber",
    description: "A sharp bomber jacket with a polished look for cool weather.",
    price: 54.99,
    category: "Jacket",
  },
  {
    image: "images/jacket2.jpg",
    name: "Trail Runner Jacket",
    description: "A lightweight jacket built for movement and everyday wear.",
    price: 48.25,
    category: "Jacket",
  },
  {
    image: "images/pants.jpg",
    name: "Relaxed Cargo Pants",
    description: "Comfortable cargo pants with utility pockets and soft stretch.",
    price: 33.75,
    category: "Pants",
  },
  {
    image: "images/pants2.jpg",
    name: "Tailored Linen Pants",
    description: "A breathable pair of pants with a polished and relaxed silhouette.",
    price: 35.99,
    category: "Pants",
  },
  {
    image: "images/shoes.jpg",
    name: "Mellow 1 TXR 34",
    description: "Street-ready sneakers with cushioned comfort and modern styling.",
    price: 59.99,
    category: "Shoes",
  },
  {
    image: "images/shoes2.jpg",
    name: "Plain Court Sneaker",
    description: "A clean sneaker with a simple design for easy daily wear.",
    price: 42.5,
    category: "Shoes",
  },
  {
    image: "images/shoes3.jpg",
    name: "Classic Runner",
    description: "A dependable running shoe with breathable support and grip.",
    price: 49.99,
    category: "Shoes",
  },
  {
    image: "images/shoes4.jpg",
    name: "Urban Slide",
    description: "An easy slip-on shoe designed for lightweight comfort.",
    price: 31.25,
    category: "Shoes",
  },
  {
    image: "images/shoes5.jpg",
    name: "Street Court Shoe",
    description: "A versatile sneaker with a fresh design that pairs with any outfit.",
    price: 47.75,
    category: "Shoes",
  },
  {
    image: "images/shirt.jpg",
    name: "Everyday Shirt",
    description: "A crisp shirt with a relaxed fit and premium finishing touches.",
    price: 28.99,
    category: "Accessories",
  },
];

const shuffleItems = (items) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

const filteredProducts = shuffleItems(products);

const renderProducts = () => {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  const visibleProducts = filteredProducts.filter((product) => {
    const matchesQuery = [
      product.name,
      product.description,
      product.category,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query);

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  productList.innerHTML = "";
  noProductsMessage.classList.toggle("hidden", visibleProducts.length !== 0);

  visibleProducts.forEach((product) => {
    const card = document.createElement("div");

    card.className = `flex flex-col h-full product-card bg-white p-4 rounded-xl hover:shadow-lg hover:scale-[1.01] hover:-translate-y-1 transition duration-300`;
    card.dataset.name = product.name;
    card.dataset.description = product.description;
    card.dataset.price = product.price;
    card.dataset.image = product.image;
    card.dataset.category = product.category;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-52 object-cover rounded-lg">

      <div class="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
          <p class="mt-1 inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
            ${product.category}
          </p>
        </div>
      </div>

      <p class="text-gray-500 text-sm mt-3">${product.description}</p>

      <div class="flex justify-between items-center mt-auto pt-4">
        <span class="text-green-600 font-bold">
          $${product.price.toFixed(2)}
        </span>

        <button class="buy-button bg-blue-500 text-white px-3 py-1 cursor-pointer rounded-lg transition-all duration-200 ease hover:scale-104 hover:bg-blue-600">
          Add <i class="fas fa-shopping-cart ml-1"></i>
        </button>
      </div>
    `;

    productList.appendChild(card);
  });
};

searchButton.addEventListener("click", renderProducts);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    renderProducts();
  }
});
categoryFilter.addEventListener("change", renderProducts);

renderProducts();