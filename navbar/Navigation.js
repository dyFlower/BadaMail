import Link from 'next/link';
import styles from './navigation.module.css';

export default function Navigation() {
  return (
    <div className={styles.navbar}>
      <Link href={'/write'} style={{ textDecoration: 'none' }}>
        <p>편지 쓰기</p>
      </Link>
      <Link href={'/main'} style={{ textDecoration: 'none' }}>
        <p>Home</p>
      </Link>
      <Link href={'/info'} style={{ textDecoration: 'none' }}>
        <p>수신 확인</p>
      </Link>
    </div>
  );
}
