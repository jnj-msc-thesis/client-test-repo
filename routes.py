from flask import Blueprint, render_template, request, jsonify
from database import db
from models import Product, Order, OrderItem

web_bp = Blueprint('web', __name__)
api_bp = Blueprint('api', __name__)


@web_bp.route('/')
def home():
    return render_template('index.html')


@web_bp.route('/products')
def products():
    return render_template('products.html')


@web_bp.route('/checkout')
def checkout():
    return render_template('checkout.html')


@web_bp.route('/orders/<int:order_id>')
def order_confirmation(order_id):
    return render_template('confirmation.html', order_id=order_id)


@api_bp.route('/products', methods=['GET'])
def get_products():
    category = request.args.get('category')

    if category:
        products = Product.query.filter_by(category=category).all()
    else:
        products = Product.query.all()

    return jsonify([product.to_dict() for product in products])


@api_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())


@api_bp.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()

    try:
        order = Order(
            customer_name=data['customer_name'],
            customer_email=data['customer_email'],
            shipping_address=data['shipping_address'],
            total_amount=0
        )

        total = 0
        for item in data['items']:
            product = Product.query.get(item['product_id'])
            if not product:
                return jsonify({'error': f'Product {item["product_id"]} not found'}), 404

            if product.stock < item['quantity']:
                return jsonify({'error': f'Insufficient stock for {product.name}'}), 400

            order_item = OrderItem(
                product_id=product.id,
                quantity=item['quantity'],
                price_at_purchase=product.price
            )
            order.items.append(order_item)
            total += product.price * item['quantity']
            product.stock -= item['quantity']

        order.total_amount = total
        db.session.add(order)
        db.session.commit()

        return jsonify(order.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@api_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify(order.to_dict())


@api_bp.route('/orders/<int:order_id>', methods=['PATCH'])
def update_order_status(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json()

    if 'status' in data:
        order.status = data['status']
        db.session.commit()

    return jsonify(order.to_dict())
