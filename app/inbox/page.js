'use client';

import styles from './page.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../../public/img/logo.png';

export default function Inbox() {
  const [list, setList] = useState([]);
  const [answer, setAnswer] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const getName = searchParams.get('name');
  const getAge = searchParams.get('age');
  const getBirth = searchParams.get('birth');
  const getPhone = searchParams.get('phone');

  const fetchMail = () => {
    fetch(`api/mail/list?name=${getName}&age=${getAge}&birth=${getBirth}&phone=${getPhone}`)
      .then((res) => res.json())
      .then((result) => setList(result));
  };

  const handleBtn = (mail) => {
    if (mail.answer === answer) {
      router.push('detail/' + mail._id);
    } else {
      alert('Wrong Answer!');
    }
  };
  useEffect(() => {
    fetchMail();
  }, []);

  return (
    <Suspense className={styles.list}>
      <Image src={logo} alt='로고' width={125} />
      <div>
        {list.length === 0 ? (
          <div>받은 편지가 없습니다.</div>
        ) : (
          list.map((mail, i) => {
            return (
              <div key={mail.id} className={styles.listitem}>
                <h4>{mail.title}</h4>
                <p>{mail.content}</p>
                <div>{mail.question}</div>
                <input
                  name='answer'
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    handleBtn(mail);
                  }}
                >
                  확인하기
                </button>
              </div>
            );
          })
        )}
      </div>
    </Suspense>
  );
}
