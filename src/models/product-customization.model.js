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
}

module.exports = CustomizationModel;