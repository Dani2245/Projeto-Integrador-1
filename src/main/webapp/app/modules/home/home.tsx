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
        <h2>Welcome, Python Hipster!</h2>
        <p className="lead">This is your homepage</p>
        {account?.login ? (
          <div>
            <Alert color="success">You are logged in as user {account.login}.</Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              If you want to
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link">
                {' '}
                sign in
              </Link>
              , you can try the default accounts:
              <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
              <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
            </Alert>

            <Alert color="warning">
              You do not have an account yet?&nbsp;
              <Link to="/account/register" className="alert-link">
                Register a new account
              </Link>
            </Alert>
          </div>
        )}
        <p>If you have any question on PyHipster:</p>

        <ul>
          <li>
            <a href="https://github.com/pyhipster/generator-pyhipster" target="_blank" rel="noopener noreferrer">
              PyHipster homepage
            </a>
          </li>
          <li>
            <a href="https://stackoverflow.com/tags/pyhipster/info" target="_blank" rel="noopener noreferrer">
              PyHipster on Stack Overflow
            </a>
          </li>
          <li>
            <a href="https://github.com/pyhipster/generator-pyhipster/issues?state=open" target="_blank" rel="noopener noreferrer">
              PyHipster bug tracker
            </a>
          </li>
          <li>
            <a href="https://twitter.com/py_hipster" target="_blank" rel="noopener noreferrer">
              follow @py_hipster on Twitter
            </a>
          </li>
          <li>
            <a href="https://techhub.social/@pyhipster" target="_blank" rel="noopener noreferrer">
              Follow @pyhipster on Mastodon
            </a>
          </li>
        </ul>

        <p>
          If you like PyHipster, do not forget to give us a star on{' '}
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
