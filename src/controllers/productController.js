const productService = require('../services/productService');
const uuid = require('uuid');

const getAllProducts = (req, res) => {
    productService.getAllProducts()
    .then((products) => {
        res.status(200).json(products);
    })
    .catch((err) => {
        // Handle errors and send an appropriate response
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
        throw err;
    })
};

const getOneProduct = (req, res) => {
    const id = req.params.productId;

    productService.getOneProduct(id)
    .then((product) => {
        if(product) {
            res.status(200).json(product);
        } else {
            // Send a not found response with a status code of 404
            res.status(404).json({ message: 'Product not found.' });
        }
    })
    .catch((err) => {
        // Handle errors and send an appropriate response
        console.log(err);
        res.status(500).json({ message: 'Internal server error.' }); 
        throw err;
    });
};

const createNewProduct = (req, res) => {
    if(!req.body.product_name) {
        throw Error('product name is required.');
    }

    if(!req.body.price) {
        throw Error('price is required.');
    }

    req.body.uuid = uuid.v4();
    res.status(200).json(req.body);
    // const createProduct = productService.createNewProduct();
    // res.status(200).send("Create a new product", req.body);
};

const updateOneProduct = (req, res) => {
    const updateProduct = productService.updateOneProduct();
    res.send("Update an existing product");
};

const deleteOneProduct = (req, res) => {
    const deleteProduct = productService.deleteOneProduct();
    res.send("Delete an existing product");
};

module.exports = {
    getAllProducts,
    getOneProduct,
    createNewProduct,
    updateOneProduct,
    deleteOneProduct,
};