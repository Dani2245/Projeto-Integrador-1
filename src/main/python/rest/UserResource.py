from flask_restx import Resource, fields, Namespace
from domain.User import User
from schema.UserSchema import AdminUserSchema
import logging
from flask import request, session
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timezone
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError
from security.AuthoritiesConstants import AuthoritiesConstants
from MailConfiguration import send_activation_mail, send_creation_mail
import json
import string
import secrets


logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')


def generate_activation_reset_keys():
    alphabet = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(alphabet) for i in range(20))
    return password


user_list_ns = Namespace('user-resource', path="/admin/users")

user_schema = AdminUserSchema()
user_list_schema = AdminUserSchema(many=True)


class UserResource(Resource):
    @jwt_required()
    def get(self, login):
        logging.info("Solicitação GET recebida em UserResource")
        users = User.get_by_login(login)
        if users is None:
            return {"message": "Usuário não encontrado"}, 404
        return user_schema.dump(users), 200


    @jwt_required()
    def delete(self, login):
        logging.info("Solicitação DELETE recebida em UserResource")
        users = User.get_by_login(login)
        if users is None:
            return {"message": "Usuário não encontrado"}, 404
        try:
            users.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Usuário deletado"}, 204


class UserResourceList(Resource):
    # @jwt_required()
    def get(self):
        logging.info("Solicitação GET recebida em UserResourceList")
        users = User.get_all_users()
        return user_list_schema.dump(users), 200

    @jwt_required()
    def post(self):
        logging.info("Solicitação POST recebida em UserResourceList")
        user_json = request.get_json()
        if 'id' in user_json:
            del user_json['id']
        user_json['langKey'] = 'en'
        user_json['createdBy'] = get_jwt_identity()
        user_json['createdDate'] = str(datetime.now(timezone.utc))
        user_json['lastModifiedBy'] = get_jwt_identity()
        user_json['lastModifiedDate'] = str(datetime.now(timezone.utc))
        if not user_json['authorities']:
            user_json['authorities'] = [AuthoritiesConstants.USER]
        users = User()
        try:
            user_data = user_schema.load(user_json, instance=users)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        activation_key = generate_activation_reset_keys()
        user_data.set_activation_key(activation_key)
        try:
            user_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400

        # Send registration mail
        try:
            send_creation_mail(user_data)
        except:
            return {"message": "Usuário criado, mas não foi possível enviar o email"}, 200
        return user_schema.dump(user_data), 201

    @jwt_required()
    def put(self):
        logging.info("Solicitação PUT recebida em UserResourceList")
        login = get_jwt_identity()
        user_json = request.get_json()
        if user_json["login"] is None:
            return {"message": "Usuário inválido"}, 400
        users = User.get_by_login(user_json["login"])
        if users.get_login() is None:
            return {"message": "Usuário inválido"}, 400
        try:
            updated_user = user_schema.load(user_json, instance=users)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        updated_user.set_phone(user_json["phone"])
        updated_user.set_last_modified_by(login)
        updated_user.set_last_modified_date(datetime.now(timezone.utc))
        try:
            updated_user.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return user_schema.dump(updated_user), 200
