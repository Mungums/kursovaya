import React from 'react'
import style from './Presentation.module.scss'

export default function Presentation() {
  return (
<section class={style.presentation}>
  <h1 class={style.presentation__title}>
    Плюс к вашему пространству, стиль в каждой детали!
  </h1>
  <p class={style.presentation__subtitle}>
    Проектируем уютные пространства, которые делают каждый день комфортным и гармоничным
  </p>
  <a href="#anchor" class='anchor-button-hero'>Подробнее</a>
</section>
  )
}
