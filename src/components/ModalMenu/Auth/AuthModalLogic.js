import { useState, useRef, useEffect } from 'react';

// Логика модального окна авторизации
export const AuthModalLogic = ({ isOpen, onClose, onSuccess }) => {
  const [authData, setAuthData] = useState({  // Состояние формы: email и пароль
    email: '',
    password: ''
  });
  // Состояние для отображения общей ошибки авторизации (например, "неверный пароль")
  const [error, setError] = useState(null);
  // Состояние для хранения ошибок валидации по полям (например, "email обязателен")
  const [errors, setErrors] = useState({});
  // Состояние для определения, был ли клик внутри модального окна
  const [isMouseDownInside, setIsMouseDownInside] = useState(false);
  // Ссылка на DOM-элемент содержимого модального окна (для фокуса)
  const modalContentRef = useRef(null);
  const handleChange = (e) => {  // Обработка изменения значения инпутов
    const { name, value } = e.target;
    setAuthData(prev => ({    // Обновляем состояние authData по имени поля
      ...prev,
      [name]: value
    }));
    if (errors[name]) {    // Сброс ошибки для конкретного поля, если она была
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const validateForm = () => {  // Валидация формы авторизации
    const newErrors = {};
    if (!authData.email) {    // Проверка email
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(authData.email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!authData.password) {    // Проверка пароля
      newErrors.password = 'Пароль обязателен';
    }
    setErrors(newErrors);    // Сохраняем ошибки валидации и возвращаем true/false
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {  // Обработка отправки формы авторизации
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    setError(null);     // Сброс предыдущей ошибки
    if (!validateForm()) return; // Если валидация не пройдена — выходим
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {      // Отправка POST-запроса на авторизацию
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password
        }),
      });
      if (!response.ok) {      // Обработка ошибки от сервера
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сервера');
      }
      const data = await response.json();      // Извлечение токена и данных пользователя из ответа
      localStorage.setItem('auth_token', data.token); // Сохраняем токен
      if (onSuccess) {      // Если передана функция onSuccess — вызываем её и передаём данные пользователя
        onSuccess({
          name: data.user?.name,
          surname: data.user?.surname
        });
        window.location.reload(); // Перезагружаем страницу после входа
      }
      onClose(); // Закрытие модального окна
    } catch (error) {
      console.error('Ошибка при авторизации:', error);      // Обработка ошибки: вывод в консоль и отображение на экране
      setError(error.message || 'Не удалось подключиться к серверу');
    }
  };
  const handleOverlayMouseDown = (e) => {  // Обработка клика мышью по фону модального окна
    if (e.target === e.currentTarget) {
      setIsMouseDownInside(false);      // Клик был по фону
    } else {
      setIsMouseDownInside(true);      // Клик был внутри модального окна
    }
  };
  const handleOverlayMouseUp = (e) => {  // Обработка отпускания мыши
    if (e.target === e.currentTarget && !isMouseDownInside) {    // Если мышь была нажата и отпущена вне модального окна — закрываем его
      onClose();
    }
    setIsMouseDownInside(false);
  };
  useEffect(() => {  // Эффект блокировки прокрутки body при открытом модальном окне
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Запрещаем прокрутку
    } else {
      document.body.style.overflow = ''; // Возвращаем прокрутку
    }

    return () => {
      document.body.style.overflow = ''; // Очистка эффекта
    };
  }, [isOpen]);
  useEffect(() => {  // Эффект закрытия окна по клавише Escape
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  useEffect(() => {  // Эффект фокусировки на первом инпуте при открытии окна
    if (isOpen && modalContentRef.current) {
      const firstInput = modalContentRef.current.querySelector('input');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isOpen]);
  return {  // Возвращаем все данные и методы, нужные компоненту авторизации
    authData,                // Данные формы
    error,                   // Общая ошибка
    errors,                  // Ошибки валидации
    modalContentRef,         // Ссылка на содержимое модального окна
    handleChange,            // Обработка ввода
    handleSubmit,            // Обработка отправки
    handleOverlayMouseDown,  // Обработка мыши вниз (для закрытия по клику вне окна)
    handleOverlayMouseUp     // Обработка мыши вверх (закрытие, если клик был вне)
  };
};
