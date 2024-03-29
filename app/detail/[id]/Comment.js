'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Comment({ _id }) {
  const [comment, setComment] = useState('');
  const [list, setList] = useState([]);

  const handleBtn = () => {
    if (!comment.trim()) return;

    fetch('/api/comment/new', {
      method: 'POST',
      body: JSON.stringify({ comment: comment, _id: _id }),
    }).then(fetchComment);
  };

  const fetchComment = () => {
    fetch('/api/comment/list?id=' + _id)
      .then((res) => res.json())
      .then((result) => setList(result));
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div>
      <div>
        {list.length > 0
          ? list.map((v, i) => (
              <p className={styles.listitem} key={i}>
                {v.content}
              </p>
            ))
          : '댓글이 존재하지 않습니다.'}
      </div>
      <form className={styles.inputWrap}>
        <textarea
          className={styles.input}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder='댓글을 남겨주세요.'
          required
        />
        <button
          className={styles.button}
          onClick={() => {
            handleBtn();
          }}
        >
          댓글
        </button>
      </form>
    </div>
  );
}
