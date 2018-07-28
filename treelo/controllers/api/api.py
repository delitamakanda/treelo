import datetime
from flask import abort
from flask_restful import Resource, fields, marshal_with
from treelo.models import db, Card, Task
from .fields import HTMLField
from .parsers import card_get_parser, card_post_parser, card_put_parser, card_delete_parser, task_post_parser, task_put_parser, task_delete_parser

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


class TaskApi(Resource):
    @marshal_with(task_fields)
    def post(self, card_id=None):
        if not card_id:
            abort(404)
        else:
            card = Card.query.get(card_id)

            args = task_post_parser.parse_args(strict=True)

            new_task = Task(args['id'])
            new_task.card_id = card.id
            new_task.name = args['name']
            new_task.done = args['done']

            db.session.add(new_task)
            db.session.commit()
            return new_task.id, 201

    def put(self, card_id=None, task_id=None):
        if not task_id:
            abort(400)

        task = Task.query.get(task_id)
        if not task:
            abort(404)

        args = task_put_parser.parse_args(strict=True)

        if args['done']:
            task.done = args['done']

        db.session.add(task)
        db.session.commit()
        return task.id, 201

    def delete(self, card_id=None, task_id=None):
        if not task_id:
            abort(400)

        task = Task.query.get(task_id)
        if not task:
            abort(404)

        args = task_delete_parser.parse_args(strict=True)

        db.session.delete(task)
        db.session.commit()
        return "", 204


class CardApi(Resource):
    @marshal_with(card_fields)
    def get(self, card_id=None):
        if card_id:
            card = Card.query.get(card_id)
            if not card:
                abort(404)

            return card
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
        if not card_id:
            abort(400)

        card = Card.query.get(card_id)
        if not card:
            abort(404)

        args = card_put_parser.parse_args(strict=True)

        if args['title']:
            card.title = args['title']

        if args['description']:
            card.description = args['description']

        if args['color']:
            card.color = args['color']

        if args['status']:
            card.status = args['status']

        if args['row_order']:
            card.row_order = args['row_order']

        db.session.add(card)
        db.session.commit()
        return card.id, 201

    def delete(self, card_id=None):
        if not card_id:
            abort(400)

        card = Card.query.get(card_id)
        if not card:
            abort(404)

        args = card_delete_parser.parse_args(strict=True)

        db.session.delete(card)
        db.session.commit()
        return "", 204
