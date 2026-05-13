let currentFilter = 'all';

function loadProducts(category = null) {
    const url = category && category !== 'all' ? `/api/products?category=${category}` : '/api/products';

    fetch(url)
        .then(response => response.json())
        .then(products => {
            renderProducts(products);
        })
        .catch(error => {
            console.error('Error loading products:', error);
            document.getElementById('products-grid').innerHTML = '<p class="error">Failed to load products</p>';
        });
}

function renderProducts(products) {
    const grid = document.getElementById('products-grid');

    if (products.length === 0) {
        grid.innerHTML = '<p class="empty">No products found</p>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">📦</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-stock">Stock: ${product.stock}</div>
                ${product.stock > 0
                    ? `<button class="btn btn-primary add-to-cart-btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>`
                    : `<button class="btn btn-secondary add-to-cart-btn" disabled>Out of Stock</button>`
                }
            </div>
        </div>
    `).join('');
}

function filterProducts(category) {
    currentFilter = category;

    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    loadProducts(category === 'all' ? null : category);
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
