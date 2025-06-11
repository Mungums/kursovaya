import React, { Component } from 'react';
import style from './Layout.module.scss'

export class Items extends Component {
  render() {
    return (
      <div className={style.project_cards}>
        {this.props.items.map((el, index) => (
          <div key={index} className={style.project_card}>
            <img src={el.img} alt={el.desc} className={style.img_project}/>
            <div className={style.desc_background}>
              <h4 className={style.project_desc}>{el.desc}</h4>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Items;