import express from 'express';

const app = express();
app.use(express.json({strict: false}));

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
   console.log(`Server running`)
});