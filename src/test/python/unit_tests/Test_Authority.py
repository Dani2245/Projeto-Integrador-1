import pytest
from domain.Authority import Authority


class Test_Authority:

    def test_equals_verifier(self):
        authority1 = Authority()
        authority1.set_name("ROLE_ADMIN")
        authority2 = Authority()
        authority2.set_name(authority1.get_name())
        assert {k: v for (k, v) in authority1.__dict__.items() if k != '_sa_instance_state'} == {k: v for (k, v) in authority2.__dict__.items() if k != '_sa_instance_state'}
        authority2.set_name("ROLE_USER")
        assert {k: v for (k, v) in authority1.__dict__.items() if k != '_sa_instance_state'} != {k: v for (k, v) in authority2.__dict__.items() if k != '_sa_instance_state'}
        authority2.set_name(None)
        assert {k: v for (k, v) in authority1.__dict__.items() if k != '_sa_instance_state'} != {k: v for (k, v) in authority2.__dict__.items() if k != '_sa_instance_state'}
