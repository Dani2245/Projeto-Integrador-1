
import os
from datetime import timedelta
import tempfile


BASE_DIR = os.path.dirname(os.path.realpath(__file__))


class BaseConfig:
    # Flask 
    ENV = 'development'
    FLASK_ENV = 'development'
    SECRET_KEY = '271f31ea11e8557962dae25a4becc8e7ddd0671dec95222527b26288345b5fcb376c2355d5509705f3f8f41e23239b227f66'
    JWT_SECRET_KEY = 'Zjc0NDEzMTUyNzc0NjI5ZjM2YzU2MmQxNWFjNDRkYjEyMjY1YmRjMmExMWJjNjY5MTgxNGRmYTBlNzgxNTE3MzhkYTZhZjhiYmU2ZDVkZDAxNWIzZDM0ODBhMTFlMzYxNWIwNjg1MzM5ZDMwZDljN2YxMGNlNWY5ZDU4NTQxMjc='
    JWT_ALGORITHM = 'HS512'

    # Database
    SQLALCHEMY_DATABASE_URI = 'sqlite:///../../../pyhipster.db3'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PROPAGATE_EXCEPTIONS = False
    SQLALCHEMY_EXPIRE_ON_COMMIT = False

    # Mail Configurations
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = 'my-email-id@gmail.com'
    MAIL_PASSWORD = 'my-email-password'

    # Cache Configurations
    
class ProdConfig:
    # Flask 
    ENV = 'production'
    FLASK_ENV = 'production'
    SECRET_KEY = '271f31ea11e8557962dae25a4becc8e7ddd0671dec95222527b26288345b5fcb376c2355d5509705f3f8f41e23239b227f66'
    JWT_SECRET_KEY = 'Zjc0NDEzMTUyNzc0NjI5ZjM2YzU2MmQxNWFjNDRkYjEyMjY1YmRjMmExMWJjNjY5MTgxNGRmYTBlNzgxNTE3MzhkYTZhZjhiYmU2ZDVkZDAxNWIzZDM0ODBhMTFlMzYxNWIwNjg1MzM5ZDMwZDljN2YxMGNlNWY5ZDU4NTQxMjc='
    JWT_ALGORITHM = 'HS512'

    # Database
    # SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://<user>:<password>@<host>[:<port>]/<dbname>'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PROPAGATE_EXCEPTIONS = False
    SQLALCHEMY_EXPIRE_ON_COMMIT = False

    # Mail Configurations
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = 'my-email-id@gmail.com'
    MAIL_PASSWORD = 'my-email-password'

    # Cache Configurations
