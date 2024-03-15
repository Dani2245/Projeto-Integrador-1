from flask_restx import Namespace, Resource
import logging
from flask import request, session
from flask_jwt_extended import create_access_token
from domain.User import User
import bcrypt
from datetime import timedelta
from sqlalchemy.exc import SQLAlchemyError


logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')


jwt_authentication_ns = Namespace('user-jwt-controller', path="/authenticate")


class UserJWTResource(Resource):
    def post(self):
        logging.info("GET request received on UserJWTResource")
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        remember_me = request.json.get("rememberMe", False)
        # Check if any of the inputs is empty
        if username is None or password is None:
            return {"message": "Username and/or password cannot be empty"}, 400
        # Check if user exists
        try:
            user = User.get_by_login(username)
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        if not user:
            return {"message": "Invalid user name"}, 404
        if bcrypt.checkpw(password.encode('utf8'), user.password_hash.encode('utf8')) is not True:
            return {"message": "Invalid user name and/or password"}, 401
        if not user.get_activated():
            return {"message": "User is not active. Please contact your administrator."}, 500
        token_expiry = timedelta(hours=3)
        if remember_me:
            token_expiry = timedelta(hours=24)
        # Get the role from the DB
        user_roles = []
        for role in user.roles:
            user_roles.append(role.name)
        auth = ",".join(user_roles)
        authorizations = {"auth": auth}
        # Generate the JWT based on the above parameters

        access_token = 'Bearer ' + create_access_token(identity=username, expires_delta=token_expiry, additional_claims=authorizations)

        return {"id_token": access_token}, 200, {'Authorization': access_token}

