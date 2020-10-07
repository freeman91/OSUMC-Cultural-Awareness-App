# OSUMC Cultural Awareness Backend

RESTful API that has [Routes](https://docs.google.com/spreadsheets/d/19zLqvcoFI7Jm_y6nPPgcRmaBuPEkDKtgeiyozekbMoU/edit?usp=sharing)

## Installation

- [Docker](https://docs.docker.com/get-docker/)
- python 3.8

## Configuration

- create .env file

TODO: update these variables

```sh
FLASK_ENV=development
FLASK_APP=cultural_awareness/__init__.py
MONGO_URI=mongodb://localhost:27017/
MONGO_INITDB_DATABASE=database
MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_IP=172.19.199.3
MONGO_PORT=27017
```

- create mongo-root-user.js

```js
db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [
    {
      role: 'readeWrite',
      db: 'database',
    },
  ],
});
```

## Running containers

```sh
# build and spin up all docker containers --detatched
docker-compose up -d

# Read Logs
docker logs $(docker ps --filter name=backend_cultural-awareness --format "{{.ID}}")

# all container logs
docker-compose logs -f --tail=100

# Stop
docker-compose down
```

### Testing

```sh
pipenv shell

python -m pytest
```
