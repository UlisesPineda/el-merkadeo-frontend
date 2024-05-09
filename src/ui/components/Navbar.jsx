import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { 
  siteNavbar,
  menuContainer, 
  linkMenu,
  linkMenuWhite,
  linkMenuBlack,
  logoDesktop,
  logoDesktopBlack,
  logoDesktopWhite,
  iconsMenu,
  cartWhite,
  userWhite,
  searchWhite,
  cartBlack,
  userBlack,
  searchBlack,
  siteNavbarWhite,
  logoutWhite,
  logoutBlack,
  settingsWhite,
  settingsBlack,
  cartNumberInactive,
  cartNumberActive,
} from './styles/Navbar.module.css';

import { returnToTop } from '../../helpers';
import { useUserAuth } from '../hooks';
import { calculateValue } from '../helpers/calculateValue';

export const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  const { logoutUser } = useUserAuth();

  const { isUserAuth } = useSelector( state => state.userAuth );
  const { userCart } = useSelector( state => state.cart );

  const products = userCart.map( cart => parseFloat( cart.quantity ) );
  const totalProducts = calculateValue( products );

  const startLogoutUser = () => {
    returnToTop();
    logoutUser();
  };

  const handleScroll = () => {
    window.scrollY > 85 
      ? setIsScrolled( true ) 
      : setIsScrolled( false );     
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      <nav className={`
        ${ siteNavbar }
        ${ isScrolled ? siteNavbarWhite : '' }
      `}>
        <div className={ menuContainer }>
          <NavLink 
          to='/tienda' 
          title='Catálogo 2024'
          onClick={ returnToTop }
          className={`
            ${ linkMenu }
            ${ isScrolled ? linkMenuBlack : linkMenuWhite }
          `}
          >
            COLECCIÓN 2024
          </NavLink>
        </div>
        <div className={ menuContainer }>
          <Link 
            to='/'
            title='El Merkadeo'
            onClick={ returnToTop }
            className={`
              ${ logoDesktop } 
              ${ isScrolled ? logoDesktopBlack : logoDesktopWhite }
            `} 
          ></Link>
        </div>
        <div className={ menuContainer }>
          <Link 
            to='/buscar'
            title='Buscar en la tienda'
            onClick={ returnToTop }
            className={`
              ${ iconsMenu } 
              ${ isScrolled ? searchBlack : searchWhite }
            `} 
          ></Link>
          <Link
            to='/carrito' 
            title='Carrito'
            onClick={ returnToTop }
            className={`
              ${ iconsMenu } 
              ${ isScrolled ? cartBlack : cartWhite }
            `} 
          >
            <span
              className={ userCart.length > 0 ? cartNumberActive : cartNumberInactive }
              key={ userCart.length }
            >
              { totalProducts }
            </span>
          </Link>
          {
            isUserAuth
              ?
                <>
                  <Link
                    to='configuracion'
                    title='Administra tu cuenta'
                    onClick={ returnToTop }
                    className={`
                      ${ iconsMenu }
                      ${ isScrolled ? settingsBlack : settingsWhite }
                    `}
                  />
                  <Link
                    to='/login' 
                    title='Terminar sesión'
                    onClick={ startLogoutUser }
                    className={`
                      ${ iconsMenu } 
                      ${ isScrolled ? logoutBlack : logoutWhite }
                    `} 
                  ></Link>
                </>
              :
                <Link
                  to='/login' 
                  title='Inicia sesión'
                  onClick={ returnToTop }
                  className={`
                    ${ iconsMenu } 
                    ${ isScrolled ? userBlack : userWhite }
                  `} 
                ></Link>
          }
        </div>
      </nav>
    </header>
  );
};
