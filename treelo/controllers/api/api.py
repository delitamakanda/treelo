import datetime
from flask import abort
from flask_restful import Resource, fields, marshal_with
from treelo.models import db, Card, Task
from .fields import HTMLField
from .parsers import card_get_parser, card_post_parser, card_put_parser, card_delete_parser

task_fields = {
    'id': fields.Integer(),
    'name': fields.String(),
    'done': fields.Boolean(),
    'card_id': fields.Integer(),
    'created_at': fields.DateTime(dt_format='iso8601'),
    'updated_at': fields.DateTime(dt_format='iso8601'),
}

card_fields = {
    'id': fields.Integer(),
    'title': fields.String(),
    'description': HTMLField(),
    'color': fields.String(),
    'status': fields.String(),
    'created_at': fields.DateTime(dt_format='iso8601'),
    'updated_at': fields.DateTime(dt_format='iso8601'),
    'row_order': fields.Integer(),
    'tasks': fields.List(fields.Nested(task_fields)),
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
            args = card_get_parser.parse_args()
            page = args['page'] or 1
            cards = Card.query.order_by(
                Card.created_at.desc()
            ).paginate(page, 30)

            return cards.items


    def post(self, card_id=None):
        if card_id:
            abort(400)
        else:
            args = card_post_parser.parse_args(strict=True)

            new_card = Card(args['id'])

            new_card.title = args['title']
            new_card.description = args['description']
            new_card.color = args['color']
            new_card.status = args['status']
            new_card.row_order = args['row_order']

            if args['tasks']:
                for item in args['tasks']:
                    task = Task.query.filter_by(name=item).first()
                    if task:
                        new_card.tasks.append(task)
                    else:
                        new_task = Task(item)
                        new_card.tasks.append(new_task)

            db.session.add(new_card)
            db.session.commit()
            return new_card.id, 201

    def put(self, card_id=None):
        if card_id:
            pass
        else:
            abort(404)


    def delete(self, card_id=None):
        pass
