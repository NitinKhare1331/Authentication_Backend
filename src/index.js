import express from 'express';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/dbConfig.js';
import userRouter from './routes/userRouter.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

app.get('/ping', (req, res) => {
    return res.status(StatusCodes.OK).json({ message: 'pong' });
    });

app.listen(PORT ,() => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})