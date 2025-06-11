import { useState, useEffect } from 'react';

export const HeaderLogic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false); // Добавлено состояние
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    setUser(null);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    isAuthModalOpen,
    isOrdersModalOpen, // Добавлено в возвращаемые значения
    user,
    showDropdown,
    setIsModalOpen,
    setIsAuthModalOpen,
    setIsOrdersModalOpen, // Добавлена функция
    handleLogout,
    toggleDropdown,
    handleAuthSuccess
  };
};