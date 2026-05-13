from flask import Flask
from config import Config
from database import db
from routes import api_bp, web_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(web_bp, url_prefix='/')
app.register_blueprint(api_bp, url_prefix='/api')

with app.app_context():
    db.create_all()
    from models import Product
    if Product.query.count() == 0:
        from seed_data import seed_products
        seed_products()

if __name__ == '__main__':
    app.run(debug=True)
