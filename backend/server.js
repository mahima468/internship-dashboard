require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

connectDB();

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8081'],
    credentials: true,
  })
);
app.use(express.json());
 
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
