const db = require('../configs/db.config'); // Import the database pool from db.js

class CustomizationModel {
    // get all customizations
    static async getAllCustomizations() {
        const query = `SELECT * FROM customizations`;

        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    // insert customization category
    static async createNewCustomization(name) {
        const query = `INSERT INTO customizations(name) VALUES ($1) RETURNING *`;

        try {
            const result = await db.query(query, [name]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CustomizationModel;