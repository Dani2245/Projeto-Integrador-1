from typing import List
from DatabaseConfig import db


class Authority(db.Model):
    __tablename__ = "jhi_authority"
    name = db.Column(db.String(80), primary_key=True)

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            self.key = value

    def get_name(self):
        return self.name

    def set_name(self, _name):
        self.name = _name
        
    def __repr__(self):
        return '<Authority %r>' % self.name

    @classmethod
    def get_by_name(cls, name) -> "Authority":
        authority = cls.query.filter_by(name=name).first() 
        return authority

    @classmethod
    def get_all_authorities(cls) -> List["Authority"]:
        authorities = cls.query.all()
        return authorities

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commmit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

