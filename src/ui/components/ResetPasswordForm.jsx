import PropTypes from 'prop-types';

import {
    formContainer,
    disabledButton,
    forgotLink,
} from './styles/LoginForm.module.css';
import { useAdminAuth, useForm, useUserAuth, useValidateForm } from '../hooks';

export const ResetPasswordForm = ({
    handleTypeForm,
    isUserActive,   
}) => {

    const { reqChangeUserPassword } = useUserAuth();
    const { reqChangeAdminPassword } = useAdminAuth();
    const { validateEmptyInput, validateUserEmail } = useValidateForm();
    const { 
        form, 
        handleChange, 
        isDisabled, 
        disabledActions, 
        enableActions, 
        setIsDisabled 
    } = useForm({ email: '' });

    const actionForm = async() => {
        if( isUserActive ) {
          return await reqChangeUserPassword( form );
        }
        else {
          return await reqChangeAdminPassword( form );
        }
      };    

    const handleResetPassword = async(e) => {
        e.preventDefault();
        validateEmptyInput( form ) &&
          validateUserEmail( form ) &&
            disabledActions() &&
              await actionForm() ?
                enableActions() :
                    setIsDisabled( false );
      };

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
            value={ form.email }
            onChange={ handleChange }
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
            onClick={ handleTypeForm }
        >
            Iniciar Sesión
        </span>
    </form>
  );
};

ResetPasswordForm.propTypes = {
    isUserActive: PropTypes.bool,
    handleTypeForm: PropTypes.func,
};
