const CART_STORAGE_KEY = 'retailhub_cart';

function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, productName, productPrice) {
    const cart = getCart();
    const existingItem = cart.find(item => item.product_id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            product_id: productId,
            product_name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    saveCart(cart);
    alert(`${productName} added to cart!`);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.product_id !== productId);
    saveCart(cart);
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = `(${count})`;
}

function showCart() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty');
    } else {
        const items = cart.map(item => `${item.product_name} x${item.quantity}`).join('\n');
        alert('Cart items:\n' + items);
    }
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

document.addEventListener('DOMContentLoaded', updateCartCount);
