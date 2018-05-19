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

    def __init__(self, title):
        self.title = title

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

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "<Task '{}'>".format(self.name)
