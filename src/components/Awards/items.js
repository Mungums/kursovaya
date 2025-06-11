import React, { Component } from 'react'
import style from './Awards.module.scss'

export class Items extends Component {
  render() {
    return (
        <div className={style.list_awards}>
                {this.props.items.map((el, index) => (
                    <div key = {index} className={style.award_card}> 
                        <img src={el.img} alt={el.title} className={style.img_award} />
                        <div className={style.award_background}> 
                          <div className = {style.award_background_top}>
                            <h4 className={style.title}>{el.title}</h4>
                          </div>
                          <div className={style.award_background_bottom}>
                            <p className={style.desc}>{el.desc}</p>
                          </div>
                        </div>
                    </div>
                ))}
        </div>
    )
  }
}

export default Items