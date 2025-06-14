import React, { Component } from 'react';
import style from './Award.module.scss';

export class Items extends Component {
  render() {
    const { items, activeCardId, onCardClick } = this.props;

    return (
      <div className={style.list_awards}>
        {items.map((el, index) => {
          const isActive = index === activeCardId;
          return (
            <div
              key={index}
              className={
                `${style.award_card}` +
                (isActive ? ` ${style['award_card--active']}` : '')
              }
              onClick={(e) => {
                e.stopPropagation();     // чтобы не срабатывал outer click
                onCardClick(index);
              }}
            >
              <img
                src={el.img}
                alt={el.title}
                className={style.img_award}
              />
              <div className={style.award_background}>
                <div className={style.award_background_top}>
                  <h4 className={style.title}>{el.title}</h4>
                </div>
                <div className={style.award_background_bottom}>
                  <p className={style.desc}>{el.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Items;
