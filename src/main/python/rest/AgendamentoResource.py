from flask import request
import logging
import json
from flask_restx import Resource, Namespace
# from flask_jwt_extended import  get_jwt_identity
from domain.Agendamento import Agendamento
from schema.AgendamentoSchema import AgendamentoSchema
from flask_jwt_extended import jwt_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError
from datetime import datetime, timedelta

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
agendamentos_list_ns = Namespace('agendamentos-resource', path="/agendamentos")

agendamentos_schema = AgendamentoSchema()
agendamentos_list_schema = AgendamentoSchema(many=True)

class AgendamentoResource(Resource):

    @staticmethod
    def validateOverlap(dataHora, duracao):
        # Convert dataHora and duracao to datetime and timedelta objects
        selectedDateTime = datetime.fromisoformat(dataHora)
        durationInMinutes = timedelta(minutes=int(duracao))

        # Calculate the end time of the new appointment
        selectedEndDateTime = selectedDateTime + durationInMinutes

        # Validate future date
        now = datetime.now()
        if selectedDateTime <= now:
            return "O agendamento precisa ser feito em uma data futura."

        # Validate working days (Tuesday to Saturday)
        dayOfWeek = selectedDateTime.weekday()
        if dayOfWeek < 1 or dayOfWeek > 5:  # 0 is Monday and 6 is Sunday in Python
            return "O agendamento precisa ser feito de terça-feira a sábado."

        # Validate working hours (9 AM to 6 PM)
        hour = selectedDateTime.hour
        if hour < 9 or hour > 18:
            return "O agendamento precisa ser feito entre 9 AM e 6 PM."

        # Fetch all existing appointments
        appointments = Agendamento.find_all(1, 100000)

        # Sort appointments by start time
        appointments.sort(key=lambda x: x.get_data_hora())

        # Check for overlaps with existing appointments
        for appointment in appointments:
            appointmentDateTime = appointment.get_data_hora()
            appointmentEndDateTime = appointmentDateTime + timedelta(minutes=appointment.servico.get_duracao())

            # Check if the new appointment overlaps with the current appointment
            if (selectedDateTime >= appointmentDateTime and selectedDateTime < appointmentEndDateTime) or \
                (selectedEndDateTime > appointmentDateTime and selectedEndDateTime <= appointmentEndDateTime):
                return "Já existe um agendamento marcado para esse horário."

        # No overlaps found
        return "O agendamento foi marcado com sucesso."

    @jwt_required()
    def get(self, id):
        logging.info("GET request received on AgendamentoResource")
        agendamentos = Agendamento.find_by_id(id)
        if agendamentos is not None:
            return agendamentos_schema.dump(agendamentos), 200
        return {"message": "Agendamento not found"}, 404

    @jwt_required()
    def put(self, id):
        logging.info("PUT request received on AgendamentoResource")
        agendamentos_json = request.get_json()

        del agendamentos_json['user']['getfName']
        del agendamentos_json['user']['getlName']

        overlap_validation = self.validateOverlap(agendamentos_json['dataHora'],
                                                  agendamentos_json['servico']['duracao'])
        if overlap_validation != "O agendamento foi marcado com sucesso.":
            return {"message": overlap_validation}, 400
        if agendamentos_json["id"] is None:
            return {"message": "Invalid Agendamento"}, 400
        if id != agendamentos_json["id"]:
            return {"message": "Invalid Agendamento"}, 400
        agendamentos = Agendamento.find_by_id(id)
        if agendamentos.get_id() is None:
            return {"message": "Invalid Agendamento"}, 400
        try:
            updated_agendamentos = agendamentos_schema.load(agendamentos_json, instance=agendamentos, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_agendamentos.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return agendamentos_schema.dump(updated_agendamentos), 200

    @jwt_required()
    def patch(self, id):
        logging.info("PATCH request received on AgendamentoResource")
        agendamentos_json = request.get_json()

        del agendamentos_json['user']['getfName']
        del agendamentos_json['user']['getlName']

        overlap_validation = self.validateOverlap(agendamentos_json['dataHora'],
                                                  agendamentos_json['servico']['duracao'])
        if overlap_validation != "O agendamento foi marcado com sucesso.":
            return {"message": overlap_validation}, 400
        if agendamentos_json["id"] is None:
            return {"message": "Invalid Agendamento"}, 400
        if id != agendamentos_json["id"]:
            return {"message": "Invalid Agendamento"}, 400
        agendamentos = Agendamento.find_by_id(id)
        if agendamentos.get_id() is None:
            return {"message": "Invalid Agendamento"}, 400
        try:
            updated_agendamentos = agendamentos_schema.load(agendamentos_json, instance=agendamentos, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_agendamentos.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return agendamentos_schema.dump(updated_agendamentos), 200

    @jwt_required()
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on AgendamentoResource")
        agendamentos = Agendamento.find_by_id(id)
        if agendamentos is None:
            return {"message": "Agendamento not found"}, 404
        try:
            agendamentos.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Agendamento deleted"}, 204


class AgendamentoResourceList(Resource):

    @staticmethod
    def validateOverlap(dataHora, duracao):
        # Convert dataHora and duracao to datetime and timedelta objects
        selectedDateTime = datetime.fromisoformat(dataHora)
        durationInMinutes = timedelta(minutes=int(duracao))

        # Calculate the end time of the new appointment
        selectedEndDateTime = selectedDateTime + durationInMinutes

        # Validate future date
        now = datetime.now()
        if selectedDateTime <= now:
            return "O agendamento precisa ser feito em uma data futura."

        # Validate working days (Tuesday to Saturday)
        dayOfWeek = selectedDateTime.weekday()
        if dayOfWeek < 1 or dayOfWeek > 5:  # 0 is Monday and 6 is Sunday in Python
            return "O agendamento precisa ser feito de terça-feira a sábado."

        # Validate working hours (9 AM to 6 PM)
        hour = selectedDateTime.hour
        if hour < 9 or hour > 18:
            return "O agendamento precisa ser feito entre 9 AM e 6 PM."

        # Fetch all existing appointments
        appointments = Agendamento.find_all(1, 100000)

        # Sort appointments by start time
        appointments.sort(key=lambda x: x.get_data_hora())

        # Check for overlaps with existing appointments
        for appointment in appointments:
            appointmentDateTime = appointment.get_data_hora()
            appointmentEndDateTime = appointmentDateTime + timedelta(minutes=appointment.servico.get_duracao())

            # Check if the new appointment overlaps with the current appointment
            if (selectedDateTime >= appointmentDateTime and selectedDateTime < appointmentEndDateTime) or \
                (selectedEndDateTime > appointmentDateTime and selectedEndDateTime <= appointmentEndDateTime):
                return "Já existe um agendamento marcado para esse horário."

        # No overlaps found
        return "O agendamento foi marcado com sucesso."
    @jwt_required()
    def get(self):
        logging.info("GET request received on AgendamentoResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=1000, type=int)
        agendamentos = Agendamento.find_all(page, size)
        if agendamentos is not None:
            return agendamentos_list_schema.dump(agendamentos), 200
        return {"message": "Agendamento not found"}, 404

    @jwt_required()
    def post(self):
        logging.info("POST request received on AgendamentoResourceList")
        agendamentos_json = request.get_json()

        # Check if all required fields are provided
        if 'dataHora' not in agendamentos_json or 'servico' not in agendamentos_json or 'user' not in agendamentos_json:
            return {"message": "Todos os campos são obrigatórios."}, 400

        del agendamentos_json['user']['getfName']
        del agendamentos_json['user']['getlName']

        overlap_validation = self.validateOverlap(agendamentos_json['dataHora'],
                                                  agendamentos_json['servico']['duracao'])
        if overlap_validation != "O agendamento foi marcado com sucesso.":
            return {"message": overlap_validation}, 400

        try:
            agendamentos_data = agendamentos_schema.load(agendamentos_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            agendamentos_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return agendamentos_schema.dump(agendamentos_data), 201


class AgendamentoResourceListCount(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on AgendamentoResourceListCount")
        agendamentos_count = Agendamento.find_all_count()
        if agendamentos_count is not None:
            return agendamentos_count, 200
        return {"message": "Agendamento count not found"}, 404
