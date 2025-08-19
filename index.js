const express = require('express');
const userRoutes = require('./src/routes/user/user-routes');
const probeRoutes = require('./src/routes/probe/probe-routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/probe', probeRoutes);
app.use('/users', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
