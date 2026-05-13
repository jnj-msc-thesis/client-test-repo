from database import db
from models import Product

def seed_products():
    products = [
        Product(
            name='Wireless Headphones',
            description='High-quality wireless headphones with noise cancellation',
            price=79.99,
            stock=50,
            category='Electronics'
        ),
        Product(
            name='USB-C Cable',
            description='Durable USB-C charging cable, 2 meters long',
            price=12.99,
            stock=200,
            category='Accessories'
        ),
        Product(
            name='Laptop Stand',
            description='Adjustable aluminum laptop stand for ergonomic setup',
            price=49.99,
            stock=30,
            category='Office'
        ),
        Product(
            name='Mechanical Keyboard',
            description='RGB mechanical keyboard with custom switches',
            price=129.99,
            stock=25,
            category='Electronics'
        ),
        Product(
            name='Mouse Pad',
            description='Large extended mouse pad with non-slip base',
            price=19.99,
            stock=100,
            category='Accessories'
        ),
        Product(
            name='Monitor Arm',
            description='Single monitor arm mount, VESA compatible',
            price=59.99,
            stock=40,
            category='Office'
        ),
    ]

    for product in products:
        db.session.add(product)

    db.session.commit()
