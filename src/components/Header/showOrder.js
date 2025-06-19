import { useState, useEffect } from 'react';
export const useShowOrders = () => { // Кастомный хук для получения списка заказов с сервера
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchOrders = async () => {  // Асинхронная функция получения заказов
    setLoading(true);     // Включаем индикатор загрузки
    setError(null);       // Сброс предыдущих ошибок
    try {

      const token = localStorage.getItem('auth_token');      // Получение токена авторизации из localStorage
      if (!token) throw new Error('Требуется авторизация');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Передаём токен в заголовке
          'Accept': 'application/json',        // Указываем, что ожидаем JSON
        },
      });


      if (!response.ok) {      // Если статус ответа не OK — обрабатываем как ошибку
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка сервера: ${response.status}`);
      }
      const { data } = await response.json();      // Получаем данные из ответа и сохраняем заказы в состояние
      setOrders(data || []);
    } catch (err) {
      setError(err.message);      // В случае ошибки сохраняем её текст в состояние и логируем в консоль
      console.error('Ошибка загрузки заказов:', err);
    } finally {
      setLoading(false);      // Выключаем индикатор загрузки вне зависимости от успеха запроса
    }
  };

  // useEffect вызывается при первом монтировании компонента
  // автоматически загружает список заказов
  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,            // список заказов
    loading,           // индикатор загрузки
    error,             // сообщение об ошибке
    refreshOrders: fetchOrders, // функция обновления данных вручную
  };
};
