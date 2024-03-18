'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import logo from '../../public/img/logo.png';

export default function Info() {
  const [formData, setFormData] = useState({ name: '', age: '', birth: '', phone: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBtn = () => {
    if (!formData.name || !formData.age || !formData.birth || !formData.phone) {
      return;
    }
    router.push(
      `inbox/?name=${formData.name}&age=${formData.age}&birth=${formData.birth}&phone=${formData.phone}`,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.wrap}>
      <Image src={logo} alt='로고' width={125} />
      <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name='name' onChange={handleChange} placeholder='수신인 이름' required />
          <input
            name='birth'
            onChange={handleChange}
            placeholder='수신인 생일 ( ex : 1218 )'
            required
          />
          <input
            name='age'
            onChange={handleChange}
            placeholder='수신인 나이 ( ex : 31 )'
            required
          />
          <input
            name='phone'
            onChange={handleChange}
            placeholder='폰 뒷 번호 ( ex : 0397 )'
            required
          />
          <button onClick={handleBtn}>수신 확인</button>
        </form>
      </div>
    </div>
  );
}
