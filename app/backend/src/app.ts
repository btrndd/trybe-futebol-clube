import * as express from 'express';
import cors = require('cors');
import LoginRouter from './routers/LoginRouter';
import errorMiddleware from './middlewares/errorMiddleware';
import ClubRouter from './routers/ClubRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/login', LoginRouter);
    this.app.use('/clubs', ClubRouter);
    this.app.use(errorMiddleware.manage);
    this.app.use(errorMiddleware.server);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on Port:${PORT}`));
  }
}

export { App };

export const { app } = new App();
