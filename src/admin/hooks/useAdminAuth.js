import { useDispatch } from "react-redux";

import { useAlertMessage } from "../../ui/hooks/useAlertMessage.js";
import elMerkadeoAPI from "../../api/elMerkadeoAPI.js";
import { onLoginAdmin, onLogoutAdmin } from "../../store/slices/adminAuthSlice.js";
import { onClearSearch } from "../../store/slices/productsAdminSlice.js";
import { useProductData } from "./useProductData.js";



export const useAdminAuth = () => {

    const dispatch = useDispatch();
    const { startOpenAlert } = useAlertMessage();
    const { gettProducts } = useProductData();

    const startActivateAdmin = async( token ) => {
        try {
            const { data } = await elMerkadeoAPI.get(`auth-admin/activate-admin/${ token }`);
            startOpenAlert({
                title: data.message,
                text: data.text,
                button: true,
            });
            return true;
        } catch (error) {
            console.log(error);
            startOpenAlert({
                title: error.response.data.message,
                text: error.response.data.text,
                button: true,
            });
            return false;
        }
    };

    const startAdminLogin = async( form, setIsDisabled ) => {
        const { email, password } = form;
        try {
            const { data } = await elMerkadeoAPI.post('/auth-admin/login-admin', { email, password });
            localStorage.setItem('token', data.authToken);
            localStorage.setItem('isAdminAuth', true);
            dispatch( onLoginAdmin( data ) );
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: error.response.data.message,
                text: error.response.data.text,
                button: true,
            });
            setIsDisabled( false );
            return false;
        }
    };  

    const startAdminLogout = () => {
        dispatch( onLogoutAdmin() );
        dispatch( onClearSearch() );
        localStorage.clear();
        gettProducts();
    };

    const reqChangeAdminPassword = async( form, setIsDisabled ) => {
        try {
            await elMerkadeoAPI.post('/auth-admin/request-reset-password', form);
            startOpenAlert({
                title: 'El reestablecimento de tu password fue procesado exitosamente',
                text: 'Te hemos enviado un correo con las instrucciones para reestablecer tu password',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            if ( error.response.status === 404 ) {
                startOpenAlert({
                    title: error.response.data.message,
                    text: 'Ingresa tu correo de administrador',
                    button: true,
                });
                setIsDisabled( false );
                return false;
            }
            else {
                startOpenAlert({
                    title: 'Hubo un error al solicitar el nuevo password',
                    text: 'Intenta más tarde',
                    button: true,
                });
                setIsDisabled( false );
                return false;
            }
        }
    };

    const resetAdminPassword = async( token, form ) => {
        try {
            await elMerkadeoAPI.put(`auth-admin/reset-password/${ token }`, form );
            startOpenAlert({
                title: 'Tu password fue reestablecido correctamente',
                text: 'Ya puedes iniciar sesión',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: error.response.data.messages,
                text: 'Revisa la información ingresada',
                button: true,
            });
            return false;
        }
    };

    const editAdminName = async( form ) => {
        try {
            await checkAdminAuthToken();
            const { data } = await elMerkadeoAPI.put('auth-admin/update-admin-name', form);
            localStorage.setItem('token', data.authToken);
            localStorage.setItem('isAdminAuth', true);
            dispatch( onLoginAdmin( data ) );
            startOpenAlert({
                title: 'El nombre de usuario fue actualizado exitosamente',
                text: 'Ya se puede visualizar el cambio',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            if ( error.response.status === 401 ) {
                startOpenAlert({
                    title: 'Por inactividad tu sesión ha expirado',
                    text: 'Vuelve a iniciar sesión',
                    button: true,
                });
                return false;
            }
            else {
                startOpenAlert({
                    title: error.response.data.messages,
                    text: 'Revisa la información ingresada',
                    button: true,
                });
                return false;
            }
        }
    };

    const editAdminEmail = async( form ) => {
        try {
            await checkAdminAuthToken();
            const { data } = await elMerkadeoAPI.put('auth-admin/update-admin-email', form);
            localStorage.setItem('token', data.authToken);
            localStorage.setItem('isAdminAuth', true);
            dispatch( onLoginAdmin( data ) );
            startOpenAlert({
                title: 'El correo fue actualizado exitosamente',
                text: 'Este será tu nuevo nombre de usuario en tu próximo inicio de sesión',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            if ( error.response.status === 401 ) {
                startOpenAlert({
                    title: 'Por inactividad tu sesión ha expirado',
                    text: 'Vuelve a iniciar sesión',
                    button: true,
                });
                return false;
            }
            else {
                startOpenAlert({
                    title: error.response.data.messages,
                    text: 'Revisa la información ingresada',
                    button: true,
                });
                return false;
            }
        }
    };

    const editAdminPassword = async( form ) => {
        try {
            await checkAdminAuthToken();
            const { data } = await elMerkadeoAPI.put('auth-admin/update-admin-password', form);
            localStorage.setItem('token', data.authToken);
            localStorage.setItem('isAdminAuth', true);
            dispatch( onLoginAdmin( data ) );
            startOpenAlert({
                title: 'El password fue actualizado exitosamente',
                text: 'Úsalo en tu próximo inicio de sesión',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            if ( error.response.status === 401 ) {
                startOpenAlert({
                    title: 'Por inactividad tu sesión ha expirado',
                    text: 'Vuelve a iniciar sesión',
                    button: true,
                });
                return false;
            }
            else {
                startOpenAlert({
                    title: error.response.data.messages,
                    text: 'Revisa la información ingresada',
                    button: true,
                });
                return false;
            }
        }
    };

    const validateAuthAdminSesion = async() => {
        const token = localStorage.getItem('token');
        !token && dispatch( onLogoutAdmin() );
        try {
            const { data } = await elMerkadeoAPI.get('/auth-admin/renew-admin-token')
            localStorage.setItem('token', data.authToken);
            dispatch( onLoginAdmin( data ) );
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'Por inactividad tu sesión ha expirado',
                text: 'Vuelve a iniciar sesión',
                button: true,
            });   
            startAdminLogout();         
            return false;
        }
    };

    const checkAdminAuthToken = async() => {
        const token = localStorage.getItem('token');
        !token && dispatch( onLogoutAdmin() );
        try {
            const { data } = await elMerkadeoAPI.get('/auth-admin/renew-admin-token')
            localStorage.setItem('token', data.authToken);
            dispatch( onLoginAdmin( data ) );
        } catch (error) {
            console.log( error );
            startAdminLogout();
        }
    };

    return {
        startActivateAdmin,
        startAdminLogin,
        startAdminLogout,
        checkAdminAuthToken,
        editAdminName,
        editAdminEmail,
        editAdminPassword,
        reqChangeAdminPassword,
        resetAdminPassword,
        validateAuthAdminSesion,
    };
};