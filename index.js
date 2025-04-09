const express = require('express');
const app = express();
const userRoutes = require('./src/routes/user-routes');
const { getTime } = require('./src/services/get-time-for-db');
const { getHello } = require('./src/services/get-hello');
const { postCreateUser } = require('./src/models/user-model');


app.get('/', getHello);

app.get('/db', getTime);

app.use('/', userRoutes);

app.post('/users', postCreateUser);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
