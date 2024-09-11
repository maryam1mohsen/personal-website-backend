const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');

dotenv.config();
require('./config/database');

// Middleware
const verifyToken = require('./middleware/verify-token');

// Controllers
const portfoliosRouter = require('./controllers/portfolios');
const blogsRouter = require('./controllers/blogs');
const contactMeRouter = require('./controllers/contactMe');
const commentsRouter = require('./controllers/comments');
const userRouter = require('./controllers/user'); 

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/portfolios', portfoliosRouter);
app.use('/blogs', blogsRouter);
app.use('/contact-me', contactMeRouter);
app.use('/comments', commentsRouter);
app.use('/users', userRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
