import React from 'react'
import style from './Counts.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faUsers, faBuilding, faUserTie, faShield, faHandshake } from '@fortawesome/free-solid-svg-icons'

export default function Counts() {
  return (
    <div className={style.counts}>
    <div className='container'>
        <h2 className={style.trustUs}>Нам стоит доверять</h2>
        <div className={style.count_cards}>
            <div className={style.count_card}>
              <FontAwesomeIcon icon={faCalendarDays} className={style.icon}/>
              <h3 className={style.main_text}>30</h3>
              <h4 className={style.second_text}>лет на рынке</h4>
            </div>
            <div className={style.count_card}>
              <FontAwesomeIcon icon={faUsers} className={style.icon}/>
              <h3 className={style.main_text}>1000</h3>
              <h4 className={style.second_text}>Довольных клиентов</h4>
            </div>
            <div className={style.count_card}>
              <FontAwesomeIcon icon={faBuilding} className={style.icon}/>
              <h3 className={style.main_text}>3000+</h3>
              <h4 className={style.second_text}>Реализованных проектов</h4>
            </div>
            <div className={style.count_card}>
              <FontAwesomeIcon icon={faUserTie} className={style.icon}/>
              <h3 className={style.main_text}>30</h3>
              <h4 className={style.second_text}>Сотрудников в команде</h4>
            </div>
            </div>
            <div className={style.garanties}>
            <div className={style.count_card}>
              <FontAwesomeIcon icon={faShield} className={style.icon}/>
              <h3 className={style.main_text}>Гарантия качества</h3>
              <h4 className={style.second_text}>Все проекты проходят <br/> многоэтапный контроль</h4>
            </div>
            <div className={style.count_card}>
              <FontAwesomeIcon icon={faHandshake} className={style.icon}/>
              <h3 className={style.main_text}>Надежность</h3>
              <h4 className={style.second_text}>Работаем по договору с <br/>фиксированными сроками</h4>
            </div>
        </div>
      </div>
    </div>
  )
}
