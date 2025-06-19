import { useState, useEffect } from 'react';
// Логика модального окна регистрации
export const ModalLogic = ({ isOpen, onClose, onSuccess }) => {
  // Состояние данных формы регистрации
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState(null);  // Общая ошибка (например, от сервера)
  const [errors, setErrors] = useState({});  // Объект с ошибками валидации по каждому полю
  const [success, setSuccess] = useState(false); // Флаг успешной регистрации (для отображения сообщения, анимации и т.п.)
  const [isMouseDownOnOverlay, setIsMouseDownOnOverlay] = useState(false);  // Состояние: был ли клик мышью по фону модального окна (для закрытия при клике вне)
  const handleChange = (e) => {  // Обработка изменения значений полей формы
    const { name, value } = e.target;
    setFormData(prev => ({    // Обновляем соответствующее поле в состоянии формы
      ...prev,
      [name]: value
    }));
    if (errors[name]) {   // Сброс ошибки по полю, если она была
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const validateForm = () => {  // Функция валидации формы регистрации
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Имя обязательно';
    if (!formData.surname) newErrors.surname = 'Фамилия обязательна';
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов';
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Пароли не совпадают';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;    // Если нет ошибок — возвращаем true
  };
  const handleSubmit = async (e) => {  // Обработка отправки формы регистрации
    e.preventDefault();     // Предотвращаем перезагрузку страницы
    setError(null);         // Сбрасываем старую ошибку
    if (!validateForm()) return;  // Если валидация не прошла — выходим
    try {
      // Отправка POST-запроса на регистрацию
      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData), // Отправляем данные формы
      });
      if (!response.ok) {
        const errorData = await response.json();        // Парсим ошибку от сервера, если есть
        throw new Error(errorData.message || 'Ошибка регистрации');
      }

      const data = await response.json();
      setSuccess(true);      // Устанавливаем флаг успеха (можно показать сообщение "Вы успешно зарегистрированы")
      if (onSuccess) {      // Если передан колбэк onSuccess — вызываем его с именем и фамилией
        onSuccess({
          name: data.user?.name,
          surname: data.user?.surname
        });
        window.location.reload();        // Перезагружаем страницу (например, чтобы обновился header)
      }
      setTimeout(() => {      // Закрываем модалку через 2 секунды после успешной регистрации
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setError(error.message || 'Не удалось подключиться к серверу');
    }
  };
  const handleOverlayMouseDown = (e) => {  // Обработка нажатия мыши по фону (начало)
    if (e.target === e.currentTarget) {

      setIsMouseDownOnOverlay(true);      // Клик был именно по фону (а не по содержимому модалки)
    }
  };
  const handleOverlayMouseUp = (e) => {  // Обработка отпускания мыши (если клик был по фону — закрываем модалку)
    if (isMouseDownOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
    setIsMouseDownOnOverlay(false);
  };
  useEffect(() => {  // Эффект: блокируем прокрутку body при открытии модального окна
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {    // Очистка при размонтировании
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  useEffect(() => {  // Эффект: закрытие модального окна при нажатии клавиши Escape
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {    // Очистка обработчика при размонтировании
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Возвращаем все значения и методы, нужные компоненту регистрации
  return {
    formData,                // Данные формы
    error,                   // Общая ошибка
    errors,                  // Ошибки по полям
    success,                 // Флаг успешной регистрации
    handleChange,            // Обработка ввода
    handleSubmit,            // Отправка формы
    handleOverlayMouseDown,  // Для закрытия при клике вне окна
    handleOverlayMouseUp     // Завершение клика вне окна
  };
};
