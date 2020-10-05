FROM python:3.8-alpine

MAINTAINER Scott Nicholas Hackman <snickhackman@gmail.com>

RUN pip install pipenv

WORKDIR /app
ENV FLASK_APP=cultural_awareness/__init__.py

COPY . /app

RUN pipenv install

CMD [ "pipenv", "run", "flask", "run", "--host=0.0.0.0" ]
