import express from 'express';
import cors from 'cors';

import router from './router';
import { logRequest } from './middlewares';
import path from 'path';

const app = express();
const port = 8000;

app.use(logRequest);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public/')));
app.use(router);

app.listen(port, () => console.log(`Listening at port ${port}`));

export default app;
