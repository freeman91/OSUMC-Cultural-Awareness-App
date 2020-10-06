import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from pathlib import Path
from dotenv import load_dotenv
dotenv_path = Path('../.env')
load_dotenv(dotenv_path=dotenv_path)


def connect():
    """
    establishes a connection to the database
    requires MONGO_URI, DATABASE in .env file

    Returns:
        a database instance from the mongodb instance running on MONGO_URI
        with the name DATABASE

    Raises:
        an ConnectionFailure when it cant connect to the database
    """
    client = MongoClient(os.getenv("MONGO_URI"))
    try:
        client.admin.command('ismaster')
    except ConnectionFailure:
        print("Could not connect to server")

    return client[os.getenv("DATABASE")]
