import { useState, useRef, useEffect } from 'react';

export const AuthModalLogic = ({ isOpen, onClose, onSuccess }) => {
  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isMouseDownInside, setIsMouseDownInside] = useState(false);
  const modalContentRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!authData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(authData.email)) {
      newErrors.email = 'Некорректный email';
    }
    
    if (!authData.password) {
      newErrors.password = 'Пароль обязателен';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сервера');
      }

      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      
      if (onSuccess) {
        onSuccess({
          name: data.user?.name,
          surname: data.user?.surname
        });
        window.location.reload()
      }

      onClose();
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      setError(error.message || 'Не удалось подключиться к серверу');
    }
  };

  const handleOverlayMouseDown = (e) => {

    if (e.target === e.currentTarget) {
      setIsMouseDownInside(false);
    } else {
      setIsMouseDownInside(true);
    }
  };

  const handleOverlayMouseUp = (e) => {

    if (e.target === e.currentTarget && !isMouseDownInside) {
      onClose();
    }
    setIsMouseDownInside(false);
  };


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
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

  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      const firstInput = modalContentRef.current.querySelector('input');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isOpen]);

  return {
    authData,
    error,
    errors,
    modalContentRef,
    handleChange,
    handleSubmit,
    handleOverlayMouseDown,
    handleOverlayMouseUp
  };
};