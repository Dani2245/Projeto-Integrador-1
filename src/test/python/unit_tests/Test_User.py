import pytest
from domain.User import User
from domain.Authority import Authority


class Test_User:

    def test_equals_verifier(self):
        authority1 = Authority()
        authority1.set_name("ROLE_ADMIN")

        user1 = User()
        user1.set_id(1)
        user1.roles.append(authority1)
        user2 = User()
        user2.set_id(user1.get_id())
        user2.roles.append(authority1)
        assert {k: v for (k, v) in user1.__dict__.items() if k != '_sa_instance_state'} == {k: v for (k, v) in user2.__dict__.items() if k != '_sa_instance_state'}
        user2.set_id(2)
        assert {k: v for (k, v) in user1.__dict__.items() if k != '_sa_instance_state'} != {k: v for (k, v) in user2.__dict__.items() if k != '_sa_instance_state'}
        user1.set_id(None)
        assert {k: v for (k, v) in user1.__dict__.items() if k != '_sa_instance_state'} != {k: v for (k, v) in user2.__dict__.items() if k != '_sa_instance_state'}
