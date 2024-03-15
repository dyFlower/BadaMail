import Link from 'next/link';
import styles from './navigation.module.css';

export default function Navigation() {
  return (
    <div className={styles.navbar}>
      <Link href={'/write'}>
        <div>편지 이미지</div>
      </Link>
      <Link href={'/'}>
        <div>홈이미지</div>
      </Link>
      <Link href={'/info'}>
        <div>수신함 이미지</div>
      </Link>
    </div>
  );
}
