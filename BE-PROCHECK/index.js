const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const morgan = require("morgan");
const projectRoutes = require('./controllers/projectsController');
const taskRoutes = require('./controllers/tasksController');
const app = express();
dotenv.config();

//Mongo Cloud Server and Port
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 10 
 
};
// Middleware
app.use(cors({ origin: 'https://fe-procheck.vercel.app/' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Database connection
mongoose.connect(MONGO_URL,mongooseOptions)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


