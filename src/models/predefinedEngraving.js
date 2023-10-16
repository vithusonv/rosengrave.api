const config = require('../configs/db.config');
const { Pool } = require('pg');

// Configure the PostgreSQL connection
const db = new Pool(config.database);

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
}

module.exports = PredefinedEngravingModel;