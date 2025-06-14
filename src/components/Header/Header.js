import React, { useState, useEffect } from 'react';
import Logo from '../../assets/img/header/logo/logo.png';
import style from './Header.module.scss';
import Button from '../Buttons/regButton';
import AuthButton from '../Buttons/authButton';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalMenu from '../ModalMenu/Reg/Modal';
import AuthModal from '../ModalMenu/Auth/AuthModal';
import OrdersModal from '../ModalMenu/orderModal/OrdersModal';
import { HeaderLogic } from './HeaderLogic';

const Header = () => {
  const {
    isModalOpen,
    isAuthModalOpen,
    isOrdersModalOpen,
    user,
    showDropdown,
    setIsModalOpen,
    setIsAuthModalOpen,
    setIsOrdersModalOpen,
    handleLogout,
    toggleDropdown,
    handleAuthSuccess
  } = HeaderLogic();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleModalOpen = (modalType) => {
    if (isMobileView) {
      setIsMobileNavOpen(false);
    }
    if (modalType === 'reg') setIsModalOpen(true);
    if (modalType === 'auth') setIsAuthModalOpen(true);
    if (modalType === 'orders') setIsOrdersModalOpen(true);
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.leftSide}>
          <img src={Logo} alt="logo" className={style.logo} />
          
          <nav className={style.desktopNav}>
            <ul className={style.navList}>
              <li className={style.navItem}>О нас</li>
              <li className={style.navItem}>Заказать проект</li>
              <li className={style.navItem}>Новости</li>
              <li className={style.navItem}>Контакты</li>
            </ul>
          </nav>
        </div>

        <div className={style.rightSide}>
          <div className={style.desktopAuth}>
            {!user ? (
              <>
                <Button onClick={() => handleModalOpen('reg')}>Регистрация</Button>
                <AuthButton onClick={() => handleModalOpen('auth')}>Авторизация</AuthButton>
              </>
            ) : (
              <div className={style.userMenu}>
                <div className={style.userName} onClick={toggleDropdown}>
                  {user.name} {user.surname.charAt(0)}.
                </div>
                {showDropdown && (
                  <ul className={style.userDropdown}>
                    <li onClick={handleLogout}>Выход</li>
                    <li onClick={() => handleModalOpen('orders')}>Заказы</li>
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className={style.mobileMenuWrapper}>
            <button 
              className={style.mobileMenuButton} 
              onClick={toggleMobileNav}
              aria-label="Меню"
            >
              <FontAwesomeIcon 
                icon={isMobileNavOpen ? faTimes : faBars} 
                className={style.menuIcon}
              />
            </button>
            
            {isMobileNavOpen && (
              <ul className={style.mobileDropdown}>
                {!user && (
                  <>
                    <li className={style.dropdownItem} onClick={() => handleModalOpen('reg')}>Регистрация</li>
                    <li className={style.dropdownItem} onClick={() => handleModalOpen('auth')}>Авторизация</li>
                  </>
                )}
                <li className={style.dropdownItem}>О нас</li>
                <li className={style.dropdownItem}>Заказать проект</li>
                <li className={style.dropdownItem}>Новости</li>
                <li className={style.dropdownItem}>Контакты</li>
                {user && (
                  <>
                    <li className={style.dropdownItem} onClick={() => handleModalOpen('orders')}>Заказы</li>
                    <li className={style.dropdownItem} onClick={handleLogout}>Выход</li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Модальные окна */}
      <ModalMenu
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAuthSuccess}
        isMobile={isMobileView}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        isMobile={isMobileView}
      />
      <OrdersModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
        isMobile={isMobileView}
      />
    </header>
  );
};

export default Header;