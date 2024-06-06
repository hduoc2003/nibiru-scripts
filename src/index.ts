import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import router from './routes/createAccount';
import transferTokenRouter from "./routes/transferToken";
import sendNftRouter from "./routes/sendNft";
import params from "./routes/params";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(cookieParser());

app.get('/', (_req, res) => res.status(200).send('OK'))
app.use('/', router);
app.use('/', transferTokenRouter);
app.use('/', sendNftRouter);
app.use('/', params);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Your server is running successfully on port ${PORT}`))
