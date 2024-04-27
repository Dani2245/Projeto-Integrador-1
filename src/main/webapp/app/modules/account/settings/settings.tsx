import React, {useEffect} from 'react';
import {Button, Col, Row} from 'reactstrap';
import {isEmail, ValidatedField, ValidatedForm} from 'react-jhipster';
import {toast} from 'react-toastify';

import {useAppDispatch, useAppSelector} from 'app/config/store';
import {getSession} from 'app/shared/reducers/authentication';
import {reset, saveAccountSettings} from './settings.reducer';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);

  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const handleValidSubmit = values => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      })
    );
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">Configurações do usuário para {account.login}</h2>
          <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
            <ValidatedField
              name="firstName"
              label="Primeiro Nome"
              id="firstName"
              placeholder="Seu primeiro nome"
              validate={{
                required: {value: true, message: 'Seu primeiro nome é obrigatório.'},
                minLength: {value: 1, message: 'Seu primeiro nome deve ter pelo menos 1 caractere.'},
                maxLength: {value: 50, message: 'Seu primeiro nome não pode ter mais de 50 caracteres.'},
              }}
              data-cy="firstname"
            />
            <ValidatedField
              name="lastName"
              label="Sobrenome"
              id="lastName"
              placeholder="Seu sobrenome"
              validate={{
                required: {value: true, message: 'Seu sobrenome é obrigatório.'},
                minLength: {value: 1, message: 'Seu sobrenome deve ter pelo menos 1 caractere.'},
                maxLength: {value: 50, message: 'Seu sobrenome não pode ter mais de 50 caracteres.'},
              }}
              data-cy="lastname"
            />
            {/* <ValidatedField
              name="phone"
              label="Telefone"
              id="phone"
              placeholder="Seu telefone"
              validate={{
                required: { value: true, message: 'Seu telefone é obrigatório.' },
                minLength: { value: 1, message: 'Seu telefone deve ter pelo menos 1 caractere.' },
                maxLength: { value: 50, message: 'Seu telefone não pode ter mais de 50 caracteres.' },
              }}
              data-cy="phone"
            /> */}
            {/* <ValidatedField
              name="phone"
              label="Telefone"
              id="phone"
              placeholder="Seu telefone"
              validate={{
                required: { value: true, message: 'Your last name is required.' },
                minLength: { value: 1, message: 'Your last name is required to be at least 1 character' },
                maxLength: { value: 50, message: 'Your last name cannot be longer than 50 characters' },
              }}
              data-cy="phone"
            /> */}
            <ValidatedField
              name="email"
              label="Email"
              placeholder={'Seu email'}
              type="email"
              validate={{
                required: {value: true, message: 'Seu email é obrigatório.'},
                minLength: {value: 5, message: 'Seu email deve ter pelo menos 5 caracteres.'},
                maxLength: {value: 254, message: 'Seu email não pode ter mais de 50 caracteres.'},
                validate: v => isEmail(v) || 'Seu email é inválido.',
              }}
              data-cy="email"
            />
            <Button color="primary" type="submit" data-cy="submit">
              Salvar
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
