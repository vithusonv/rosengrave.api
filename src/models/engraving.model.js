const db = require('../configs/db.config'); // Import the database pool from db.js

class EngravingModel {
    // retrieve engraving
    static async getAllPredefEngravings() {
        const query = `SELECT * FROM engravings ORDER BY label`;

        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    // create engraving
    static async createNewPredefEngraving(label, assetId, publicId, url, secureUrl) {
        const query = `INSERT INTO engravings(label, image_asset_id, image_public_id, image_url, image_secure_url) 
                        VALUES ($1, $2, $3, $4, $5) 
                        RETURNING *`;

        try {
            const result = await db.query(query, [label, assetId, publicId, url, secureUrl]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EngravingModel;