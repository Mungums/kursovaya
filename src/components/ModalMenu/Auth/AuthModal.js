import React from 'react';
import { AuthModalLogic } from './AuthModalLogic';
import styles from '../Modal.module.scss';
import ButtonAnchor from '../../Buttons/ButtonAnchor';
import TypewriterPlaceholder from '../TypeWritter/TypewritterPlaceholder';

const AuthModal = ({ isOpen, onClose, onSuccess, onSwitchToRegister }) => {
  const {
    authData,
    error,
    errors,
    modalContentRef,
    handleChange,
    handleSubmit,
    handleOverlayMouseDown,
    handleOverlayMouseUp
  } = AuthModalLogic({ isOpen, onClose, onSuccess });

  if (!isOpen) return null;

  return (
    <div 
      className={`${styles.modal_overlay} ${isOpen ? styles.active : ''}`}
      onMouseDown={handleOverlayMouseDown}
      onMouseUp={handleOverlayMouseUp}
    >
      <div 
        className={`${styles.modal_content} ${isOpen ? styles.active : ''}`}
        ref={modalContentRef}
      >
        <button 
          className={styles.auth_modal_close}
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          &times;
        </button>
        
        <h2>Авторизация</h2>
        
        {error && <div className={styles.error_message}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.modalCustom}>
            <div className={`${styles.form_group} ${styles.typewriter_container}`}>
              <input
                id="auth-email"
                type="email"
                name="email"
                value={authData.email}
                onChange={handleChange}
                required
                className={errors.email ? styles.error : ''}
                placeholder=" "
              />
              <div className={styles.typewriter_placeholder}>
                <TypewriterPlaceholder text="Введите ваш email" />
              </div>
            </div>
            {errors.email && <div className={styles.field_error}>{errors.email}</div>}
            
            <div className={`${styles.form_group} ${styles.typewriter_container}`}>
              <input
                id="auth-password"
                type="password"
                name="password"
                value={authData.password}
                onChange={handleChange}
                required
                className={errors.password ? styles.error : ''}
                placeholder=" "
              />
              <div className={styles.typewriter_placeholder}>
                <TypewriterPlaceholder text="Введите ваш пароль" />
              </div>
            </div>
            {errors.password && <div className={styles.field_error}>{errors.password}</div>}
            
            <ButtonAnchor 
              type="submit" 
              className={styles.button_animated}
            >
              Войти
            </ButtonAnchor>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AuthModal;