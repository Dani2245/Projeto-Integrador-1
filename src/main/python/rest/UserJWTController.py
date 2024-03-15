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
        logging.info("Requisição GET recebida em UserJWTResource")
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        remember_me = request.json.get("rememberMe", False)
        # Verifique se algum dos inputs está vazio
        if username is None or password is None:
            return {"message": "Nome de usuário e/ou senha não podem estar vazios"}, 400
        # Verifique se o usuário existe
        try:
            user = User.get_by_login(username)
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        if not user:
            return {"message": "Nome de usuário inválido"}, 404
        if bcrypt.checkpw(password.encode('utf8'), user.password_hash.encode('utf8')) is not True:
            return {"message": "Nome de usuário e/ou senha inválidos"}, 401
        if not user.get_activated():
            return {"message": "O usuário não está ativo. Por favor, contate-nos pelo número (11) 99999-9999 para ativarmos sua conta"}, 500
        token_expiry = timedelta(hours=3)
        if remember_me:
            token_expiry = timedelta(hours=24)
        # Obtenha a função do DB
        user_roles = []
        for role in user.roles:
            user_roles.append(role.name)
        auth = ",".join(user_roles)
        authorizations = {"auth": auth}
        # Gere o JWT com base nos parâmetros acima

        access_token = 'Bearer ' + create_access_token(identity=username, expires_delta=token_expiry, additional_claims=authorizations)

        return {"id_token": access_token}, 200, {'Authorization': access_token}

