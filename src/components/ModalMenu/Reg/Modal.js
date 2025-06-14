import React from 'react';
import { ModalLogic } from './ModalLogic';
import styles from '../Modal.module.scss';
import ButtonAnchor from '../../Buttons/ButtonAnchor';
import TypewriterPlaceholder from '../TypeWritter/TypewritterPlaceholder';

const ModalMenu = ({ isOpen, onClose, onSuccess, onSwitchToLogin }) => {
  const {
    formData,
    error,
    errors,
    success,
    handleChange,
    handleSubmit,
    handleOverlayMouseDown,
    handleOverlayMouseUp
  } = ModalLogic({ isOpen, onClose, onSuccess });

  if (!isOpen) return null;

  return (
    <div 
      className={`${styles.modal_overlay} ${isOpen ? styles.active : ''}`}
      onMouseDown={handleOverlayMouseDown}
      onMouseUp={handleOverlayMouseUp}
    >
      <div 
        className={`${styles.modal_content} ${isOpen ? styles.active : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={styles.modal_close}
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          &times;
        </button>
        
        <h2>Регистрация</h2>
        
        {error && <div className={styles.error_message}>{error}</div>}
        {success && (
          <div className={styles.success_message}>
            Регистрация прошла успешно!
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.modalCustom}>
            <div className={`${styles.form_group} ${styles.typewriter_container}`}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={errors.name ? styles.error : ''}
                placeholder=" "
              />
              <div className={styles.typewriter_placeholder}>
                <TypewriterPlaceholder text="Введите ваше имя" />
              </div>
            </div>
            {errors.name && <div className={styles.field_error}>{errors.name}</div>}

            <div className={`${styles.form_group} ${styles.typewriter_container}`}>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                className={errors.surname ? styles.error : ''}
                placeholder=" "
              />
              <div className={styles.typewriter_placeholder}>
                <TypewriterPlaceholder text="Введите вашу фамилию" />
              </div>
            </div>
            {errors.surname && <div className={styles.field_error}>{errors.surname}</div>}
            
            <div className={`${styles.form_group} ${styles.typewriter_container}`}>
              <input
                type="email"
                name="email"
                value={formData.email}
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
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
                className={errors.password ? styles.error : ''}
                placeholder=" "
              />
              <div className={styles.typewriter_placeholder}>
                <TypewriterPlaceholder text="Придумайте пароль" />
              </div>
            </div>
            {errors.password && <div className={styles.field_error}>{errors.password}</div>}

            <div className={`${styles.form_group} ${styles.typewriter_container}`}>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                minLength="8"
                className={errors.password_confirmation ? styles.error : ''}
                placeholder=" "
              />
              <div className={styles.typewriter_placeholder}>
                <TypewriterPlaceholder text="Повторите пароль" />
              </div>
            </div>
            {errors.password_confirmation && (
              <div className={styles.field_error}>{errors.password_confirmation}</div>
            )}
            
            <ButtonAnchor 
              type="submit" 
              className={styles.button_animated}
            >
              Зарегистрироваться
            </ButtonAnchor>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ModalMenu;