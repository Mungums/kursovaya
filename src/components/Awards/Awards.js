import React from 'react'
import style from './Awards.module.scss'
import Items from './items'
import { awards } from './listOfAwards'
import ButtonAnchor from '../Buttons/ButtonAnchor'

export default function Awards() {
  return (
    <div className = 'container'>
      <div className={style.awards}>
          <h2 className={style.awards_title}>Награды</h2>
          <Items items = {awards}/>
          <ButtonAnchor>Больше</ButtonAnchor>
      </div>
    </div>
  )
}
