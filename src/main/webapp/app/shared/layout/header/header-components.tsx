import React from 'react';

import {NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {NavLink as Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/charm_logo_white.png" alt="Logo"/>
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon/>
    <span className="brand-title" style={{paddingLeft: "50px"}}>Charm Inovação & Beleza</span>
    <span className="navbar-version">{VERSION}</span>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" color="white"/>
      <span style={{color: 'white'}}>Início</span>
    </NavLink>
  </NavItem>
);

export const Servicos = () => (
  <NavItem>
    <NavLink tag={Link} to="/servico" className="d-flex align-items-center">
      <FontAwesomeIcon icon="list" color="white"/>
      <span style={{color: 'white'}}>Serviços</span>
    </NavLink>
  </NavItem>
);

export const Agendamento = () => (
  <NavItem>
    <NavLink tag={Link} to="/agendamento" className="d-flex align-items-center">
      <FontAwesomeIcon icon="calendars" color="white"/>
      <span style={{color: 'white'}}>Agendamento</span>
    </NavLink>
  </NavItem>
);
