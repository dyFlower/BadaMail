import { connectDB } from '@/util/database';
import styles from './page.module.css';
import Image from 'next/image';
import main_img from '../public/img/main_img1.jpeg';
import Link from 'next/link';


export default async function Home() {
  const client = await connectDB;
  const db = client.db('forum');
  // 총 접속자 수 카운트
  await db.collection('userCount').updateOne({}, { $inc: { count: 1 } }, { upsert: true });

  return (
    <div className={styles.body}>
      <Link href={'/main'}>
        <Image src={main_img} alt='메인 화면' fill={true} />
      </Link>
    </div>
  );
}
