from flask_restx import Resource, fields, Namespace
from domain.User import User
from schema.UserSchema import PublicUserSchema
from domain.Authority import Authority
from schema.Authority import AuthoritySchema
import logging


logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')


public_user_list_ns = Namespace('public-user-resource', path="/users")

public_user_list_schema = PublicUserSchema(many=True)


class PublicUserResourceList(Resource):
    def get(self):
        logging.info("GET request received on PublicUserResourceList")
        all_users = User.get_all_users()
        return public_user_list_schema.dump(all_users), 200


authority_list_ns = Namespace('public-user-resource', path="/authorities")

authority_list_schema = AuthoritySchema(many=True)


class AuthorityResourceList(Resource):
    def get(self):
        logging.info("GET request received on AuthorityResourceList")
        all_users = Authority.get_all_authorities()
        return authority_list_schema.dump(all_users), 200