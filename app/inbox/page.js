import Image from 'next/image';
import logo from '../../public/img/logo.png';
import InboxContent from './InboxContent';
import styles from './page.module.css';
import { Suspense } from 'react';

export default function Inbox() {
  return (
    <Suspense>
      <div className={styles.list}>
        <Image src={logo} alt='로고' width={125} />
        <InboxContent />
      </div>
    </Suspense>
  );
}
