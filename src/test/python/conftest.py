import pytest
from ProjetoIntegradorUmApp import create_app
from flask import Flask
from flask_cors import CORS
from config.FakeDataLoader import load_fake_data
from DatabaseConfig import db
from flask_jwt_extended import JWTManager, create_access_token


@pytest.fixture(scope='session')
def test_client():
    app = Flask(__name__)
    CORS(app)
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False
    jwt = JWTManager(app)
    flask_app = create_app(app)

    with flask_app.test_client() as testing_client:
      with flask_app.app_context():
        db.create_all()
        load_fake_data(flask_app)
        yield testing_client
