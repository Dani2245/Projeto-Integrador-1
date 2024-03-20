from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Agendamento import Agendamento
from schema.ServicoSchema import ServicoSchema
from schema.UserSchema import UserSchema


class AgendamentoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Agendamento
        load_instance = True
        exclude = (
            "data_hora", 
        )
        sqla_session = db.session
        
    dataHora = auto_field("data_hora") 
    servico = fields.Nested("ServicoSchema", required=False)
    user = fields.Nested("UserSchema", required=False)
