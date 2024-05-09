import { useState } from 'react';
import { useSelector } from 'react-redux';

import { LoginForm, RegisterForm } from '../components';
import {
  loginFormContainer,
} from './styles/LoginUserPage.module.css';
import { useAdminForm, useForm, useUserAuth, useValidateForm } from '../hooks';
import { Navigate } from 'react-router-dom';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

export const LoginUserPage = () => {

  const { isUserAuth } = useSelector( state => state.userAuth );

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [isResetForm, setIsResetForm] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { form, handleChange, resetForm } = useForm({ email: '', password: '' });
  const { adminForm, handleAdminChange, resetAdminForm } = useAdminForm({ email: '' });
  const { loginUser, reqChangeUserPassword } = useUserAuth();
  const { validateEmptyInput, validateLoginForm, validateUserEmail } = useValidateForm();

  const disabledActions = () => {
    setIsDisabled( true );
    return true;
  };

  const enableActions = () => {
    resetAdminForm();
    resetForm();
    setIsDisabled( false );
  };
  
  const renderRegisterForm = () => {
    setIsLoginForm( false );
    setIsResetForm( false );
    setIsRegisterForm( true );
  };
  
  const renderResetForm = () => {
    setIsLoginForm( false );
    setIsRegisterForm( false );    
    setIsResetForm( true );
  };
  
  const renderLoginForm = () => {
    setIsRegisterForm( false );    
    setIsResetForm( false );
    setIsLoginForm( true );
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    validateEmptyInput( form ) &&
      validateLoginForm( form ) &&
          await loginUser( form ) &&
            resetForm();
  };  

  const handleResetPassword = async(e) => {
    e.preventDefault();
    validateEmptyInput( adminForm ) &&
      validateUserEmail( adminForm ) &&
        disabledActions() &&
          await reqChangeUserPassword( adminForm ) &&
            enableActions();
  };

  return (
    isUserAuth
      ? 
        <Navigate to='/carrito' />
      : 
        <div className="imageHeroeContainer">
          <div
            className={ loginFormContainer }
          >
            <h2>Inicia sesión en tu cuenta de El Merkadeo</h2>
            {
              isLoginForm &&
                <LoginForm 
                  handleLogin={ handleLogin }
                  handleChange={ handleChange }
                  email={ form.email }
                  password={ form.password }
                  handleTypeForm={ renderRegisterForm }
                  handleResetPassForm={ renderResetForm }
                />
              }
            {
              isRegisterForm &&
                <RegisterForm 
                  handleTypeForm={ renderLoginForm }
                />
            }
            {
              isResetForm &&
              <ResetPasswordForm 
                handleResetPassForm={ renderLoginForm }
                handleResetPassword={ handleResetPassword }
                handleAdminChange={ handleAdminChange }
                email={ adminForm.email }
                isDisabled={ isDisabled }
              />
            }
          </div>
        </div>
  );
};
