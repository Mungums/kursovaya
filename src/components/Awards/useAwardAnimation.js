// useAwardsAnimation.js
import { useEffect } from 'react';
import style from './Awards.module.scss';

const useAwardsAnimation = () => {
  useEffect(() => {
    const CARD = style.award_card;             
    const ACTIVE = style['award_card--active'];

    const cards = Array.from(document.querySelectorAll(`.${CARD}`));
    const isMobile = !window.matchMedia('(hover: hover)').matches;
    if (!isMobile) return;

    const onCardClick = (e) => {
      e.stopPropagation(); 

      const clicked = e.currentTarget;
      const wasActive = clicked.classList.contains(ACTIVE);

      cards.forEach(card => {
        card.classList.remove(ACTIVE);
      });

      if (!wasActive) {
        clicked.classList.add(ACTIVE);
      }
    };

    const onOutsideClick = (e) => {
      if (!e.target.closest(`.${CARD}`)) {
        cards.forEach(card => {
          card.classList.remove(ACTIVE);
        });
      }
    };

    cards.forEach(card => {
      card.addEventListener('click', onCardClick);
    });
    document.addEventListener('click', onOutsideClick);

    return () => {
      cards.forEach(card => {
        card.removeEventListener('click', onCardClick);
      });
      document.removeEventListener('click', onOutsideClick);
    };
  }, []);
};

export default useAwardsAnimation;
