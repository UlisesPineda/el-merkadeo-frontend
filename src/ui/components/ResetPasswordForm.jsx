import PropTypes from 'prop-types';

import {
    formContainer,
    disabledButton,
    forgotLink,
} from './styles/LoginForm.module.css';

export const ResetPasswordForm = ({
    handleResetPassword, 
    handleAdminChange, 
    email, 
    isDisabled, 
    handleResetPassForm,   
}) => {
  return (
    <form
        className={`animationPage ${ formContainer }`}
        onSubmit={ handleResetPassword }
    >
        <label htmlFor="email">Correo</label>
        <input 
            type="text"
            name="email"
            id="email" 
            placeholder="Correo de administrador"
            value={ email }
            onChange={ handleAdminChange }
            autoComplete='on'
        />
        <button
            type="submit"
            disabled={ isDisabled }
            className={ isDisabled ? disabledButton : '' }
        >
            Reestablecer Password
        </button>
        <span
            className={ forgotLink }
            onClick={ handleResetPassForm }
        >
            Iniciar Sesión
        </span>
    </form>
  );
};

ResetPasswordForm.propTypes = {
    handleResetPassword: PropTypes.func.isRequired,
    handleAdminChange: PropTypes.func,
    handleResetPassForm: PropTypes.func,

    email: PropTypes.string,
    isDisabled: PropTypes.bool,
};
