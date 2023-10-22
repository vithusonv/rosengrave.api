const db = require('../configs/db.config'); // Import the database pool from db.js

class ProductCategoryModel {
    // retrieve category products
    static async getCategoryProducts() {
        const query = `SELECT
                        c.category_id,
                        c.category_name,
                        c.image_url,
                        c.image_secure_url,
                        jsonb_agg(
                            jsonb_build_object(
                                'product_id', p.product_id,
                                'product_name', p.product_name,
                                'product_description', p.description,
                                'product_price', p.price,
                                'product_images', COALESCE(
                                    (
                                    SELECT jsonb_agg(
                                        jsonb_build_object(
                                        'image_id', pi.image_id,
                                        'image_url', pi.image_url,
                                        'image_secure_url', pi.image_secure_url
                                        )
                                    )
                                    FROM product_images pi
                                    WHERE pi.product_id = p.product_id
                                    ),
                                    '[]'::jsonb
                                ),
                                'created_at', p.created_at,
                                'updated_at', p.updated_at
                            )
                        ) AS products
                        FROM categories c
                        INNER JOIN product_categories pc ON c.category_id = pc.category_id
                        INNER JOIN products p ON pc.product_id = p.product_id
                        GROUP BY c.category_id, c.category_name
                        ORDER BY c.category_id
                    `;

        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    // put product in a category
    static async insertProductInCategory(productId, categoryId) {
        const query = `INSERT INTO product_categories(category_id, product_id) VALUES($1, $2)`;

        try {
            const result = await db.query(query, [categoryId, productId]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductCategoryModel;