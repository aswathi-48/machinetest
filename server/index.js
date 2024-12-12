import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connection from './config/db.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express();

const port = process.env.PORT || 7000;
app.use(cors())
app.use(express.json())
connection();

// app.use(
//     cookieSession({
//         name: "session",
//         keys: ["cyberwolve"],
//         maxAge: 24 * 60 * 60 * 100,
//     })
// );

app.use('/user',userRoutes)


app.listen(port, () => console.log(`server running on port ${port}`));


