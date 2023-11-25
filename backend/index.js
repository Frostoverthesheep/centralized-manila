import express from "express";
import cors from 'cors';

import login from './routes/login.js'
import register from './routes/register.js'
import profileHandler from './routes/profileHandler.js';
import rptaxHandler from './routes/rptaxHandler.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', login);
app.use('/register', register);
app.use('/profile', profileHandler);
app.use('/rptax', rptaxHandler);


app.get("/", (req, res)=>{
  res.json("hello, this is the backend")
});


app.listen(8800, () => {
  console.log("Connected to backend");
});