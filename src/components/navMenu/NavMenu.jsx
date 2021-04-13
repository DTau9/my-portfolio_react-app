import React, { forwardRef } from 'react';
import styles from './navMenu.module.css';
import dataProjects from '../../data/dataProjects'

const createList = (el, index) => {
  return (typeof el !== 'string')
    ? <ul key={index}>{el.map((el, index) => createList(el, index))}</ul>
    : <li key={index}>{el}</li>;
}

const NavMenu = forwardRef(
  ({ onItemMenuClick, currentMenuItem, currentDevice }, navMenuRef) => {
    const handleClick = (name) => {
      onItemMenuClick && onItemMenuClick(name)
    }

    const listItem = (
      <div className={styles.projects}>
        {
          dataProjects.map((item) => {
            const { name, screenName, annotation, dateCreation } = item;
            const active = (name === currentMenuItem) ? styles['projects-item_active'] : '';
            return (
              <div
                onClick={() => handleClick(name)}
                key={name}
                className={`${styles['projects-item']} ${active}`}
                data-item={name}>
                <div>{screenName}</div>
                <div className={styles.annotation}>{annotation}</div>
                <div className={styles.date}>{dateCreation}</div>
              </div>
            )
          })
        }
      </div>
    )

    const description = dataProjects.reduce((acc, cur) => {
      if (cur.description && cur.name === currentMenuItem && currentDevice === 'phone') {
        return (acc = cur.description);
      }
      return acc;
    }, false)

    const viewDescription = description ?
      <div className={styles.description}>
        {createList(description)}
      </div> :
      null;

    return (
      <nav
        ref={navMenuRef}
        className={styles['nav-menu']}
      >
        { listItem}
        { viewDescription}
      </nav>
    )
  }
)

export default NavMenu;
