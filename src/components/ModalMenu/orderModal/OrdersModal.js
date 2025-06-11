import React from 'react';
import { useShowOrders } from '../../Header/showOrder';
import style from './OrdersModal.module.scss';

const OrdersModal = ({ isOpen, onClose }) => {
  const { orders, loading, error } = useShowOrders();

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeButton} onClick={onClose}>
          &times;
        </button>
        
        <h2 className={style.modalTitle}>Ваши заказы</h2>
        
        {loading && (
          <div className={style.loadingStatus}>Загрузка данных...</div>
        )}
        
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;