import "dotenv/config";
import express from "express";
import cors from "cors";
import auth from './router/auth.rtr.js'
import bankRouter from './router/bank.rtr.js'
import calcRouter from './router/calc.rtr.js'
import compRouter from './router/comp.rtr.js'
import complexRouter from './router/complex.rtr.js'
import roomRouter from './router/room.rtr.js'
import userRouter from './router/user.js'

const PORT = process.env.PORT || 4000;
const app = express();


app.use(express.json());
app.use(cors("/*"));
app.use(auth)
app.use(bankRouter)
app.use(calcRouter)
app.use(compRouter)
app.use(complexRouter)
app.use(roomRouter)
app.use(userRouter)



app.use("/*", (_, res) => res.sendStatus(404));

app.listen(PORT, console.log(PORT));
