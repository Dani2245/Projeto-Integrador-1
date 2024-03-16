import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Row, Col, Alert, Button } from 'reactstrap';
import { toast } from 'react-toastify';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';

export const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );

  const handleValidSubmit = ({ username, email, /* phone, */ firstPassword }) => {
    dispatch(handleRegister({ login: username, email, password: firstPassword, /* phone, */ langKey: 'en' }));
  };

  const updatePassword = event => setPassword(event.target.value);

  const successMessage = useAppSelector(state => state.register.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title" data-cy="registerTitle">
            Registro
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm id="register-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              name="username"
              label="Nome de usuário"
              placeholder={'Seu nome de usuário'}
              validate={{
                required: { value: true, message: 'Seu nome de usuário é obrigatório.' },
                pattern: {
                  value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                  message: 'Nome de usuário inválido.',
                },
                minLength: { value: 1, message: 'Seu nome de usuário deve ter pelo menos 1 caractere.' },
                maxLength: { value: 50, message: 'Seu nome de usuário não pode ter mais de 50 caracteres.' },
              }}
              data-cy="username"
            />
            <ValidatedField
              name="email"
              label="Email"
              placeholder={'Seu email'}
              type="email"
              validate={{
                required: { value: true, message: 'Seu email é obrigatório.' },
                minLength: { value: 5, message: 'Seu email deve ter pelo menos 5 caracteres.' },
                maxLength: { value: 254, message: 'Seu email não pode ter mais de 50 caracteres.' },
                validate: v => isEmail(v) || 'Seu email é inválido.',
              }}
              data-cy="email"
            />
            {/* <ValidatedField
              name="phone"
              label="Número de telefone"
              placeholder={'Seu número de telefone'}
              validate={{
                required: { value: true, message: 'Seu número de telefone é obrigatório.' },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Seu número de telefone é inválido.',
                },
                minLength: { value: 10, message: 'Seu número de telefone deve ter pelo menos 10 dígitos. Inclua o DDD.' },
                maxLength: { value: 15, message: 'Seu número de telefone não pode ter mais de 15 dígitos.' },
              }}
              data-cy="phone"
            /> */}
            <ValidatedField
              name="firstPassword"
              label="Nova senha"
              placeholder={'Nova senha'}
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, message: 'Sua senha é obrigatória.' },
                minLength: { value: 4, message: 'Sua senha deve ter pelo menos 4 caracteres.' },
                maxLength: { value: 50, message: 'Sua senha não pode ter mais de 50 caracteres.' },
              }}
              data-cy="firstPassword"
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              name="secondPassword"
              label="Confirmação da nova senha"
              placeholder="Confirme a nova senha"
              type="password"
              validate={{
                required: { value: true, message: 'A confirmação da senha é obrigatória.' },
                minLength: { value: 4, message: 'A confirmação da senha deve ter pelo menos 4 caracteres.' },
                maxLength: { value: 50, message: 'A confirmação da senha não pode ter mais de 50 caracteres.' },
                validate: v => v === password || 'A senha e sua confirmação não correspondem!',
              }}
              data-cy="secondPassword"
            />
            <Button id="register-submit" color="primary" type="submit" data-cy="submit">
              Registrar
            </Button>
          </ValidatedForm>
          <p>&nbsp;</p>
          <Alert color="warning">
            <span>Se você deseja</span>
            <a className="alert-link"> entrar</a>
            <span>
              , você pode tentar as contas padrão:
              <br />- Administrador (login=&quot;admin&quot; e senha=&quot;admin&quot;)
              <br />- Usuário (login=&quot;user&quot; e senha=&quot;user&quot;).
            </span>
          </Alert>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
