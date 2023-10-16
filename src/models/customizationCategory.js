const config = require('../configs/db.config');
const { Pool } = require('pg');

// Configure the PostgreSQL connection
const db = new Pool(config.database);

class CustomizationCategoryModel {
    static async getAllCustomizationCategories() {
        const query = `SELECT * FROM customization_categories`;

        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CustomizationCategoryModel;