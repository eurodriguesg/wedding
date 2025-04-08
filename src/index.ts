import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
