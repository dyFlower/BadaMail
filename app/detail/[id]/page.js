import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Comment from './Comment';
import Image from 'next/image';
import logo from '../../../public/img/logo.png';
import styles from './page.module.css';

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db
    .collection('mail')
    .findOneAndUpdate({ _id: new ObjectId(props.params.id) }, { $inc: { view: 1 } });

  return (
    <div className={styles.wrap}>
      <Image src={logo} alt='로고' width={125} />
      <h3 className={styles.title}>{result.title}</h3>
      <p className={styles.content}>{result.content}</p>
      <Comment _id={result._id.toString()} />
    </div>
  );
}
