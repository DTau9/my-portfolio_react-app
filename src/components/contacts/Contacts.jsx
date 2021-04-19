import React, { Suspense } from 'react';
import SocialNet from '../socialNet/SocialNet';
import Spinner from '../spinner/Spinner';
import styles from './contacts.module.css';


const Photo = React.lazy(() => import('./Photo'))

export default function Contacts() {
  return (
    <div className={styles.contacts}>
      <SocialNet />
      <Suspense fallback={<Spinner />}>
        <Photo />
      </Suspense>
    </div>
  )
}
