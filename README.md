# 바다 우편 ✉️

<img src="https://github.com/dyFlower/amgiking/assets/112444362/88e08ad7-0e6d-4d6d-8c59-742b81e62035" width="250">

서비스 링크 : https://bada-mail.vercel.app/

## 목차

1. [프로젝트 소개](#프로젝트소개)
2. [스택](#스택)
3. [주요 기능](#주요기능)
4. [에러 핸들링](#에러핸들링)
5. [개선 사항](#개선사항)

## <a id="프로젝트소개">프로젝트 소개</a>

📝 마음 속에 있는 말을 전하고 싶을 때<br>
📝 혹시나 그 사람이 확인했으면 싶을 때<br>
📝 특정인의 간단한 정보를 입력하고 편지를 써보세요.

## <a id="스택">사용 기술</a>

Next.js, MongoDB

## <a id="주요기능">주요 기능</a>

### 발신, 수신 편지 갯수 및 총 접속자 수

<img src="https://github.com/dyFlower/amgiking/assets/112444362/071b0ff5-b0eb-4f81-86ec-12c1c54b85eb" width="250"><br>
#### 메인 화면 입니다.
- 보내진 총 편지의 갯수와, 전달된 편지의 갯수, 총 접속자 수를 화면에 나타내어 줍니다.
##### 접속자 수 카운트 코드

```js
  const client = await connectDB;
  const db = client.db('forum');
  // 총 접속자 수 카운트
  await db.collection('userCount').updateOne({}, { $inc: { count: 1 } }, { upsert: true });
```
DB에 userCount라는 콜렉션을 생성한 후에 '/'페이지에 접속할 때 마다 1씩 값을 더해주어, 총 접속자수를 표현하고 싶었습니다.<br>

##### 편지의 갯수 코드
```js
  const client = await connectDB;
  const db = client.db('forum');

  // 총 편지 갯수
  let result = await db.collection('mail').find().toArray();

  // 확인한 편지 갯수
  let checkMailCount = await db.collection('mail').countDocuments({ view: { $gte: 1 } });
```
DB의 mail 콜렉션 갯수를 세어 메인화면에 나타내어주고, 게시물마다 달려 있는 view의 값이 1 이상이면 게시물을 조회한 것으로 보고, 전달된 편지의 갯수를 사용자에게 나타내어줍니다.

- 간단한 사용 설명서입니다.


### 편지 발신

<img src="https://github.com/dyFlower/amgiking/assets/112444362/974aff3b-b3eb-45f4-9eb4-f4592c078145" width="250">

- 수신인의 간단한 정보(이름, 생일, 나이, 핸드폰 뒷번호)와 간단한 문답을 입력하고 편지를 작성할 수 있습니다.

##### 작성 페이지의 서버 코드
```js
export default async function handler(req, res) {
  if (req.method == 'POST') {
    const client = await connectDB;
    const db = client.db('forum');
    let result = await db.collection('mail').insertOne(req.body);
    return res.status(200).redirect('/main');
  }
}
```
DB에 직접적으로 게시글을 저장하지 않고, 서버 기능을 통해 전달하도록 하였습니다.

### 편지 수신

<img src="https://github.com/dyFlower/amgiking/assets/112444362/80ec6e59-d991-4548-8b19-083f35399519" width="250">

- 사용자의 간단한 정보(이름, 생일, 나이, 핸드폰 뒷번호)를 입력한 후 이 중에서 3가지 이상이 부합하는 게시글을 나타나도록 하고, 검증 후에 게시글 확인 시 편지와 댓글이 나타나도록 합니다.
- 게시글의 표시, 댓글의 표시 및 작성을 서버 기능을 통해 작동하도록 하였습니다.

##### 게시물 불러오기 코드

```js
export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db
    .collection('mail')
    .find({
      $or: [
        { $and: [{ name: req.query.name }, { birth: req.query.birth }, { age: req.query.age }] },
        {
          $and: [{ name: req.query.name }, { birth: req.query.birth }, { phone: req.query.phone }],
        },
        { $and: [{ name: req.query.name }, { age: req.query.age }, { phone: req.query.phone }] },
        { $and: [{ birth: req.query.birth }, { age: req.query.age }, { phone: req.query.phone }] },
      ],
    })
    .toArray();
  return res.status(200).json(result);
}
```
사용자의 특징 4개 중 3개가 부합하는 자료를 불러오기 위하여 MongoDB 명령어를 활용하였습니다.

## <a id="에러핸들링">에러 핸들링</a>
### router 사용에서의 문제
편지를 수신하는 사용자가 개인 정보를 적고(/info), 게시글 페이지(/inbox)로 이동할 때 이 정보를 전달 받은 후 DB에 요청하여 게시글을 가져오기 위하여, useRouter의 router.push()를 이용하려고 했었다.<br>
그러나 넥스트가 버전 업그레이드 되며 기존 next/router에서 next/navigation으로 업그레이드 됨에 따라 router.push()에 값을 전달하는 기능이 빠져버린 것이다.<br>
그래서 next/navigation의 useSearchParams() query를 통해서 그 정보를 전달해주기로 했다. 
사용자의 민감한 정보가 있다면 이런 방법을 지양했을 것이다. 그럴 경우에는 서버 기능을 수정해본다거나 url을 감추거나하는 방법이 있을 것으로 생각된다.

### 배포시 Suspense 및 렌더링 관련 문제
기분 좋게 Depoly 버튼을 누르고 대기하던 중, 오류가 발생했다.
>useSearchParams() should be wrapped in a suspense boundary at page "/inbox".<br>   

개발 환경에서는 발생하지 않던 오류가, 배포 시에 발생한 것이다.
이 때의 inbox 페이지는 클라이언트 사이드 렌더링으로 만들어졌는데 왜 이런 오류가 나타나는 것일까? 라는 고민을 하고 구글링을 통해 해결법을 찾아 나섰는데...
Next 공식 문서에서 상위 컴포넌트를 Suspense로 감싸주면 해결된다는 것을 보았다.
기존의 페이지를 InboxContent 컴포넌트로 작성 한 후에, 상위 컴포넌트인 inbox/page에서 Suspense로 감싸주어 해결했다.

### 배포시 DB업데이트가 반영되지 않음
이 부분 또한 개발 환경에서는 발생하지 않았는데, 배포 후 발생한 오류이다.
main페이지에서 편지의 갯수, 총 접속수를 나타내어 주는데 배포 후에 이 부분이 제대로 업데이트되지 않는 것을 발견하였다.
이 오류 같은 경우에는 main페이지 상단에 
```js
export const dynamic = 'force-dynamic';
```
를 추가해 줌으로써 해결할 수 있었다.
위의 코드가 없을 경우 api가 정적으로 빌드되어서 제대로 가져와지지 않은 것 같다.

## <a id="개선사항">개선 사항</a>

#### 내가 필요없는 글은 안보이게 할 수 없을까?
#### 댓글 작성 후 새로 불러올시 전체가 다시 불러와지는 것을 수정할 수 있을까?
#### DB데이터 반영 속도를 높이고 싶다.

## Next.js로 진행 후 느낀 점
기존에 사용하던 리액트는 Client-Side-Rendering으로 진행되는데, Next.js로 프로젝트를 진행하면 Server-Side-Rendering이 가능하다는 것을 들었다.<br>

SSR같은 경우 CSR보다 SEO(검색 엔진 최적화)노출이 잘 되고, 초기 로딩 속도를 단축시킬 수 있으며, Next에서 제공하는 라우팅이나 코드 스플리팅 등을 통해서 성능 및 개발 생산성이 나아질 수 있다고 하여 간단하게 프로젝트를 진행해보았다.<br>

Next를 사용해보니 파일과 폴더를 통해서 라우팅이 가능하여 페이지 별로 개발하는 것에 편리함을 느꼈고, 리액트를 통해 프로젝트를 진행할 때보다 폴더 트리를 고민하는 시간이 적었었다. 그러나 프로젝트의 규모가 커지면 수많은 예약 파일들로 인해서 좀 복잡해질 수 있을 것이라는 생각도 했다.<br>

예전에 날씨 관련 프로젝트를 리액트로 진행했을 때, 날씨api의 정보가 개발자 도구 네트워크 탭에 노출되는 것을 목격한 적이 있다. 이 부분을 Next로 개발한다면 개선할 수 있을 것이라는 생각 또한 들었다.<br>

그리고 계속해서 Next가 업데이트 되고 있는데, 구 버전의 문법과 신 버전간의 문법 차이로 개발하는 데에 있어서 약간의 혼란을 겪기도 하였다. 개발자로서 자신이 사용하는 기술에 대한 꾸준한 학습은 필수불가결이라고 다시 한번 느끼게 되었다.<br>

또 Next가 풀스택 프레임워크로써, 이번 프로젝트에서 간단한 서버 기능을 개발해보았는데 이 부분도 흥미롭고 재밌었다. 
평소에도 프론트 개발과, 백 개발의 경계를 허물고 싶다는 생각이 있었는데 앞으로 서버와 BE부분도 공부를 하여 BE개발자분들과의 소통에 더 능숙해지고, 성장해서 FE와 BE 두 부분의 개발 모두 담당하고 싶다는 생각을 하게 되었다.