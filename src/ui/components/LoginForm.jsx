import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';                        

import {
    formContainer,
    linkForm,  
    disabledButton,
    adminLinkForm,
    forgotLink,
} from './styles/LoginForm.module.css';
import { useAdminAuth, useForm, useUserAuth, useValidateForm } from '../hooks';

export const LoginForm = ({ 
  isUserActive,
  handleTypeForm,
  handleResetPassForm,   
}) => {
  const { pathname } = useLocation();

  const { loginAdmin } = useAdminAuth();
  const { loginUser } = useUserAuth();
  const { validateEmptyInput, validateLoginForm } = useValidateForm();
  const { 
    form, 
    handleChange, 
    disabledActions, 
    enableActions, 
    isDisabled,
    setIsDisabled
  } = useForm({ email: '', password: '' });

  const actionForm = async() => {
    if( isUserActive ) {
      return await loginUser( form );
    }
    else {
      return await loginAdmin( form );
    }
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    validateEmptyInput( form ) &&
      validateLoginForm( form ) &&
        disabledActions() &&
          await actionForm() ?
            enableActions() :
              setIsDisabled( false );
  };

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
        value={ form.email }
        onChange={ handleChange }
        autoComplete='on'
      />
      <label htmlFor="password">Password</label>
      <input 
        type="text" 
        name="password"
        id="password"
        placeholder="Password"
        value={ form.password }
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
    isUserActive: PropTypes.bool,
    handleTypeForm: PropTypes.func,
    handleResetPassForm: PropTypes.func,
};
