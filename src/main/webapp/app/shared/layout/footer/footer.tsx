import './footer.scss';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => (
  <div className="footer">
    <div className="d-flex justify-content-center">
      <p>
        Made with <FontAwesomeIcon icon="heart" style={{ color: '#D8165A' }} /> using PyHipster
      </p>
    </div>
  </div>
);

export default Footer;
