import React from 'react';
import './navMenu.css';
import themes from '../../configs/themesToProjects';
import dataProjects from '../../data/dataProjects'

const NavMenu = ({ onItemMenuClick, currentMenuItem }) => {
  const handleClick = (name) => {
    onItemMenuClick && onItemMenuClick(name)
  }

  return (
    <nav className={`nav-menu ${themes[currentMenuItem]}`}>
      {
        dataProjects.map((item) => {
          const { name, screenName, annotation } = item;
          const active = (name === currentMenuItem) ? 'nav-menu__item_active' : '';
          return (
            <div
              onClick={() => handleClick(name)}
              key={name}
              className={`nav-menu__item ${active}`}
              data-item={name}>
              <div className="nav-menu__item_name">{screenName}</div>
              <div className="nav-menu__annotation">{annotation}</div>
            </div>
          )
        })
      }
    </nav>
  )
}

export default NavMenu;
