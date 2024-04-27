import React, {useEffect, useState} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, FormText, Row} from 'reactstrap';
import {isEmail, ValidatedField, ValidatedForm} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {createUser, getRoles, getUser, reset, updateUser} from './user-management.reducer';
import {useAppDispatch, useAppSelector} from 'app/config/store';

export const UserManagementUpdate = (props: RouteComponentProps<{ login: string }>) => {
  const [isNew] = useState(!props.match.params || !props.match.params.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getUser(props.match.params.login));
    }
    dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [props.match.params.login]);

  const handleClose = () => {
    props.history.push('/admin/user-management');
  };

  const saveUser = values => {
    if (isNew) {
      dispatch(createUser(values));
    } else {
      dispatch(updateUser(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const user = useAppSelector(state => state.userManagement.user);
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);
  const authorities = useAppSelector(state => state.userManagement.authorities);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Criar ou editar um usuário</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <ValidatedForm onSubmit={saveUser} defaultValues={user}>
              {user.id ?
                <ValidatedField type="text" name="id" required readOnly label="ID" validate={{required: true}}/> : null}
              <ValidatedField
                type="text"
                name="login"
                label="Login"
                validate={{
                  required: {
                    value: true,
                    message: 'Seu nome de usuário é obrigatório.',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: 'Seu nome de usuário é inválido.',
                  },
                  minLength: {
                    value: 1,
                    message: 'Seu nome de usuário deve ter pelo menos 1 caractere.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Seu nome de usuário não pode ter mais de 50 caracteres.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="firstName"
                label="Nome"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'Este campo não pode ter mais de 50 caracteres.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="lastName"
                label="Sobrenome"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'Este campo não pode ter mais de 50 caracteres.',
                  },
                }}
              />
              <FormText>Este campo não pode ter mais de 50 caracteres.</FormText>
              <ValidatedField
                name="email"
                label="Email"
                placeholder={'Seu email'}
                type="email"
                validate={{
                  required: {
                    value: true,
                    message: 'Seu email é obrigatório.',
                  },
                  minLength: {
                    value: 5,
                    message: 'Seu email deve ter pelo menos 5 caracteres.',
                  },
                  maxLength: {
                    value: 254,
                    message: 'Seu email não pode ter mais de 50 caracteres.',
                  },
                  validate: v => isEmail(v) || 'Seu email é inválido.',
                }}
              />
              {/* <ValidatedField
                name="phone"
                label="Número de telefone"
                placeholder={'Seu número de telefone'}
                validate={{
                  required: {
                    value: true,
                    message: 'Seu número de telefone é obrigatório.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Seu número de telefone é inválido.',
                  },
                  minLength: {
                    value: 10,
                    message: 'Seu número de telefone deve ter pelo menos 10 dígitos. Inclua o DDD.',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Seu número de telefone não pode ter mais de 15 dígitos.',
                  },
                }}
              ></ValidatedField> */}
              <ValidatedField type="checkbox" name="activated" check value={true} disabled={!user.id} label="Ativado"/>
              <ValidatedField type="select" name="authorities" multiple label="Perfis">
                {authorities.map(role => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} to="/admin/user-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left"/>
                &nbsp;
                <span className="d-none d-md-inline">Voltar</span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save"/>
                &nbsp; Salvar
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserManagementUpdate;
