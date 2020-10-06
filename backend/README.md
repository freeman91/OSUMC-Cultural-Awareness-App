# OSUMC Cultural Awareness Backend

## Running

```sh
export FLASK_APP='cultural_awareness/__init__.py'
pipenv run flask run
```

## Database setup

- install mongodb-community (installation instructions depend on os)
- start mongo instance (depends on os)
- run db_restore script to get up-to-date data (script in progress)
- you can connect to db from your shell `mongo --shell`
- example shell commands, and python functions using pymongo in [mongo-notes](../mongo-notes.md)
