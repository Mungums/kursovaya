import React, { useState, useEffect, useRef } from 'react';
import style from './Award.module.scss';
import Items from './items';
import { awards } from './listOfAwards';
import ButtonAnchor from '../Buttons/ButtonAnchor';

export default function Awards() {
  const [activeCardId, setActiveCardId] = useState(null);
  const listRef = useRef(null);

  // Обработчик клика вне списка карточек
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) {
        setActiveCardId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleCardClick = (id) => {
    setActiveCardId(prev => (prev === id ? null : id));
  };

  return (
    <div className="container">
      <div className={style.awards}>
        <h2 className={style.awards_title}>Награды</h2>
        <div ref={listRef}>
          <Items
            items={awards}
            activeCardId={activeCardId}
            onCardClick={handleCardClick}
          />
        </div>
        <ButtonAnchor>Больше</ButtonAnchor>
      </div>
    </div>
  );
}
