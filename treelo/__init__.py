from flask import Flask, redirect, url_for
from treelo.models import db
from treelo.controllers.api import api_blueprint, CardApi, TaskApi
from treelo.extensions import rest_api, cors_api

def create_app(object_name):
    app = Flask(__name__)
    app.config.from_object(object_name)

    db.init_app(app)
    rest_api.add_resource(
        CardApi,
        '/api/cards',
        '/api/cards/<int:card_id>',
        endpoint='api'
    )
    rest_api.init_app(app)
    cors_api.init_app(app)

    app.register_blueprint(api_blueprint)

    return app


if __name__ == '__main__':
    app = app = create_app('treelo.config.DevConfig')
    app.run()
