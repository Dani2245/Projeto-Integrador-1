import React from 'react';

import { NavDropdown } from './menu-components';
import EntitiesMenuItems from 'app/entities/menu';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={<span style={{ color: 'white' }}>Entitadades</span>} id="entity-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <EntitiesMenuItems />
  </NavDropdown>
);
