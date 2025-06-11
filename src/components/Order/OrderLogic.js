import { useState } from 'react';

export const useOrderLogic = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('title', orderData.projectName);
      formData.append('due_date', orderData.projectDate);
      formData.append('description', orderData.description || '');
      
      orderData.files.forEach((file, index) => {
        formData.append(`photos[]`, file);
      });

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка при создании заказа');
      }

      setSuccess(true);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
      window.location.reload()
    }
  };

  return { submitOrder, loading, error, success };
};