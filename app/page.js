import { connectDB } from '@/util/database';
import styles from './page.module.css';

export default async function Home() {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('mail').find().toArray();

  // 총 접속자 수
  await db.collection('userCount').updateOne({}, { $inc: { count: 1 } }, { upsert: true });
  let userCount = await db.collection('userCount').find().toArray();

  // 확인한 편지 갯수
  let checkMailCount = await db.collection('mail').countDocuments({ view: { $gte: 1 } });

  return (
    <div className={styles.body}>
      <div>안녕하세요 바다우편입니다.</div>
      <div>보내진 편지 갯수 : {result.length}</div>
      <div>전달된 편지 갯수 : {checkMailCount}</div>
      <div>총 접속수{userCount[0].count}</div>
    </div>
  );
}
