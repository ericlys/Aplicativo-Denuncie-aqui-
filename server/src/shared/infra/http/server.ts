import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import cors from 'cors';
import { createServer } from 'http';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
const server = createServer(app);
app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use('/pdfs', express.static('tmp/pdf'));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

server.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
