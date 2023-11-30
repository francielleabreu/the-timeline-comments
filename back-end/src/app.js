const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./config/mongoose.js');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./config/routes');
app.set('view engine', 'ejs');

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});