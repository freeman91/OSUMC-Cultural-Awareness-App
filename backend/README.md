# OSUMC Cultural Awareness Backend

## Running

```sh
export FLASK_APP='cultural_awareness/__init__.py'
pipenv run flask run
```

create .env file and add the following variables

```sh
FLASK_APP='backend/cultural_awareness/__init__.py'
MONGO_URI='mongodb://localhost:27017/'
MONGO_USER=
MONGO_PASSWORD=
DATABASE=<database_name>
```
