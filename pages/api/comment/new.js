import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    req.body = JSON.parse(req.body);
    let newComment = {
      content: req.body.comment,
      parent: new ObjectId(req.body._id),
    };
    let db = (await connectDB).db('forum');
    let result = await db.collection('comment').insertOne(newComment);
    res.status(200).json('완료');
  }
}
