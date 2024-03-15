import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <h2>Charm</h2>
        <p className="lead">Inovação e Beleza</p>
        {account?.login ? (
          <div>
            <Alert color="success">Você está logado como usuário {account.login}.</Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              Se você deseja
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link">
                {' '}
                entrar
              </Link>
              , você pode usar as contas padrão:
              <br />- Administrador (login=&quot;admin&quot; e senha=&quot;admin&quot;)
              <br />- Usuário (login=&quot;user&quot; e senha=&quot;user&quot;).
            </Alert>

            <Alert color="warning">
              Ainda não tem uma conta?&nbsp;
              <Link to="/account/register" className="alert-link">
                Registre uma nova conta
              </Link>
            </Alert>
          </div>
        )}
        <p>Se você tiver alguma dúvida sobre o PyHipster:</p>

        <ul>
          <li>
            <a href="https://github.com/pyhipster/generator-pyhipster" target="_blank" rel="noopener noreferrer">
              Página inicial do PyHipster
            </a>
          </li>
          <li>
            <a href="https://stackoverflow.com/tags/pyhipster/info" target="_blank" rel="noopener noreferrer">
              PyHipster no Stack Overflow
            </a>
          </li>
          <li>
            <a href="https://github.com/pyhipster/generator-pyhipster/issues?state=open" target="_blank" rel="noopener noreferrer">
              Rastreador de bugs do PyHipster
            </a>
          </li>
          <li>
            <a href="https://twitter.com/py_hipster" target="_blank" rel="noopener noreferrer">
              siga @py_hipster no Twitter
            </a>
          </li>
          <li>
            <a href="https://techhub.social/@pyhipster" target="_blank" rel="noopener noreferrer">
              Siga @pyhipster no Mastodon
            </a>
          </li>
        </ul>

        <p>
          Se você gosta do PyHipster, não se esqueça de nos dar uma estrela no{' '}
          <a href="https://github.com/pyhipster/generator-pyhipster" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          !
        </p>
      </Col>
    </Row>
  );
};

export default Home;
