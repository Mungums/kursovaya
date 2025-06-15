import React, { useState } from 'react';
import { useShowOrders } from '../../Header/showOrder';
import style from './OrdersModal.module.scss';

const OrdersModal = ({ isOpen, onClose }) => {
  const { orders, loading, error, refreshOrders } = useShowOrders();
  const [editOrder, setEditOrder] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', due_date: '' });

  if (!isOpen) return null;

  const handleEdit = (order) => {
    setEditOrder(order);
    setFormData({
      title: order.title,
      description: order.description,
      due_date: order.due_date.slice(0, 10),
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Ошибка при удалении');

      alert('Заявка удалена');
      refreshOrders();
    } catch (err) {
      alert('Ошибка при удалении');
      console.error(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${editOrder.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Ошибка при обновлении');

      alert('Заявка обновлена');
      setEditOrder(null);
      refreshOrders();
    } catch (err) {
      alert('Ошибка при обновлении');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2 className={style.modalTitle}>Ваши заказы</h2>

        {loading && <div className={style.loadingStatus}>Загрузка данных...</div>}
        {error && (
          <div className={style.errorStatus}>
            Ошибка: {error}. Попробуйте обновить страницу.
          </div>
        )}
        {!loading && !error && orders.length === 0 && (
          <div className={style.emptyStatus}>У вас пока нет заказов</div>
        )}

        <div className={style.ordersList}>
          {orders.map((order) => (
            <div key={order.id} className={style.orderCard}>
              <div className={style.orderHeader}>
                <h3 className={style.orderTitle}>{order.title}</h3>
                <span className={style.orderDate}>
                  Создан: {new Date(order.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className={style.orderSection}>
                <span className={style.sectionLabel}>Описание проекта:</span>
                <p className={style.sectionText}>
                  {order.description || 'Описание не указано'}
                </p>
              </div>

              <div className={style.orderSection}>
                <span className={style.sectionLabel}>Срок сдачи:</span>
                <p className={style.sectionText}>
                  {new Date(order.due_date).toLocaleDateString()}
                </p>
              </div>

              {order.photo_path && (
                <div className={style.orderSection}>
                  <span className={style.sectionLabel}>Фотографии:</span>
                  <div className={style.photoWrapper}>
                    <img
                      src={`http://91.109.225.193:8000/storage/${order.photo_path}`}
                      alt={`Проект: ${order.title}`}
                      className={style.orderPhoto}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.error('Ошибка загрузки фото:', order.photo_path);
                      }}
                    />
                  </div>
                </div>
              )}

              <div className={style.orderStatus}>
                Статус: <span className={style.statusValue}>В работе</span>
              </div>

              <div className={style.orderActions}>
                <button
                  className={style.editButton}
                  onClick={() => handleEdit(order)}
                >
                  Редактировать
                </button>
                <button
                  className={style.deleteButton}
                  onClick={() => handleDelete(order.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        {editOrder && (
          <div className={style.editModalOverlay} onClick={() => setEditOrder(null)}>
            <div className={style.editModal} onClick={(e) => e.stopPropagation()}>
              <h3>Редактировать заявку</h3>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Название:
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Описание:
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Срок сдачи:
                  <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                    required
                  />
                </label>
                <div className={style.editActions}>
                  <button type="submit" className={style.editButton}>
                    Сохранить
                  </button>
                  <button
                    type="button"
                    className={style.deleteButton}
                    onClick={() => setEditOrder(null)}
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersModal;
