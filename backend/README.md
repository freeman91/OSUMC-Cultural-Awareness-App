# OSUMC Cultural Awareness Backend

RESTful API that has [Routes](https://docs.google.com/spreadsheets/d/19zLqvcoFI7Jm_y6nPPgcRmaBuPEkDKtgeiyozekbMoU/edit?usp=sharing)

## Running

### Locally

```sh
export FLASK_APP='cultural_awareness/__init__.py'
pipenv run flask run
```

### Docker

```sh
# Run in the background
docker-compose up -d

# Read Logs
docker logs $(docker ps --filter name=backend_cultural-awareness --format "{{.ID}}")

# Stop
docker-compose down
```

### Tests

```sh
pipenv shell

python -m pytest
```
