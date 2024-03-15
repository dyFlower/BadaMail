export default function Write() {
  return (
    <div>
      <div>편지쓰기 페이지</div>
      <form action='/api/mail/new' method='POST'>
        <input name='title' placeholder='제목' />
        <input name='content' placeholder='편지를 써주세요.' />
        <input name='name' placeholder='수신인 이름' />
        <input name='birth' placeholder='수신인 생일' />
        <input name='age' placeholder='수신인 나이' />
        <input name='phone' placeholder='수신인 뒷 번호' />
        <input name='question' placeholder='수신인 확인을 위한 질문입니다.' />
        <input name='answer' placeholder='수신인 확인을 위한 답변입니다.' />
        <button>버튼</button>
      </form>
    </div>
  );
}
