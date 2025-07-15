let products = JSON.parse(localStorage.getItem('products')) || [];

// Function to add a product
function addProduct() {
  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;

  if (name && price) {
    const product = { id: Date.now(), name, price: parseFloat(price) };
    products.push(product);
    saveToLocalStorage();
    displayProducts();
    clearInputs();
  } else {
    alert('Please enter both name and price.');
  }
}

// Function to save products to local storage
function saveToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

// Function to display products
function displayProducts() {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  if (products.length == 0) {
    productList.innerHTML = 'You do not any have products';
    document.getElementById('filterInput').style.visibility = 'hidden';
  } else {
    document.getElementById('filterInput').style.visibility = 'visible';
  }
  products.forEach((product) => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
    li.appendChild(createUpdateButton(product));
    li.appendChild(createDeleteButton(product.id));
    productList.appendChild(li);
  });
}

// Function to create a delete button
function createDeleteButton(id) {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.onclick = () => deleteProduct(id);
  return button;
}

// Function to create a update button
function createUpdateButton(id) {
  const button = document.createElement('button');
  button.textContent = 'Update';
  button.onclick = () => updateProduct(id);
  return button;
}

// Function to delete a product
function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);
  saveToLocalStorage();
  displayProducts();
}

// Function to update a product
function updateProduct(product) {
  const newName = prompt('Enter new product name:', product.name);
  const newPrice = parseFloat(
    prompt('Enter new product price:', product.price)
  );

  if (newName && !isNaN(newPrice)) {
    product.name = newName;
    product.price = newPrice;
    saveToLocalStorage();
    displayProducts();
  } else {
    alert('Please enter valid details.');
  }
}

// Function to filter products
function filterProducts() {
  const filterValue = document
    .getElementById('filterInput')
    .value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterValue)
  );
  displayFilteredProducts(filteredProducts);
}

// Function to display filtered products
function displayFilteredProducts(filteredProducts) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  filteredProducts.forEach((product) => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
    li.appendChild(createUpdateButton(product));
    li.appendChild(createDeleteButton(product.id));

    productList.appendChild(li);
  });
}

// Function to clear input fields
function clearInputs() {
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
}

// Initial display of products
displayProducts();
