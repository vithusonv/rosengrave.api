const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// ROUTER
const productRouter = require("./src/routes/product.routes");
const customizationRouter = require("./src/routes/customization.routes");
const engravingRouter = require("./src/routes/engraving.routes");
const productCustomizationRouter = require("./src/routes/product-customization.routes");
const categoryRouter = require("./src/routes/category.routes");
const productCategoryRouter = require("./src/routes/product-category.routes");
const paymentRouter = require("./src/routes/payment.routes");

const app = express();
const PORT = process.env.PORT || 4000;

const dotenv = require("dotenv");
dotenv.config();

// Enable All CORS Requests
app.use(cors());
// app.options('*', cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/products", productRouter);
app.use("/api/customizations", customizationRouter);
app.use("/api/engravings", engravingRouter);
app.use("/api/product-customizations", productCustomizationRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/product-categories", productCategoryRouter);
app.use("/api/payment", paymentRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}.`);
});
