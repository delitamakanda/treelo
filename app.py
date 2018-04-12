import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    # init app
    app = Flask(__name__)

    # init db
    db.init_app(app)
    migrate.init_app(app, db)

    return app
