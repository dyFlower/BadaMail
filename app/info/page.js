'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input name='name' onChange={handleChange} placeholder='수신인 이름' required />
          <input name='birth' onChange={handleChange} placeholder='수신인 생일' required />
          <input name='age' onChange={handleChange} placeholder='수신인 나이' required />
          <input name='phone' onChange={handleChange} placeholder='수신인 뒷 번호' required />
          <button onClick={handleBtn}>Inbox로 이동버튼</button>
        </form>
      </div>
    </div>
  );
}
