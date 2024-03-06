from typing import List
from DatabaseConfig import db

jhi_user_authority = db.Table('jhi_user_authority',
    db.Column('user_id', db.Integer, db.ForeignKey('jhi_user.id'), primary_key=True),
    db.Column('authority_name', db.String(80), db.ForeignKey('jhi_authority.name'), primary_key=True)
)

#itens do cadastro dos usuários
class Usuario(db.Model):
    __tablename__ = "usuario"
    id = db.Column(db.Integer, primary_key=True)
    cpf = db.Column(db.String(11), unique=True, nullable=False)
    nome = db.Column(db.String(50))
    sobrenome = db.Column(db.String(50))
    telefone = db.Column(db.String(12), unique=True, nullable=False)
    aniversario = db.Column(db.DateTime)
   
    roles = db.relationship('Authority', secondary='jhi_user_authority', lazy='joined')

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            self.key = value

#getters and setters do usuário 
    def set_id(self, _id):
        self.id = _id

    def get_id(self):
        return self.id

    def set_cpf(self, _cpf):
        self.cpf = _cpf

    def get_cpf(self):
        return self.cpf

    # def set_password(self, _password):
    #     self.password_hash = _password

    # def get_password(self):
    #     return self.password_hash

    def set_nome(self, _nome):
        self.nome = _nome

    def get_nome(self):
        return self.nome

    def set_sobrenome(self, _sobrenome):
        self.sobrenome = _sobrenome

    def get_sobrenome(self):
        return self.sobrenome

    def set_telefone(self, _telefone):
        self.telefone = _telefone

    def get_telefone(self):
        return self.telefone

    def set_aniversario(self, _aniversario):
        self.aniversario = _aniversario

    def get_aniversario(self):
        return self.aniversario


    def __repr__(self):
        return '<Usuario %r>' % self.cpf

    @classmethod
    def get_by_id(cls, id) -> "Usuario":
        user= cls.query.filter_by(id=id).first()
        if user is not None:
            return user
        return None

    @classmethod
    def get_by_telefone(cls, telefone) -> "Usuario":
        user = cls.query.filter_by(telefone=telefone).first()
        if user is not None:
            return user
        return None

    # @classmethod
    # def get_by_activation_key(cls, activation_key) -> "User":
    #     user = cls.query.filter_by(activation_key=activation_key).first()
    #     if user is not None:
    #         return user
    #     return None

    # @classmethod
    # def get_by_reset_key(cls, reset_key) -> "User":
    #     user = cls.query.filter_by(reset_key=reset_key).first()
    #     if user is not None:
    #         return user
    #     return None

    @classmethod
    def get_by_cpf(cls, cpf) -> "Usuario":
        user = cls.query.filter_by(cpf=cpf).first()
        if user is not None:
            return user
        return None

    @classmethod
    def get_all_users(cls) -> List["Usuario"]:
        user_list = cls.query.all()
        return user_list

    # @classmethod
    # def get_roles_by_login(cls, login) -> "User":
    #     user = cls.query.filter_by(login=login).first()
    #     return User.query.join(jhi_user_authority).filter(jhi_user_authority.c.user_id == user.id).all()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        