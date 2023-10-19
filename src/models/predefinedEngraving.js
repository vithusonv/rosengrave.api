const db = require('../configs/db.config'); // Import the database pool from db.js
class PredefinedEngravingModel {
    // retrieve predefined engraving
    static async getAllPredefEngravings() {
        const query = `SELECT * FROM predefined_engravings ORDER BY label`;

        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    // create predefined engraving
    static async createNewPredefEngraving(engraving) {
        const query = `INSERT INTO predefined_engravings(label, image_url) VALUES ($1, $2) RETURNING *`;

        try {
            const result = await db.query(query, [engraving.label, engraving.image_url]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PredefinedEngravingModel;