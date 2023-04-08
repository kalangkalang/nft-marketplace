import express, {Express} from 'express';
import morgan from 'morgan';


const app:Express = express();

app.use(morgan("combined"))

app.set('port', process.env.PORT || 3000);

export default app;