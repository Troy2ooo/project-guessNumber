const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const { getTime } = require('./src/services/getTime_forDB');
const { getHello } = require('./src/services/getHello');


app.get('/', getHello);

app.get('/db', getTime);

app.use('/users', userRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
