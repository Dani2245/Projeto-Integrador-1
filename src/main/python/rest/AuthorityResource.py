
from flask_restx import Resource, Namespace
from domain.Authority import Authority
from schema.Authority import AuthoritySchema
import logging


logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')


authority_list_ns = Namespace('public-user-resource', path="/authorities")

authority_list_schema = AuthoritySchema(many=True)


class AuthorityResourceList(Resource):
    def get(self):
        logging.info("GET request received on AuthorityResourceList")
        all_authorities = Authority.get_all_authorities()
        authorities = authority_list_schema.dump(all_authorities)
        return list(x["name"] for x in list(authorities)), 200


