import express, {Express} from 'express';
import morgan from 'morgan';
import connectDB from './db/mongoDb';


connectDB();

const app:Express = express();



app.use(morgan("combined"))

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res, next) => {
    res.json({message: "The server is running"});
})

export default app;