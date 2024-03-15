import pytest
from flask_jwt_extended import create_access_token
from security.AuthoritiesConstants import AuthoritiesConstants


def test_get_all_users(test_client):
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

    response = test_client.get('/api/admin/users', headers=headers, json={'access_token': access_token})
    assert response.status_code == 200


def test_get_admin_user(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/admin/users/<user>' endpoint is requested (GET)
    THEN check the response is valid
    """
    access_token = create_access_token('admin')
    headers = {
        'Authorization': 'Bearer {}'.format(access_token),
        'Content-Type': 'application/json'
    }

    response = test_client.get('/api/admin/users/admin', headers=headers, json={'access_token': access_token})
    assert response.status_code == 200


def test_create_user(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/admin/users' endpoint is requested (POST)
    THEN check the response is valid
    """
    access_token = create_access_token('admin')
    headers = {
        'Authorization': 'Bearer {}'.format(access_token),
        'Content-Type': 'application/json'
    }

    user_info = {
        "login": "johndoe",
        "email": "johndoe@localhost",
        "authorities": None
    }

    response = test_client.post('/api/admin/users', headers=headers, json=user_info)
    assert (response.status_code == 201 or response.status_code == 200)

def test_update_user(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/admin/users' endpoint is requested (PUT) with a modified user object
    THEN check the response is valid
    """
    access_token = create_access_token('admin')
    headers = {
        'Authorization': 'Bearer {}'.format(access_token),
        'Content-Type': 'application/json'
    }

    user_info = {
        "login": "johndoe",
        "email": "johndoe@localhost",
        "activated": True,
        "firstName": "John",
        "lastName": "Doe",
        "authorities": [AuthoritiesConstants.ADMIN, AuthoritiesConstants.USER]
    }

    response = test_client.put('/api/admin/users', headers=headers, json=user_info)
    assert response.status_code == 200


def test_delete_user(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/admin/users/<user>' endpoint is requested (DELETE)
    THEN check the response is valid
    """
    access_token = create_access_token('admin')
    headers = {
        'Authorization': 'Bearer {}'.format(access_token),
        'Content-Type': 'application/json'
    }

    response = test_client.delete('/api/admin/users/johndoe', headers=headers, json={'access_token': access_token})
    assert response.status_code == 204
