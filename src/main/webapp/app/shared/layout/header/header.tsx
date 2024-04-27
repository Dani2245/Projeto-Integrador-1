import './header.scss';

import React, {useState} from 'react';

import {Collapse, Nav, Navbar, NavbarToggler} from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import {Agendamento, Brand, Home, Servicos} from './header-components';
import {AccountMenu, AdminMenu} from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Desenvolvimento</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - O JHipster adicionará novos itens de menu aqui */

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar"/>
      <Navbar data-cy="navbar" light expand="md" fixed="top">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu}/>
        <Brand/>
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ms-auto" navbar>
            <Home/>
            {props.isAuthenticated && <Agendamento/>}
            {props.isAuthenticated && props.isAdmin && <Servicos/>}
            {props.isAuthenticated && props.isAdmin && (
              <AdminMenu showOpenAPI={props.isOpenAPIEnabled} showDatabase={!props.isInProduction}/>
            )}
            <AccountMenu isAuthenticated={props.isAuthenticated}/>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
