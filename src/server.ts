import express from 'express';
import cors from 'cors';

import router from './router';
import { logRequest } from './middlewares';

const app = express();
const port = 8000;

app.use(logRequest);
app.use(cors());
app.use(express.static('src/public', { maxAge: 300000 }));
app.use(router);

app.listen(port, () => console.log(`Listening at port ${port}`));
