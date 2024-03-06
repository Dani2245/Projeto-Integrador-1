from flask import current_app
from flask_restx import Resource, Namespace
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
import logging, os


logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')


app_management_ns = Namespace('management', path="/management")


class AppManagementInfoResource(Resource):
    def get(self):
        return {
            "display-ribbon-on-profiles": "dev",
            "activeProfiles": ["dev"],
        }, 200

