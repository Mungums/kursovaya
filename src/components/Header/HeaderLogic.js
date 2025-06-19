import { useState, useEffect } from 'react';

export const HeaderLogic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);  // Состояние для модального окна авторизации
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);  // Состояние для модального окна с заказами
  const [user, setUser] = useState(null);  // Состояние текущего пользователя (null, если не авторизован)
  const [showDropdown, setShowDropdown] = useState(false);  // Состояние выпадающего меню (профиль, выход и т.д.)
  // useEffect срабатывает один раз при монтировании компонента
  // Проверяет, есть ли сохранённый пользователь в localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));      // Если пользователь найден — сохраняем его в состояние
    }
  }, []);
  const handleLogout = () => {  // Функция выхода из аккаунта
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');    // Удаление пользователя и токена из localStorage
    setUser(null);
    setShowDropdown(false);   // Сброс состояния пользователя и закрытие выпадающего меню
  };
  const toggleDropdown = () => {  // Переключение видимости выпадающего меню
    setShowDropdown(prev => !prev);
  };
  const handleAuthSuccess = (userData) => {  // Обработка успешной авторизации
    setUser(userData);    // Установка пользователя в состояние
    localStorage.setItem('user', JSON.stringify(userData));    // Сохранение пользователя в localStorage
    setIsAuthModalOpen(false); // Закрытие всех связанных модальных окон
    setIsModalOpen(false);
  };
  // Возвращаем из компонента все состояния и функции управления
  // Это используется в другом компоненте
  return {
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
  };
};
