import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Comment from './Comment';

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db
    .collection('mail')
    .findOneAndUpdate({ _id: new ObjectId(props.params.id) }, { $inc: { view: 1 } });

  return (
    <div>
      <div>편지</div>
      <div>{result.title}</div>
      <div>{result.content}</div>
      <Comment _id={result._id.toString()} />
    </div>
  );
}
