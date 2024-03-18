import { connectDB } from '@/util/database';
import styles from './page.module.css';
import Image from 'next/image';
import logo from '../../public/img/logo.png';
export default async function Home() {
  const client = await connectDB;
  const db = client.db('forum');

  // 총 편지 갯수
  let result = await db.collection('mail').find().toArray();

  // 총 접속자 수
  let userCount = await db.collection('userCount').find().toArray();

  // 확인한 편지 갯수
  let checkMailCount = await db.collection('mail').countDocuments({ view: { $gte: 1 } });

  return (
    <div className={styles.body}>
      <Image src={logo} alt='로고' width={125} />
      <div className={styles.card}>
        <div>지금까지...</div>
        <div>보내진 편지 : {result.length}</div>
        <div>전달된 편지 : {checkMailCount}</div>
        <div>총 접속 : {userCount[0].count}</div>
      </div>
      <div className={styles.manual}>
        <h4>작성법</h4>
        <p>1. 상대방의 이름, 나이, 생일, 전화번호 뒷자리를 입력해주세요.</p>
        <p>2. 편지를 작성해주세요. </p>
        <p>3. 상대방과 나만 아는 질문을 통해 원하는 상대만 읽을 수 있도록 하세요.</p>
        <h4>읽는 법</h4>
        <p>1. 본인의 이름, 나이, 생일, 전화번호 뒷자리를 입력해주세요.</p>
        <p>2. 4가지 항목중 3가지 이상이 일치하는 편지를 보여드립니다</p>
        <p>3. 상대방에 질문에 답해서 편지를 확인해보세요.</p>
      </div>
    </div>
  );
}
