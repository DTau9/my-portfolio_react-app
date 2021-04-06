import React from 'react';
import './deviceSwitcher.css';

const DeviceSwitcher = ({ devicesCurrentMenuItem, activeDevice, onDeviceClick }) => {
  const handleClick = (devName) => {
    onDeviceClick && onDeviceClick(devName)
  }
  const viewDevice = devicesCurrentMenuItem ?
    <div className="device-switcher">
      {
        devicesCurrentMenuItem.map(dev => {
          const devName = dev;
          return <i
            onClick={() => handleClick(devName)}
            className={`
        ${activeDevice === dev ? 'device-switcher__item_active' : ''} device-switcher__item device-switcher__item_${dev}`}
            key={dev}
            data-device={dev} />
        })
      }
    </div> :
    null;

  return viewDevice;
}

export default DeviceSwitcher;
