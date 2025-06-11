import React from 'react';
import Logo from '../../assets/img/header/logo/logo.png';
import style from './Header.module.scss';
import Button from '../Buttons/regButton';
import AuthButton from '../Buttons/authButton';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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

  return (
    <header>
      <div className={style.header}>
        <div className={style.container__header}>
          <div className={style.left}>
            <img src={Logo} alt='logo' className={style.logo} />
            <ul className={style.nav}>
              <li className={style.nav__li}>О нас</li>
              <li className={style.nav__li}>Заказать проект</li>
              <li className={style.nav__li}>Новости</li>
              <li className={style.nav__li}>Контакты</li>
            </ul>
          </div>

          <div className={style.right}>
            {!user ? (
              <>
                <Button onClick={() => setIsModalOpen(true)}>Регистрация</Button>
                <AuthButton onClick={() => setIsAuthModalOpen(true)}>Авторизация</AuthButton>
              </>
            ) : (
              <div className={style.userDropdown}>
                <div onClick={toggleDropdown} className={style.userName}>
                  {user.name} {user.surname.charAt(0)}.
                </div>
                {showDropdown && (
                  <ul className={style.dropdownMenu}>
                    <li onClick={handleLogout}>Выход</li>
                    <li onClick={() => setIsOrdersModalOpen(true)}>
                       Заказы
                    </li>
                  </ul>
                )}
              </div>
            )}
            <FontAwesomeIcon icon={faBars} className={style.menuIcon} />
          </div>
        </div>
      </div>

      <ModalMenu
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
      <OrdersModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
      />
    </header>
  );
};

export default Header;