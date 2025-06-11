import { useState, useEffect } from 'react';

export const ModalLogic = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isMouseDownOnOverlay, setIsMouseDownOnOverlay] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка регистрации');
      }

      const data = await response.json();
      setSuccess(true);
      
      if (onSuccess) {
        onSuccess({
          name: data.user?.name,
          surname: data.user?.surname
        });
          window.location.reload()
      }

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setError(error.message || 'Не удалось подключиться к серверу');
    }
  };

  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      setIsMouseDownOnOverlay(true);
    }
  };

  const handleOverlayMouseUp = (e) => {
    if (isMouseDownOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
    setIsMouseDownOnOverlay(false);
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

  return {
    formData,
    error,
    errors,
    success,
    handleChange,
    handleSubmit,
    handleOverlayMouseDown,
    handleOverlayMouseUp
  };
};