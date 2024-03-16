from datetime import datetime
from enum import Enum
from typing import List
from . import Servico
from . import User
from DatabaseConfig import db
 


class Agendamento(db.Model):
    __tablename__ = "Agendamento"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    data_hora = db.Column(db.DateTime)

    # TODO: Adding relationships
    servico_id = db.Column(db.Integer, db.ForeignKey("Servico.id"))
    servico = db.relationship("Servico", lazy="subquery", primaryjoin="Agendamento.servico_id == Servico.id")
    user_id = db.Column(db.Integer, db.ForeignKey("jhi_user.id"))    
    user = db.relationship("User", lazy="subquery", primaryjoin="Agendamento.user_id == User.id")

    @classmethod
    def find_by_id(cls, _id) -> "Agendamento":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Agendamento"]:
        paginate = cls.query.order_by(cls.id).paginate(page=page, per_page=per_page)
        return paginate.items

    @classmethod
    def find_all_count(cls):
        return cls.query.count()
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def update_db(self) -> None:
        db.session.merge(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    # Getters and setters
    def get_id(self):
        return self.id

    def set_id(self, id):
        self.id = id
    
    def get_data_hora(self):
        return self.data_hora

    def set_data_hora(self, data_hora):
        self.data_hora = data_hora
