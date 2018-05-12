# treelo
trello-like



```bash

# run debug server
python manage.py server

# create db
python manage.py db init

# scan all new tables and columns
python manage.py db migrate -m "initial migration"

# apply migrations
python manage.py db upgrade
```
