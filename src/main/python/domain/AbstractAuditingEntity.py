from DatabaseConfig import db


class AbstractAuditingEntity(db.Model):
    created_by = db.Column(db.String(80), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False)
    last_modified_by = db.Column(db.String(80), nullable=True)
    last_modified_date = db.Column(db.DateTime, nullable=True)

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            self.key = value
            
    def get_created_by(self):
        return self.created_by

    def set_created_by(self, _created_by):
        self.created_by = _created_by

    def get_created_date(self):
        return self.created_date

    def set_created_date(self, _created_date):
        self.created_date = _created_date

    def get_last_modified_by(self):
        return self.last_modified_by
    
    def set_last_modified_by(self, _last_modified_by):
        self.last_modified_by = _last_modified_by

    def get_last_modified_date(self):
        return self.last_modified_date
    
    def set_last_modified_date(self, _last_modified_date):
        self.last_modified_date = _last_modified_date
    
    