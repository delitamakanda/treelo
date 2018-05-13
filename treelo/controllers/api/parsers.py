from flask_restful import reqparse
import datetime

card_get_parser = reqparse.RequestParser()
card_get_parser.add_argument(
    'page',
    type=int,
    location=['args', 'headers']
)


card_post_parser = reqparse.RequestParser()
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
    'tasks',
    type=str,
    action='append'
)
