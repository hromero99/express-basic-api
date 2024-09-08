import express from 'express';
import { groupsController } from './controllers/groupControllers';

const app = express();


app.use(express.json({strict: false}));

const PORT = Number(process.env.PORT) || 3000;


app.use("/api/v1/groups",groupsController)

app.listen(PORT, () => {
    console.log(`Server running`)
 });