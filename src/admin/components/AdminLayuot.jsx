import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { useAdminAuth } from '../hooks';

import {
    navBar,
    adminSection,
    navLinksContainer,
    navLogo,
    icon,
    dashboard,
    products,
    settings,
    logout,
    contentButton,
    navLowerSection,
  } from './styles/AdminLayout.module.css';
  
  export const AdminLayuot = ({ children }) => {
    
    const { adminUser } = useSelector( state => state.adminAuth );
    const { startAdminLogout } =  useAdminAuth();

    return (
        <>
            <nav
                className={ navBar }
            >
                <div
                    className={ navLinksContainer }
                >
                    <img 
                        className={ navLogo }
                        src="/img/logo-purple-negative.webp" 
                        alt="Logotipo del sitio" 
                    />
                    <p>El Merkadeo</p>
                    <NavLink
                        to='/admin/dashboard'
                        title='Vista general'
                    >
                        <span>Dashboard</span>
                        <span
                            className={`${ icon } ${ dashboard }`}
                        >
                        </span>
                    </NavLink>
                    <NavLink
                        to='/admin/productos'
                        title='Administrador de productos'
                    >
                        <span>Productos</span>
                        <span
                            className={`${ icon } ${ products }`}
                        >
                        </span>
                    </NavLink>
                    <NavLink
                        to='/admin/configuracion'
                        title='Configuración de la cuenta'
                    >
                        <span>Configuración</span>
                        <span
                            className={`${ icon } ${ settings }`}
                        >
                        </span>
                    </NavLink>
                </div>
                <div
                    className={ navLowerSection }
                >
                    <p> { adminUser.adminName } </p>
                    <button
                        onClick={ startAdminLogout }
                        title='Terminar sesión'
                    >
                        <span
                            className={ contentButton }
                        >
                            Terminar Sesión
                        </span>
                        <span
                            className={`${ icon } ${ logout }`}
                        >
                        </span>
                    </button>
                </div>
            </nav>
            <section
                className={ adminSection }
            >
                { children }
            </section>
        </>
    );
};

AdminLayuot.propTypes = {
    children: PropTypes.element.isRequired,
};
