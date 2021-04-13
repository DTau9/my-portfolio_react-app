import React from 'react';
import styles from './socialNet.module.css';

const socialnetsData = [
  {
    name: 'github',
    url: 'https://github.com/DTau9'
  },
  {
    name: 'mail',
    url: 'mailto:di.tau9@gmail.com'
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/дмитрий-тау-97a0311b9/'
  },
  {
    name: 'telegram',
    url: 'https://tlgg.ru/DmitrjTau'
  }
]

export default function SocialNet() {
  return (
    <div className={styles.socialnets} >
      {
        socialnetsData.map(item => {
          return <a className={`${styles.net} ${styles[item.name]}`} href={item.url} key={item.name} target="_blank" ></a>
        })
      }
    </div >
  )
}
