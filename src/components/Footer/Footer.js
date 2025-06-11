import React from 'react'
import style from './Footer.module.scss'
import mapImage from '../../assets/img/map/image.jpg'

export default function Footer() {
  return (
    <footer>
        <div className={style.Footer}>
          <div className='container'>
            <div className={style.columns}>
              <div className={style.column}>
                <h3 className={style.title}><span className={style.underline}>Компания</span></h3>
                <h4 className={style.text}>О нас</h4>
                <h4 className={style.text}>Проекты</h4>
                <h4 className={style.text}>Награды</h4>
              </div>
              <div className={style.column}>
                <h3 className={style.title}><span className={style.underline}>Контакты</span></h3>
                <h4 className={style.text}>г. Ижевск, <br/>ул. 10 лет Октября, 23, 55б</h4>
                <h4 className={style.text}>+7 (3412) 31-02-18</h4>
                <h4 className={style.text}>arplus@udm.ru</h4>
              </div>
              <div className={style.column}>
                <h3 className={style.title}><span className={style.underline}>Мы на карте</span></h3>
              <img src={mapImage} className={style.map} alt='map'></img>
              </div>
            </div>
          </div>
        </div>
        <div className={style.under_Footer}>
          <p className={style.body1}>© 2023 Архитектурное ателье “Плюс”. Все права защищены.</p>
        </div>
    </footer>
  )
}
