# Integration tests for the UserResource REST controller.
import pytest
from flask_jwt_extended import create_access_token


def test_jwt_controller(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/authenticate' endpoint is requested (POST)
    THEN check the response is valid
    """
    data = {
        'username': 'admin',
        'password': 'admin',
        'rememberMe': False
    }

    response = test_client.post('/api/authenticate', json=data)
    assert response.status_code == 200
