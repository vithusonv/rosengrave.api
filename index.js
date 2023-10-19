const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// ROUTER
const productRouter = require('./src/routes/productRoutes');
const customizationCategoryRouter = require('./src/routes/customizationCategoryRoutes');
const predefinedEngravingRouter = require('./src/routes/predefinedEngravingRoutes');
const customizationRouter = require('./src/routes/customizationRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Enable All CORS Requests
app.use(cors());
app.options('*', cors());

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

// app.post("/api/upload", upload.single("my_file"), async (req, res) => {
//     try {
//         const b64 = Buffer.from(req.file?.buffer).toString("base64");
//         let dataURI = "data:" + req.file?.mimetype + ";base64," + b64;
//         const cldRes = await handleUpload(dataURI);
//         res.json(cldRes);
//     } catch (error) {
//         console.log(error);
//         res.send({
//             message: error.message,
//         });
//     }
// });

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}.`);
});