from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Servico import Servico
from schema.ServicoSchema import ServicoSchema
from flask_jwt_extended import jwt_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
servicos_list_ns = Namespace('servicos-resource', path="/servicos")

servicos_schema = ServicoSchema()
servicos_list_schema = ServicoSchema(many=True)


class ServicoResource(Resource):
    @jwt_required()
    def get(self, id):
        logging.info("GET request received on ServicoResource")
        servicos = Servico.find_by_id(id)
        if servicos is not None:
            return servicos_schema.dump(servicos), 200
        return {"message": "Servico not found"}, 404

    @jwt_required()
    def put(self, id):
        logging.info("PUT request received on ServicoResource")
        servicos_json = request.get_json()
        if servicos_json["id"] is None:
            return {"message": "Invalid Servico"}, 400
        if id != servicos_json["id"]:
            return {"message": "Invalid Servico"}, 400
        servicos = Servico.find_by_id(id)
        if servicos.get_id() is None:
            return {"message": "Invalid Servico"}, 400
        try:
            updated_servicos = servicos_schema.load(servicos_json, instance=servicos, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_servicos.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return servicos_schema.dump(updated_servicos), 200
    
    @jwt_required()
    def patch(self, id):
        logging.info("PATCH request received on ServicoResource")
        servicos_json = request.get_json()
        if servicos_json["id"] is None:
            return {"message": "Invalid Servico"}, 400
        if id != servicos_json["id"]:
            return {"message": "Invalid Servico"}, 400
        servicos = Servico.find_by_id(id)
        if servicos.get_id() is None:
            return {"message": "Invalid Servico"}, 400
        try:
            updated_servicos = servicos_schema.load(servicos_json, instance=servicos, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_servicos.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return servicos_schema.dump(updated_servicos), 200

    @jwt_required()
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on ServicoResource")
        servicos = Servico.find_by_id(id)
        if servicos is None:
            return {"message": "Servico not found"}, 404
        try:
            servicos.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Servico deleted"}, 204


class ServicoResourceList(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on ServicoResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        servicos = Servico.find_all(page, size)
        if servicos is not None:
            return servicos_list_schema.dump(servicos), 200
        return {"message": "Servico not found"}, 404

    @jwt_required()
    def post(self):
        logging.info("POST request received on ServicoResourceList")
        servicos_json = request.get_json()
        try:
            servicos_data = servicos_schema.load(servicos_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            servicos_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return servicos_schema.dump(servicos_data), 201


class ServicoResourceListCount(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on ServicoResourceListCount")
        servicos_count = Servico.find_all_count()
        if servicos_count is not None:
            return servicos_count, 200
        return {"message": "Servico count not found"}, 404