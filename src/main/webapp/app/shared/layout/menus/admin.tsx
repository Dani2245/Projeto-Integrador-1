import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import {DropdownItem} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {NavDropdown} from './menu-components';

const adminMenuItems = () => (
  <>
    <MenuItem icon="users" to="/admin/user-management">
      Gerenciamento de usuários
    </MenuItem>
    {/* jhipster-needle-add-element-to-admin-menu - O JHipster adicionará entidades ao menu de administração aqui */}
  </>
);

const openAPIItem = () => (
  <MenuItem icon="book" to="/admin/docs">
    API
  </MenuItem>
);

const databaseItem = () => (
  <DropdownItem tag="a" href="/sqlite-console" target="_tab">
    <FontAwesomeIcon icon="database" fixedWidth/> Banco de dados
  </DropdownItem>
);

export const AdminMenu = ({showOpenAPI, showDatabase}) => (
  <NavDropdown icon="users-cog" name={<span style={{color: 'white'}}>Administração</span>} id="admin-menu"
               data-cy="adminMenu">
    {adminMenuItems()}
    {showOpenAPI && openAPIItem()}

    {showDatabase && databaseItem()}
  </NavDropdown>
);

export default AdminMenu;
