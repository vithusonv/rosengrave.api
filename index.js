const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');

// const { Pool } = require('pg');
// const config = require('./src/configs/db.config');

// // Configure the PostgreSQL connection
// const pool = new Pool(config.database);

// ROUTER
const productRouter = require('./src/routes/productRoutes');
const customizationCategoryRouter = require('./src/routes/customizationCategoryRoutes');
const predefinedEngravingRouter = require('./src/routes/predefinedEngravingRoutes');
const customizationRouter = require('./src/routes/customizationRoutes');

const app = express(); 
const PORT = process.env.PORT || 4000; 

// Enable All CORS Requests
app.use(cors());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use('/api/products', productRouter);
app.use('/api/customization-categories', customizationCategoryRouter);
app.use('/api/predefined-engravings', predefinedEngravingRouter)
app.use('/api/customizations', customizationRouter);

// Attach the database connection to the app object
// app.locals.db = pool;

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}.`); 
});