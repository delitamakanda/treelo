from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand

from main import app, db
from models import Card, Task

migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command("server", Server())
manager.add_command('db', MigrateCommand)

@manager.shell
def make_shell_context():
    return dict(app=app, db=db, Card=Card, Task=Task)


if __name__ == "__main__":
    manager.run()
