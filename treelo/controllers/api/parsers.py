from flask_restful import reqparse
from datetime import datetime

card_get_parser = reqparse.RequestParser()
card_get_parser.add_argument(
    'page',
    type=int,
    location=['args', 'headers']
)


card_post_parser = reqparse.RequestParser()
card_post_parser.add_argument(
    'id',
    type=int,
    required=True,
    help="Id is required"
)

card_post_parser.add_argument(
    'title',
    type=str,
    required=True,
    help="Title is required"
)

card_post_parser.add_argument(
    'description',
    type=str,
    required=True,
    help="Description is required"
)

card_post_parser.add_argument(
    'color',
    type=str,
    required=False
)

card_post_parser.add_argument(
    'status',
    type=str,
    required=False
)

card_post_parser.add_argument(
    'row_order',
    type=int,
    required=False
)

card_post_parser.add_argument(
    'tasks',
    type=str,
    action='append'
)

card_put_parser = reqparse.RequestParser()

card_put_parser.add_argument(
    'title',
    type=str,
    required=False,
    help="Title is required"
)

card_put_parser.add_argument(
    'description',
    type=str,
    required=False,
    help="Description is required"
)

card_put_parser.add_argument(
    'color',
    type=str,
    required=False
)

card_put_parser.add_argument(
    'status',
    type=str,
    required=False
)

card_put_parser.add_argument(
    'updated_at',
    type=str,
    required=False
)

card_put_parser.add_argument(
    'tasks',
    type=str,
    required=False
)

card_delete_parser = reqparse.RequestParser()

task_post_parser = reqparse.RequestParser()
task_post_parser.add_argument(
     'id',
     type=int,
     required=True,
     help="id is required"
)

task_post_parser.add_argument(
    'name',
    type=str,
    required=True,
    help="Name is required"
)

task_post_parser.add_argument(
    'done',
    type=bool,
    required=True,
    help="Status is required"
)

task_put_parser = reqparse.RequestParser()

card_put_parser.add_argument(
    'id',
    type=int,
    required=False,
    help="Id is required"
)

card_put_parser.add_argument(
    'title',
    type=str,
    required=False,
    help="Title is required"
)

card_put_parser.add_argument(
    'description',
    type=str,
    required=False,
    help="Description is required"
)

card_put_parser.add_argument(
    'color',
    type=str,
    required=False
)

card_put_parser.add_argument(
    'status',
    type=str,
    required=False
)

card_put_parser.add_argument(
    'row_order',
    type=int,
    required=False
)

card_put_parser.add_argument(
    'created_at',
    type=str,
    required=False
)

card_put_parser.add_argument(
    'updated_at',
    type=str,
    required=False
)

task_put_parser.add_argument(
    'row_order',
    required=False,
    type=int,
    help="Row Order is required"
)

task_put_parser.add_argument(
    'done',
    type=bool,
    required=False,
    help="Status is required"
)
