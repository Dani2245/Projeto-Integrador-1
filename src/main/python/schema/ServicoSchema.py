from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Servico import Servico


class ServicoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Servico
        load_instance = True
        exclude = (
        )
        sqla_session = db.session
        
