import './home.scss';

import React from 'react';
import {Link} from 'react-router-dom';

import {Alert, Col, Row} from 'reactstrap';

import {useAppSelector} from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row className="pink-background">
      <Col md="3" className="pad">
        <span className="logo rounded"/>
      </Col>
      <Col md="9">
        <h2>Charm</h2>
        <p className="lead">Inovação e Beleza</p>
        {account?.login ? (
          <div>
            <Alert color="success">Seja bem-vinda {account.firstName || account.login}.</Alert>
          </div>
        ) : (
          <div>
            {/* <Alert color="warning">
              Se você deseja
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link">
                {' '}
                entrar
              </Link>
              , você pode usar as contas padrão:
              <br />- Administrador (login=&quot;admin&quot; e senha=&quot;admin&quot;)
              <br />- Usuário (login=&quot;user&quot; e senha=&quot;user&quot;).
            </Alert> */}

            <Alert color="warning">
              Ainda não tem uma conta?&nbsp;
              <Link to="/account/register" className="alert-link">
                Registre uma nova conta
              </Link>
            </Alert>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Home;
