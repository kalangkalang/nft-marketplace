import express, {Express} from 'express';
import morgan from 'morgan';
import connectDB from './config/db/mongoDb';
import ProductRouter from './routes/Product.route';

connectDB();

const app:Express = express();



app.use(morgan("combined"));


app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.json({message: "The server is running"});
})
app.use('/product', ProductRouter);

export default app;