const express = require('express');
const productRoutes = require('./Router/productRoutes');
const { obtainAuthToken } = require('./services/apiService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //middleware to understand json
app.use('/api', productRoutes);

const startServer = async () => {
  await obtainAuthToken();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
