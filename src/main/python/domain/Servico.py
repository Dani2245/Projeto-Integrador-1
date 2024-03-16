from datetime import datetime
from enum import Enum
from typing import List
from . import Agendamento
from DatabaseConfig import db
 


class Servico(db.Model):
    __tablename__ = "Servico"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String( 255), nullable=False)
    descricao = db.Column(db.String( 255))
    categoria = db.Column(db.String( 255))
    preco = db.Column(db.Integer)
    duracao = db.Column(db.Integer)

    # TODO: Adding relationships

    @classmethod
    def find_by_id(cls, _id) -> "Servico":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Servico"]:
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
    
    def get_nome(self):
        return self.nome

    def set_nome(self, nome):
        self.nome = nome
    
    def get_descricao(self):
        return self.descricao

    def set_descricao(self, descricao):
        self.descricao = descricao
    
    def get_categoria(self):
        return self.categoria

    def set_categoria(self, categoria):
        self.categoria = categoria
    
    def get_preco(self):
        return self.preco

    def set_preco(self, preco):
        self.preco = preco
    
    def get_duracao(self):
        return self.duracao

    def set_duracao(self, duracao):
        self.duracao = duracao
