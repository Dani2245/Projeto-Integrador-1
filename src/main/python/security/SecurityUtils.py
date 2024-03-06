

from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def has_role(ROLE):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if ROLE in claims["auth"]:
                return fn(*args, **kwargs)
            else:
                return {"message": "You are not allowed to perform this operation"}, 405
        return decorator
    return wrapper
    

def has_any_role(*ROLES):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if any(role in ROLES for role in claims["auth"]):
                return fn(*args, **kwargs)
            else:
                return {"message": "You are not allowed to perform this operation"}, 405
        return decorator
    return 
    
