from flask import request, make_response
from flask_restx import Resource, Namespace
import logging
from flask_jwt_extended import jwt_required

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')

logout_ns = Namespace('user-jwt-controller', path="/logout")

class LogoutResource(Resource):
     @jwt_required()
     def post(self):
          logging.info("POST request received on LogoutResource")
          session.clear()
