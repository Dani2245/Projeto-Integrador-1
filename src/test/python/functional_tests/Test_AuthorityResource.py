import pytest


def test_authority_get_request(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/authorities' page is requested (GET)
    THEN check the response is valid
    """

    response = test_client.get('/api/authorities')
    assert response.status_code == 200
