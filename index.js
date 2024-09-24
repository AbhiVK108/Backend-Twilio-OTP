const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const otpRoutes = require('./auth/routes');
const cors = require('cors');

dotenv.config(); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', otpRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
