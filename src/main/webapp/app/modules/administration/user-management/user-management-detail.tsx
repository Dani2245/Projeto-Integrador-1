import React, {useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Badge, Button, Row} from 'reactstrap';
import {TextFormat} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {APP_DATE_FORMAT} from 'app/config/constants';

import {getUser} from './user-management.reducer';
import {useAppDispatch, useAppSelector} from 'app/config/store';

export const UserManagementDetail = (props: RouteComponentProps<{ login: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser(props.match.params.login));
  }, []);

  const user = useAppSelector(state => state.userManagement.user);

  return (
    <div>
      <h2>
        Usuário [<strong>{user.login}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>Login</dt>
          <dd>
            <span>{user.login}</span>&nbsp;
            {user.activated ? <Badge color="success">Ativado</Badge> : <Badge color="danger">Desativado</Badge>}
          </dd>
          <dt>Primeiro Nome</dt>
          <dd>{user.firstName}</dd>
          <dt>Sobrenome</dt>
          <dd>{user.lastName}</dd>
          <dt>Email</dt>
          <dd>{user.email}</dd>
          {/* <dt>Telefone</dt> */}
          {/* <dd>{user.phone}</dd> */}
          <dt>Criado Por</dt>
          <dd>{user.createdBy}</dd>
          <dt>Data de Criação</dt>
          <dd>{user.createdDate ?
            <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid/> : null}</dd>
          <dt>Última Modificação Por</dt>
          <dd>{user.lastModifiedBy}</dd>
          <dt>Data da Última Modificação</dt>
          <dd>
            {user.lastModifiedDate ? (
              <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid/>
            ) : null}
          </dd>
          <dt>Perfis</dt>
          <dd>
            <ul className="list-unstyled">
              {user.authorities
                ? user.authorities.map((authority, i) => (
                  <li key={`user-auth-${i}`}>
                    <Badge color="info">{authority}</Badge>
                  </li>
                ))
                : null}
            </ul>
          </dd>
        </dl>
      </Row>
      <Button tag={Link} to="/admin/user-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left"/> <span className="d-none d-md-inline">Voltar</span>
      </Button>
    </div>
  );
};

export default UserManagementDetail;
