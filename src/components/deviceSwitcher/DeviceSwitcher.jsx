import React from 'react';
import styles from './deviceSwitcher.module.css';

const DeviceSwitcher = ({ devicesCurrentMenuItem, currentDevice, onDeviceClick }) => {
  const handleClick = (devName) => {
    onDeviceClick && onDeviceClick(devName)
  }

  const viewDevice = devicesCurrentMenuItem ?
    <div className={styles['device-switcher']}>
      {
        devicesCurrentMenuItem.map(dev => {
          const devName = dev;
          return <i
            onClick={() => handleClick(devName)}
            className={
              `${(currentDevice === dev) ? styles['device-switcher__item_active'] : ''}
              ${styles['device-switcher__item']}
              ${styles[`device-switcher__item_${dev}`]}`
            }
            key={dev}
            data-device={dev} />
        })
      }
    </div> :
    null;

  return viewDevice;
}

export default DeviceSwitcher;
