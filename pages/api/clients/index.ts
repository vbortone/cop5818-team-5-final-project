import connectToDatabase from '../../../src/lib/mongodb'; 
import Client from '../../../models/Client';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const client = new Client(req.body);
      await client.save();
      res.status(201).json({ success: true, data: client });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
