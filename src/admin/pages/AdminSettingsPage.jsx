import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  mainSection,
  container,
  sectionContainer,
  dataUser,
  editIcon,
  userForm,
  dataText,
  formContent,
  confirmIcon,
  show,
  hide,
  disbleConfirmIcon,
} from './styles/AdminSettingsPage.module.css';
import { useForm, useValidateForm } from '../../ui/hooks';
import { useAdminAuth } from '../hooks';

export const AdminSettingsPage = () => {

  const [isEditUser, setIsEditUser] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { adminUser } = useSelector( state => state.adminAuth );

  const { editAdminName, editAdminEmail, editAdminPassword } = useAdminAuth();
  const { validateAdminUserName, validateUserEmail, validateUserPassword } = useValidateForm();
  const { form, handleChange, resetForm } = useForm({
    adminName: '',
    email: '',
    password: '',
    newPassword: '',
  });

  const disableFormButton = () => {
    setIsDisabled( true );
    return true;
  };

  const enableFormButton = () => {
    resetForm();
    setIsDisabled( false );
    return true;
  };

  const handleEditAction = (e) => {
    const inputType = e.target.getAttribute('data-type')
    switch ( inputType ) {
      case 'admin-name':
        setIsEditEmail( false );
        setIsEditPassword( false );
        setIsEditUser( true );
        break;    
      case 'admin-email':
          setIsEditUser( false );
          setIsEditPassword( false );
          setIsEditEmail( true );
        break;    
      case 'admin-password':
          setIsEditUser( false );
          setIsEditEmail( false );
          setIsEditPassword( true );
        break;    
    }
  };

  const handleSaveChanges = async(e) => {
    e.preventDefault();
    isEditUser && 
      validateAdminUserName( form ) &&
        disableFormButton() &&
          await editAdminName( form ) &&
            enableFormButton() && 
              setIsEditUser( false );
    isEditEmail && 
      validateUserEmail( form ) &&
        disableFormButton() &&
          await editAdminEmail( form ) &&
            enableFormButton() &&
              setIsEditEmail( false );
    isEditPassword && 
      validateUserPassword( form ) &&
        disableFormButton() &&
          await editAdminPassword( form ) &&
            enableFormButton() &&
              setIsEditPassword( false );
  };

  return (
    <main
      className={` animationPage ${ mainSection } `}
    >
      <h2>Configuraciones de Administrador</h2>
      <div
        className={ container }
      >
        <div
          className={ sectionContainer }
        >
          <h3>Información de tu cuenta</h3>
          <div
            className={ dataUser }
          >
            <form className={ userForm }>
              <div
                className={` ${ dataText } ${ isEditUser ? hide : show } `}
              >
                <p>Usuario:</p>
                <p> { adminUser.adminName } </p>
                <button 
                  className={ editIcon }
                  onClick={ handleEditAction }
                  data-type='admin-name'
                  type='button'
                  title='Cambiar nombre de usuario'
                >
                </button>
              </div>
              <div
                className={` ${ formContent } ${ !isEditUser ? hide : show } `}
              >
                <label htmlFor="adminName">Usuario:</label>
                <input 
                  type="text" 
                  name='adminName' 
                  id='adminName' 
                  placeholder='Nuevo nombre de usuario'
                  value={ form.adminName }
                  onChange={ handleChange }
                />
                <button
                  className={` ${ confirmIcon } ${ isDisabled ? disbleConfirmIcon : '' } `}
                  onClick={ handleSaveChanges }
                  disabled={ isDisabled }
                  type='submmit'
                  title='Guardar cambios'
                >
                </button>
              </div>
            </form>
            <form className={ userForm }>
            <div
                className={` ${ dataText } ${ isEditEmail ? hide : show } `}
              >
                <p>Correo:</p>
                <p> { adminUser.email } </p>
                <button 
                  className={ editIcon }
                  onClick={ handleEditAction }
                  data-type='admin-email'
                  type='button'
                  title='Cambiar correo'
                >
                </button>
              </div>
              <div
                className={` ${ formContent } ${ !isEditEmail ? hide : show } `}
              >
                <label htmlFor="email">Correo:</label>
                <input 
                  type="email" 
                  name='email' 
                  id='email' 
                  placeholder='Nuevo correo de usuario'
                  value={ form.email }
                  onChange={ handleChange }
                />
                <button
                  className={` ${ confirmIcon } ${ isDisabled ? disbleConfirmIcon : '' } `}
                  onClick={ handleSaveChanges }
                  disabled={ isDisabled }  
                  type='submmit'
                  title='Guardar cambios'
                >
                </button>
              </div>
            </form>
            <form className={ userForm }>
            <div
                className={` ${ dataText } ${ isEditPassword ? hide : show } `}
              >
                <p>Password:</p>
                <p>*******</p>
                <button 
                  className={ editIcon }
                  onClick={ handleEditAction }
                  data-type='admin-password'
                  type='button'
                  title='Cambiar password'
                >
                </button>
              </div>
              <div
                className={` ${ formContent } ${ !isEditPassword ? hide : show } `}
              >
                <label htmlFor="password">Password actual:</label>
                <input 
                  type="password" 
                  name='password' 
                  id='password' 
                  placeholder='Ingresa tu password actual'
                  value={ form.password }
                  onChange={ handleChange }
                />
              </div>
            </form>
            <form className={ userForm }>
              <div
                className={` ${ formContent } ${ !isEditPassword ? hide : show } `}
              >
                <label htmlFor="newPassword">Nuevo Password:</label>
                <input 
                  type="text" 
                  name='newPassword' 
                  id='newPassword' 
                  placeholder='Nuevo password de usuario'
                  value={ form.newPassword }
                  onChange={ handleChange }
                />
                <button
                  className={` ${ confirmIcon } ${ isDisabled ? disbleConfirmIcon : '' } `}
                  onClick={ handleSaveChanges }
                  disabled={ isDisabled }
                  type='submmit'
                  title='Guardar cambios'
                >
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
