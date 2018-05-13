import datetime
from flask import abort
from flask_restful import Resource, fields, marshal_with
from treelo.models import Card, Task

card_fields = {
    'title': fields.String(),
    'description': fields.String(),
    'color': fields.String(),
    'status': fields.String(),
    'title': fields.String(),
    'created_at': fields.DateTime(dt_format='iso8601'),
    'updated_at': fields.DateTime(dt_format='iso8601'),
    'row_order': fields.Integer(),
}



class CardApi(Resource):
    @marshal_with(card_fields)
    def get(self, card_id=None):
        if card_id:
            card = Card.query.get(card_id)
            if not card:
                abort(404)

            return post
        else:
            cards = Card.query.all()

            return cards
