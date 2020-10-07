# OSUMC Cultural Awareness Backend

RESTful API that has [Routes](https://docs.google.com/spreadsheets/d/19zLqvcoFI7Jm_y6nPPgcRmaBuPEkDKtgeiyozekbMoU/edit?usp=sharing)

## Installation

- docker cli tools
- TODO: etc...

## Configuration

### .env file

TODO: update these variables
create a .env file with the follwoing content

```sh
FLASK_ENV=development
FLASK_APP=cultural_awareness/__init__.py
MONGO_URI=mongodb://localhost:27017/
MONGO_INITDB_DATABASE=database
MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_DOMAIN=http://172.24.0.2:27017
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
