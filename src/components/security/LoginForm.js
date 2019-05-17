import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onFacebookClick }) => (
  <>
    <h1>¡Bienvenido!</h1>
    <p>Inicia sesión con Facebook para ver la lista de usuarios</p>
    <button
      type="button"
      className="button button-block"
      onClick={onFacebookClick}
    >
      Iniciar sesión con Facebook
    </button>
  </>
);

LoginForm.propTypes = {
  onFacebookClick: PropTypes.func.isRequired
};

export default LoginForm;
