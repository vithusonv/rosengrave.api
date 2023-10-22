const db = require('../configs/db.config'); // Import the database pool from db.js

class CustomizationModel {
    // retrieve customizations
    static async getProductCustomizations(productId) {
        const query = {
            text: `SELECT
                        c.category_id,
                        cc.name AS category_name,
                        ARRAY_AGG(c.name) AS customizations
                    FROM
                        product_customizations AS c
                    INNER JOIN
                        customizations AS cc
                    ON
                        c.category_id = cc.category_id
                    WHERE
                        c.product_id = $1
                    GROUP BY
                        c.category_id, cc.name`,

            values: [productId]
        }

        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    // retrieve customizations by id
    static async getProductCustomizationsByCategory(productId, categoryId) {
        const query = {
            text: `SELECT
                        name
                    FROM
                        product_customizations
                    WHERE
                        product_id = $1
                        AND category_id = $2`,
            values: [productId, categoryId]
        }

        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    // create customizations per product
    static async insertCustomizationOptForProduct(product) {
        const { asset_id, public_id, url, secure_url } = product?.image || {};

        const query = `INSERT INTO product_customizations(category_id, product_id, name, image_asset_id, image_public_id, image_url, image_secure_url)
                            VALUES($1, $2, $3, $4, $5, $6, $7) 
                            RETURNING *
                        `;

        try {
            const result = await db.query(query, [product.categoryId, product.productId, product.name, asset_id, public_id, url, secure_url]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CustomizationModel;