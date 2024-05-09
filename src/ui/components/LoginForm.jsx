import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';                        

import {
    formContainer,
    linkForm,  
    disabledButton,
    adminLinkForm,
    forgotLink,
} from './styles/LoginForm.module.css';

export const LoginForm = ({ 
  handleLogin, 
  handleTypeForm, 
  handleChange, 
  email, 
  password, 
  isDisabled, 
  handleResetPassForm, 
}) => {

  const { pathname } = useLocation();

  return (
    <form
      className={`animationPage ${ formContainer }`}
      onSubmit={ handleLogin }
    >
      <label htmlFor="email">Correo</label>
      <input 
        type="text"
        name="email"
        id="email" 
        placeholder="Correo"
        value={ email }
        onChange={ handleChange }
        autoComplete='on'
      />
      <label htmlFor="password">Password</label>
      <input 
        type="text" 
        name="password"
        id="password"
        placeholder="Password"
        value={ password }
        onChange={ handleChange }
      />
      <button
        type="submit"
        disabled={ isDisabled }
        className={ isDisabled ? disabledButton : '' }
      >
        INGRESAR
      </button>
      <span
        className={`
          ${ linkForm }
          ${ pathname === '/login-admin' ? adminLinkForm : '' }
        `}
      >
        ¿Aún no tienes cuenta?<br />
        <span
          onClick={ handleTypeForm }
        >
          Regístrate
        </span>
      </span>
      <span
        className={ forgotLink }
        onClick={ handleResetPassForm }
      >
        ¿Olvidaste tu password?
      </span>
    </form>
  );
};

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleTypeForm: PropTypes.func,
    handleResetPassForm: PropTypes.func,

    email: PropTypes.string,
    password: PropTypes.string,
    isDisabled: PropTypes.bool,
};
