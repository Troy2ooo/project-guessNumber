const express = require('express');
const userRoutes = require('./src/routes/user/user-routes');
const probeRoutes = require('./src/routes/probe/probe-routes');
const { deleteUser } = require('./src/services/user/user-service')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/probe', probeRoutes)
app.use('/users', userRoutes);


app.delete('/users/:id/:mail', deleteUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
