const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
