import React from 'react';
import styles from './Layout.module.scss';
import Items from './items';
import { projects } from './buildings';
import ButtonAnchor from '../Buttons/ButtonAnchor'

export default function Layout() {
  return (
    <div className={styles.background}>
      <div className='container'>
        <h2 className={styles.realised}>Реализованные проекты</h2>
        <Items items={projects} />
        <ButtonAnchor>Больше</ButtonAnchor>
      </div>
    </div>
  );
}