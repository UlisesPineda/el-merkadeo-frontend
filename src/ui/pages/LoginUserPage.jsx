import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { LoginForm, RegisterForm } from '../components';
import {
  loginFormContainer,
} from './styles/LoginUserPage.module.css';
import { Navigate } from 'react-router-dom';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

export const LoginUserPage = () => {

  const { isUserAuth } = useSelector( state => state.userAuth );

  const [isUserActive, setIsUserActive] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isResetForm, setIsResetForm] = useState(false);
  const [isRegisterForm, setIsRegisterForm] = useState(false);


  const renderRegisterForm = () => {
    setIsLoginForm( false );
    setIsResetForm( false );
    setIsRegisterForm( true );
  };
  
  const renderLoginForm = () => {
    setIsRegisterForm( false );    
    setIsResetForm( false );
    setIsLoginForm( true );
  };

  const renderResetPasswordForm = () => {
    setIsRegisterForm( false );    
    setIsResetForm( true );
    setIsLoginForm( false );
  };

  useEffect(() => {
    setIsUserActive( true );
  }, []);
  

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
                  isUserActive={ isUserActive }
                  handleTypeForm={ renderRegisterForm }
                  handleResetPassForm={ renderResetPasswordForm }
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
                  handleTypeForm={ renderLoginForm }
                />
            }
          </div>
        </div>
  );
};
