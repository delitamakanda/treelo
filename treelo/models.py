from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.Text())
    color = db.Column(db.String())
    status = db.Column(db.String())
    created_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)
    row_order = db.Column(db.Integer())
    tasks = db.relationship('Task', backref='cards', lazy='dynamic')

    def __init__(self, title, description, color, status, created_at, updated_at, row_order):
        self.title = title
        self.description = description
        self.color = color
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at
        self.row_order = row_order

    def __repr__(self):
        return "<Card '{}'>".format(self.title)


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())
    done = db.Column(db.Boolean())
    card_id = db.Column(db.Integer(), db.ForeignKey('cards.id'))
    created_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)

    def __init__(self, name, done, card_id, created_at, updated_at):
        self.name = name
        self.done = done
        self.card_id = card_id
        self.created_at = created_at
        self.updated_at = updated_at

    def __repr__(self):
        return "<Task '{}'>".format(self.name)
