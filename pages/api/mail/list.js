import { connectDB } from '@/util/database';

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
