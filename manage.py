import os
from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand
from treelo import create_app
from treelo.models import db, Card, Task


env = os.environ.get('TREELO_ENV', 'dev')
app = create_app('treelo.config.%sConfig' % env.capitalize())

migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command("server", Server())
manager.add_command('db', MigrateCommand)

@manager.shell
def make_shell_context():
    return dict(app=app, db=db, Card=Card, Task=Task)


if __name__ == "__main__":
    manager.run()
