import React from 'react';

import emailIcon from '../../public/icons/email.svg';
import './styles.scss';

function ContactPage() {
  return (
    <div>
      <div className="notification">
        <h1 className="title">Contacts</h1>
        <p>
          <span className="icon">
            <img src={emailIcon} alt="email: " title="email" />
          </span>
          <span className="ContactPage__email">hello@test.com</span>
        </p>
      </div>
    </div>
  );
}

export default ContactPage;
