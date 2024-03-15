import pytest
from flask_jwt_extended import create_access_token
from domain.User import User


def test_register_account(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/admin/users' endpoint is requested (GET)
    THEN check the response is valid
    """
    access_token = create_access_token('admin')
    headers = {
        'Authorization': 'Bearer {}'.format(access_token),
        'Content-Type': 'application/json'
    }

    user_info = {
        "login": "janedoe",
        "email": "janedoe@localhost",
        "password": "janedoe123"
    }

    response = test_client.post('/api/register', headers=headers, json=user_info)
    assert (response.status_code == 201 or response.status_code == 200)


def test_delete_user(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/admin/users/admin' endpoint is requested (GET)
    THEN check the response is valid
    """
    access_token = create_access_token('admin')
    headers = {
        'Authorization': 'Bearer {}'.format(access_token),
        'Content-Type': 'application/json'
    }

    response = test_client.delete('/api/admin/users/janedoe', headers=headers)
    assert response.status_code == 204
