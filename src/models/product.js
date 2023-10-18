const db = require('../configs/db.config'); // Import the database pool from db.js
class ProductModel {
    // retrieve a product by ID
    static async getProductById(productId) {
        const query = {
            text: `SELECT 
                        p.*, 
                        COALESCE(
                            json_agg(pi.*) FILTER (WHERE pi.image_id IS NOT NULL),
                            '[]'
                        ) AS images
                    FROM 
                        products AS p 
                    LEFT JOIN 
                        product_images AS pi 
                    ON 
                        p.product_id = pi.product_id 
                    WHERE 
                        p.product_id = $1 
                    GROUP BY 
                        p.product_id`,
            values: [productId],
        };

        try {
            const result = await db.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    // retrieve all products
    static async getAllProducts() {
        const query = `SELECT 
                            p.*, 
                            COALESCE(
                                json_agg(pi.*) FILTER (WHERE pi.image_id IS NOT NULL),
                                '[]'
                            ) AS images
                        FROM 
                            products AS p 
                        LEFT JOIN 
                            product_images AS pi 
                        ON 
                            p.product_id = pi.product_id 
                        GROUP BY 
                            p.product_id`;

        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    // create new product
    static async createNewProduct(product) {
        const query = {
            text: `INSERT INTO products(product_name, description, price, unique_code) VALUES ($1, $2, $3, $4)`,
            values: [product.name, product.description, product.price, product.unique_code],
        };

        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductModel;