import React, { Component, createRef } from 'react';
import dataProjects from '../../data/dataProjects';
import themes from '../../configs/themesToProjects';

import Contacts from '../contacts/Contacts';
import NavMenu from '../navMenu/NavMenu';
import DeviceSwitcher from '../deviceSwitcher/DeviceSwitcher';
import ViewProject from '../viewProject/ViewProject';

import styles from './app.module.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.navMenuRef = createRef();
    this.viewProjectRef = createRef();
    this.burgerRef = createRef();
    this.state = {
      currentMenuItem: 'contacts',
      currentDevice: 'phone'
    }
  }

  onItemMenuClick = (name) => {
    if (this.state.currentMenuItem !== name) {
      this.toggleClass();

      if (document.documentElement.clientWidth > 1023) {
        setTimeout(() => {
          const newCurrentDevice = dataProjects.reduce((acc, cur) => {
            if (cur.name === name && cur.device) {
              if (cur.device.includes(this.state.currentDevice)) {
                return acc = this.state.currentDevice
              } else {
                return acc = cur.device[0]
              }
            }
            return acc;
          }, this.state.currentDevice)

          this.setState({
            currentMenuItem: name,
            currentDevice: newCurrentDevice
          })
          this.toggleClass();
        }, 700)
      }

      if (document.documentElement.clientWidth <= 1023) {
        this.setState({
          currentMenuItem: name
        })
      }
    }
  }

  onDeviceClick = (devName) => {
    if (this.state.currentDevice !== devName) {
      this.toggleClass();

      setTimeout(() => {
        this.setState({
          currentDevice: devName
        })
        this.toggleClass();
      }, 700)
    }
  }

  toggleClass = () => {
    if (document.documentElement.clientWidth > 1023) {
      if (this.state.currentDevice === 'desktop' && this.getDevicesCurrentMenuItem()) {
        this.navMenuRef.current.classList.toggle(styles['shift-section-for-desktop'])
      } else {
        this.navMenuRef.current.classList.toggle(styles['shift-section'])
      }
      this.viewProjectRef.current.classList.toggle(styles['shift-section']);
    }

    if (document.documentElement.clientWidth <= 1023) {
      this.navMenuRef.current.classList.toggle(styles['shift-section']);
      this.viewProjectRef.current.classList.toggle(styles['shift-section']);
      this.burgerRef.current.classList.toggle(styles.active);
      this.navMenuRef.current.classList.toggle(styles['opacity']);
    }
  }

  getDevicesCurrentMenuItem = () => {
    const dataCurrentItem = dataProjects.find(item => {
      if (item.name === this.state.currentMenuItem) return true;
    });
    if (document.documentElement.clientWidth > 1023) {
      return dataCurrentItem.device ? dataCurrentItem.device : false;
    } else { return false }

  }

  onBurger = (e) => {
    e.preventDefault();
    this.toggleClass();
  }

  componentDidMount() {
    this.toggleClass();
    if (document.documentElement.clientWidth <= 1023) {
      this.viewProjectRef.current.classList.toggle(styles['shift-section']);
      this.navMenuRef.current.classList.remove(styles['opacity']);
    }
  }


  render() {
    const { currentMenuItem } = this.state;
    const currentScreenName = dataProjects.find(el => el.name === currentMenuItem).screenName;
    return (
      <div className={`${styles['container-app']} ${themes[currentMenuItem]}`}>
        <NavMenu
          onItemMenuClick={this.onItemMenuClick}
          currentMenuItem={currentMenuItem}
          currentDevice={this.state.currentDevice}
          ref={this.navMenuRef}
        />

        <div
          className={styles['view-project']}
          ref={this.viewProjectRef}
        >
          {
            this.state.currentMenuItem !== 'contacts'
              ? (
                <>
                  <DeviceSwitcher
                    devicesCurrentMenuItem={this.getDevicesCurrentMenuItem()}
                    currentDevice={this.state.currentDevice}
                    onDeviceClick={this.onDeviceClick}
                  />
                  <ViewProject
                    currentDevice={this.state.currentDevice}
                    currentMenuItem={this.state.currentMenuItem}
                    haveDevices={this.getDevicesCurrentMenuItem()}
                  />
                </>
              )
              : <Contacts />
          }
        </div>

        <div className={styles['current-project']}>
          {currentScreenName}
        </div>

        <div className={styles['burger-wrapper']}>
          <div className={styles.burger}
            onTouchEnd={this.onBurger}
            onClick={this.onBurger}
            ref={this.burgerRef}>
            <span></span>
            <span></span>
            <p className={styles.menu}>MENU</p>
            <p className={styles.close}>CLOSE</p>
          </div>
        </div>

      </div>
    )
  }
}
