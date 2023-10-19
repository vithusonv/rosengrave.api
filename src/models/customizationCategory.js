const db = require('../configs/db.config'); // Import the database pool from db.js
class CustomizationCategoryModel {
    // get all customization categories
    static async getAllCustomizationCategories() {
        const query = `SELECT * FROM customization_categories`;

        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    // insert customization category
    static async createNewCustomCategory(name) {
        const query = `INSERT INTO customization_categories(name) VALUES ($1) RETURNING *`;

        try {
            const result = await db.query(query, [name]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CustomizationCategoryModel;