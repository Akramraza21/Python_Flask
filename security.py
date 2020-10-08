from werkzeug.security import safe_str_cmp
from user import User


def authentication(username, password):
    getUser = User.find_by_username(username)
    if getUser and safe_str_cmp(getUser.password, password):
        return getUser


def identity(payload):
    user_id = payload["identity"]
    return User.find_by_id(user_id)
