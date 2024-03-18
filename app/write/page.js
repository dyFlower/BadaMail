import styles from './page.module.css';
import Image from 'next/image';
import logo from '../../public/img/logo.png';
export default function Write() {
  return (
    <div>
      <Image src={logo} alt='로고' width={125} />
      <form action='/api/mail/new' method='POST'>
        <div className={styles.info}>
          <input name='name' placeholder='수신인 이름' />
          <input name='birth' type='number' placeholder='수신인 생일 ( ex : 1218 )' />
          <input name='age' type='number' placeholder='수신인 나이 ( ex : 31 )' />
          <input name='phone' type='number' placeholder='폰 뒷 번호 ( ex : 0397 )' />
        </div>
        <div className={styles.sendBox}>
          <input className={styles.title} name='title' placeholder='제목' />
          <textarea className={styles.content} name='content' placeholder='편지를 써주세요.' />
          <input
            className={styles.question}
            name='question'
            placeholder='수신인 확인을 위한 질문입니다.'
          />
          <input
            className={styles.answer}
            name='answer'
            placeholder='수신인 확인을 위한 답변입니다.'
          />
          <button className={styles.button}>전송</button>
        </div>
      </form>
    </div>
  );
}
