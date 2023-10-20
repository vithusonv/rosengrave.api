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
    static async createNewPredefEngraving(label, assetId, publicId, url, secureUrl) {
        const query = `INSERT INTO predefined_engravings(label, image_asset_id, image_public_id, image_url, image_secure_url) 
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

module.exports = PredefinedEngravingModel;