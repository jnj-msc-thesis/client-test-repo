# RetailHub - Online Retail Store

A full-featured online retail store application built with Flask and SQLAlchemy. This project includes product catalog management, shopping cart functionality, and order processing.

## Project Structure

```
.
├── app.py                 # Main Flask application
├── config.py              # Configuration settings
├── database.py            # SQLAlchemy database initialization
├── models.py              # Database models (Product, Order, OrderItem)
├── routes.py              # API and web routes
├── seed_data.py           # Database seed data
├── requirements.txt       # Python dependencies
├── templates/             # HTML templates
│   ├── base.html         # Base template with navigation
│   ├── index.html        # Homepage
│   ├── products.html     # Products listing page
│   ├── checkout.html     # Checkout page
│   └── confirmation.html # Order confirmation page
└── static/
    ├── css/
    │   └── style.css     # Main stylesheet
    └── js/
        ├── cart.js       # Shopping cart functionality
        ├── products.js   # Products page logic
        └── checkout.js   # Checkout page logic
```

## Features

- **Product Catalog**: Browse products by category (Electronics, Accessories, Office)
- **Shopping Cart**: Add/remove items with persistent local storage
- **Order Processing**: Complete checkout with customer information
- **Order Management**: View order details and status
- **Responsive Design**: Mobile-friendly interface

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=<category>` - Filter by category
- `GET /api/products/<id>` - Get specific product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/<id>` - Get order details
- `PATCH /api/orders/<id>` - Update order status

## Getting Started

### Prerequisites
- Python 3.8+
- pip

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd client-test-repo
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

4. Open your browser to `http://localhost:5000`

## Usage

1. **Browse Products**: Navigate to the Shop page to view all products
2. **Filter by Category**: Use category buttons to filter products
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Navigate to checkout, enter shipping information, and place order
5. **Order Confirmation**: View order details and confirmation

## Database

The application uses SQLite for data persistence. The database is automatically initialized on first run with sample products:

- Wireless Headphones
- USB-C Cable
- Laptop Stand
- Mechanical Keyboard
- Mouse Pad
- Monitor Arm

## Notes

- Shopping cart is stored in browser's localStorage
- Orders are persisted in the SQLite database
- Stock is automatically decremented when orders are placed


