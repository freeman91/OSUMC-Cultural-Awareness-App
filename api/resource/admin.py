"""
Module for admin routes
"""
import os
from typing import Dict, List, Tuple
from datetime import timedelta
from flask import Flask, request
from flask_bcrypt import Bcrypt  # type: ignore
from flask_mail import Mail, Message  # type: ignore
from flask_jwt_extended import (  # type: ignore
    jwt_required,
    create_access_token,
)

from pymongo import MongoClient  # type:ignore

from ..request_schemas import (
    validate_request_body,
    AdminInviteSchema,
    AdminUpdateSchema,
)

FRONTEND_IP = os.getenv("FRONTEND_IP")

def admin_routes(app: Flask, db: MongoClient, bcrypt: Bcrypt) -> None:
    """
    Adds Admin routes to Flask App

    Parameters:

    app: Flask app

    db: MongoDB client

    bcrypt: Bcrypt handle
    """

    mail = Mail(app)

    @app.route("/v1/admin")
    @jwt_required
    def admins() -> Dict[str, List[str]]:
        """
        List all admins

        Returns:

          200 - list of admin's emails

          {"admins": ["admin1@test.com", "admin2@test.com", ...]}

          401 - bad auth token
          500 - otherwise
        """
        collection = db.admins
        admins = [admin["email"] for admin in collection.find().sort("email")]
        return {"admins": admins}

    @app.route("/v1/admin/<email>")
    @jwt_required
    def admin(email: str) -> Tuple[Dict[str, str], int]:
        """
        Fetch information about an admin

        Parameters:

        email: email of admin to get information on

        Returns:

        200 - admin information

        {"email": "test@gmail.com", "superUser": false, "name": "test"}

        401 - bad auth

        404 - can't find admin
        """
        admin = db.admins.find_one({"email": email})
        if admin is None:
            return {"msg": f"unknown admin `{email}`"}, 404

        del admin["password"]
        admin["_id"] = str(admin["_id"])
        return admin, 200

    @app.route("/v1/admin/invite", methods=["POST"])
    @jwt_required
    def invite() -> Tuple[Dict[str, str], int]:
        """
        Invite admin via Email

        Parameters:

          POST Body:

          {
            "email": "email",
          }

          Returns:
            200 - admin successfully added

            {"msg": "email sent to EMAIL"}

            401 - bad auth token
            500 - otherwise
        """
        body = validate_request_body(AdminInviteSchema, request.json)
        if isinstance(body, str):
            return {"msg": body}, 400

        email = body["email"]
        if db.admins.find_one({"email": email}) is not None:
            return (
                {"msg": f"<{email}>: duplicate"},
                409,
            )

        token = create_access_token(identity=email, expires_delta=timedelta(days=1))

        msg = Message(
            "Account Activation",
            sender="osumc.cultural.awareness@gmail.com",
            recipients=[f"{email}"],
        )
        msg.html = f"""\
          <!DOCTYPE html>
          <html>
            <body>
              <h1 style="color:SlateGray;">Click the following link to register for an admin account</h1>
              <a href="http://{FRONTEND_IP}/Register?token={token}">Register<a/>
            </body>
          </html>
          """
        mail.send(msg)
        return {"msg": f"email sent to {email}"}, 200

    @app.route("/v1/admin/<email>", methods=["PUT"])
    @jwt_required
    def admin_update(email: str) -> Tuple[Dict[str, str], int]:
        """
        Update Admin

        Parameters:

          email: email of Admin

          PUT Body:

          {
            "name": "name",
            "email": "email",
            "password": "password",
            "password_confirmation": "password",
          }

        Returns:
          200 - admin successfully updated

          {"msg": "successfully updated admin <EMAIL>"}

          401 - bad auth token
          500 - otherwise
        """
        body = validate_request_body(AdminUpdateSchema, request.json)
        if isinstance(body, str):
            return {"msg": body}, 400

        admin = db.admins.find_one({"email": body["email"]})

        if "password" in body:
            if body["password"] != body["password_confirmation"]:
                return (
                    {"msg": "`password` and `password_confirmation` don't match"},
                    401,
                )
            del body["password_confirmation"]
            body["password"] = bcrypt.generate_password_hash(body["password"])
        else:
            body["password"] = admin["password"]

        if "superUser" not in body:
            body["superUser"] = admin["superUser"]

        if "name" not in body:
            body["name"] = admin["name"]

        result = db.admins.replace_one({"email": email}, body)
        if result.matched_count == 0 or result.modified_count == 0:
            return {"msg": "Internal server error"}, 500

        return {"msg": f"successfully updated admin <{email}>"}, 200

    @app.route("/v1/admin/<email>", methods=["DELETE"])
    @jwt_required
    def admin_delete(email: str) -> Tuple[Dict[str, str], int]:
        """
        Delete Admin

        Parameters:
          email: email of Admin

        Returns:
          200 - admin successfully deleted

          {"msg": "successfully deleted admin <EMAIL>"}

          401 - bad auth token
          500 - otherwise
        """
        collection = db.admins
        result = collection.delete_one({"email": email})
        if result.deleted_count == 0:
            return {"msg": "Internal server error"}, 500
        return {"msg": f"successfully deleted admin <{email}>"}, 200
