import React from 'react';
import SocialNet from '../socialNet/SocialNet';
import styles from './contacts.module.css';

export default function Contacts() {
  return (
    <div className={styles.contacts}>
      <SocialNet />
      <div className={styles.photo}></div>
    </div>
  )
}
