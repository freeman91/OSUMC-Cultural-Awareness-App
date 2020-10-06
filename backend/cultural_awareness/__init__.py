from flask import Flask
from . import db_connection

app = Flask(__name__)
db = db_connection.connect()


@app.route("/")
def hello_world():
    return "Hello, World!"
