import pytest


def test_public_account(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/users' page is requested (GET)
    THEN check the response is valid
    """
    response = test_client.get('/api/users')
    assert response.status_code == 200
