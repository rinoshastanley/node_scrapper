import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import clientRoutes from "./src/routes/client.route.js"
import scraperRoutes from './src/routes/screpper.route.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api', clientRoutes);
app.use('/api', scraperRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});