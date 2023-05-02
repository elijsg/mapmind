import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import next from 'next';
import { connectDB } from './db';
import Subscriber, { ISubscriber } from './models/Subscriber';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.post('/api/save-user-data', async (req: Request, res: Response) => {
    const { name, email } = req.body;

    await connectDB();

    const subscriber = new Subscriber({ name, email });
    await subscriber.save();

    console.log('User data:', { name, email });

    res.status(200).json({ message: 'User data saved successfully' });
  });

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, (err?: unknown) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
