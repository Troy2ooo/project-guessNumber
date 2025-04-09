const express = require('express');
const userRoutes = require('./src/routes/user-routes');
const { getTime } = require('./src/services/get-time-for-db');
const { getHello } = require('./src/services/get-hello');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', getHello);

app.get('/db', getTime);

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
