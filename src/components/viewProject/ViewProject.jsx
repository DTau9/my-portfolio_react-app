import React from 'react';
import styles from './viewProject.module.css';
import dataProjects from '../../data/dataProjects';

const ViewProject = ({ currentMenuItem, currentDevice, haveDevices }) => {

  const linkToProject = dataProjects.find(item => item.name === currentMenuItem).url;

  const projectWithDevices = (
    <div className={`${styles['site-on-device']} ${styles[`site-on-device_${currentDevice}`]}  `}>
      <div className={styles['iframe-wrapper']}>
        <iframe src={linkToProject} className={styles['iframe']} frameBorder="0"></iframe>
      </div>
    </div>
  )

  const projectWithoutDevices = (
    <iframe src={linkToProject} className={styles['iframe']} frameBorder="0"></iframe>
  )

  return (
    haveDevices ? projectWithDevices : projectWithoutDevices
  )
}

export default ViewProject;
