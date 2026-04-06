const productForm = document.getElementById('productForm');
const productGrid = document.getElementById('productGrid');

// LocalStorage එකෙන් data load කිරීම
let products = JSON.parse(localStorage.getItem('agriProducts')) || [];

// Page එක load වෙනකොට තියෙන products පෙන්වීම
displayProducts();

productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = {
        id: Date.now(),
        name: document.getElementById('pName').value,
        price: document.getElementById('pPrice').value,
        category: document.getElementById('pCategory').value
    };

    products.push(newProduct);
    localStorage.setItem('agriProducts', JSON.stringify(products));
    
    productForm.reset();
    displayProducts();
});

function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <span class="tag">${product.category}</span>
            <h4>${product.name}</h4>
            <p class="price">Rs. ${product.price}</p>
            <button onclick="removeProduct(${product.id})" style="background:#e74c3c; font-size:10px; padding:5px;">Remove</button>
        `;
        productGrid.appendChild(card);
    });
}

function removeProduct(id) {
    products = products.filter(p => p.id !== id);
    localStorage.setItem('agriProducts', JSON.stringify(products));
    displayProducts();
}