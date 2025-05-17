import express, {
  NextFunction,
  Request,
  Response,
  urlencoded,
  json,
} from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import { CustomError } from './utils/errors/custom-error';
import { createServer } from 'http';
import { logger } from './utils/logger/logger';

const app = express();
const server = createServer(app);

//Express config
app.use(compression());
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(json());

// // Expose Express API routes
// app.use('/api');

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found') as Error & { status: number };
  err.status = 404;
  next(err);
});

// error handler
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in DEV
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'DEV' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

app.get('/', (_, res: Response) => {
  return res.json({
    status: 200,
    success: true,
    message: 'ok',
  });
});

server.listen({ port: 3000 }, () => {
  logger.info('🚀 Order server ready on 3000');
});
