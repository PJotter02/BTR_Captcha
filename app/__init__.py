from flask import Flask
from flask_migrate import Migrate
from .extensions import db  # Use the shared db instance from extensions.py
import os


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = '2c5ef481bfb236596b62c92a6982f1ae6e4f9dfe7dfa31b81575a7fa1354ffd2'

    # Set up database URI
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)

    # Import models to register them with SQLAlchemy
    from app.models import User

    # Register blueprints
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
