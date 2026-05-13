document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    document.getElementById('checkout-form').addEventListener('submit', processOrder);
});

function displayCartItems() {
    const cart = getCart();
    const cartItemsDiv = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty">Your cart is empty</p>';
        totalSpan.textContent = '0.00';
        return;
    }

    const itemsHTML = cart.map(item => `
        <div class="order-item">
            <div>
                <strong>${item.product_name}</strong>
                <br>
                Qty: ${item.quantity} x $${item.price.toFixed(2)}
            </div>
            <div>
                $${(item.quantity * item.price).toFixed(2)}
                <br>
                <button type="button" class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="removeFromCart(${item.product_id}); displayCartItems();">Remove</button>
            </div>
        </div>
    `).join('');

    cartItemsDiv.innerHTML = itemsHTML;
    totalSpan.textContent = getCartTotal();
}

function processOrder(event) {
    event.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const orderData = {
        customer_name: name,
        customer_email: email,
        shipping_address: address,
        items: cart.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity
        }))
    };

    fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Order processing failed');
        return response.json();
    })
    .then(order => {
        localStorage.removeItem('retailhub_cart');
        window.location.href = `/orders/${order.id}`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to process order. Please try again.');
    });
}
