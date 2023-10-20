const db = require('../configs/db.config'); // Import the database pool from db.js

class CategoryModel {
    // get all categories
    static async getAllCategories() {
        const query = `SELECT * FROM categories ORDER BY category_name`;

        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    // create new category
    static async createNewCategory(category) {
        const { asset_id, public_id, url, secure_url } = category?.image || {};

        const query = `
          INSERT INTO categories(category_name, image_asset_id, image_public_id, image_url, image_secure_url) 
          VALUES ($1, $2, $3, $4, $5) 
          RETURNING *
        `;

        try {
            const result = await db.query(query, [category.name, asset_id, public_id, url, secure_url]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = CategoryModel;