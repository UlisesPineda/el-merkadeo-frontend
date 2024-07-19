import { useState } from 'react';

import { LoginForm } from '../components';
import {
  loginFormContainer,
} from './styles/LoginAdminPage.module.css';
import { useAdminAuth, useAdminForm, useForm, useValidateForm } from '../hooks';
import { ResetPasswordForm } from '../components/ResetPasswordForm';



export const LoginAdminPage = () => {

  const [isDisabled, setIsDisabled] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  
  const { startAdminLogin, reqChangeAdminPassword } = useAdminAuth();
  const { validateEmptyInput, validateLoginForm, validateUserEmail } = useValidateForm();

  const { form, handleChange, resetForm } = useForm({ email: '', password: '', });
  const { adminForm, handleAdminChange, resetAdminForm } = useAdminForm({ email: '' });

  const disabledActions = () => {
    setIsDisabled( true );
    return true;
  };

  const enableActions = () => {
    resetAdminForm();
    resetForm();
    setIsDisabled( false );
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    validateEmptyInput( form ) &&
      validateLoginForm( form ) &&
        disabledActions() &&
          await startAdminLogin( form, setIsDisabled ) &&
            enableActions();
  };
  
  const handleResetPassForm = () => {
    setIsResetPassword( !isResetPassword );
  };

  const handleResetPassword = async(e) => {
    e.preventDefault();
    validateEmptyInput( adminForm ) &&
      validateUserEmail( adminForm ) &&
        disabledActions() &&
          await reqChangeAdminPassword( adminForm, setIsDisabled ) &&
            enableActions();
  };

  return (
    <div className="imageHeroeContainer">
      <div
        className={ loginFormContainer }
        >
        <h2 className='animationPage'>
          { isResetPassword ? 'Solicita el reestablecimiento de tu password' : 'Inicia sesión en tu panel de administración' }
        </h2>
        {
          isResetPassword 
            ?
              <ResetPasswordForm 
                email={ adminForm.email }
                handleResetPassword={ handleResetPassword }
                handleAdminChange={ handleAdminChange }
                isDisabled={ isDisabled }
                handleResetPassForm={ handleResetPassForm }
              />
            :
              <LoginForm 
                email={ form.email }
                password={ form.password }
                handleLogin={ handleLogin }
                handleChange={ handleChange }
                isDisabled={ isDisabled }
                handleResetPassForm={ handleResetPassForm }
              />
        }
      </div>
    </div>
  );
};
