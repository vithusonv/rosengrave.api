const db = require("../configs/db.config"); // Import the database pool from db.js

class ProductModel {
  // retrieve a product by ID
  static async getProductById(productId) {
    const query = {
      text: `SELECT 
                        p.product_id AS product_id,
                        p.product_name AS product_name,
                        p.description AS product_description,
                        p.detailed_description AS p.detailed_description,
                        p.price AS product_price,  
                        p.created_at AS created_at,
                        p.updated_at AS updated_at,
                        COALESCE(
                            json_agg(pi.*) FILTER (WHERE pi.image_id IS NOT NULL),
                            '[]'
                        ) AS product_images
                    FROM 
                        products AS p 
                    LEFT JOIN 
                        product_images AS pi 
                    ON 
                        p.product_id = pi.product_id 
                    WHERE 
                        p.product_id = $1 
                    GROUP BY 
                        p.product_id`,
      values: [productId],
    };

    try {
      const result = await db.query(query);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // retrieve all products
  static async getAllProducts() {
    const query = `SELECT 
                            p.product_id AS product_id,
                            p.product_name AS product_name,
                            p.description AS product_description,
                            p.detailed_description AS p.detailed_description,
                            p.price AS product_price, 
                            p.created_at AS created_at,
                            p.updated_at AS updated_at,
                            COALESCE(
                                json_agg(pi.*) FILTER (WHERE pi.image_id IS NOT NULL),
                                '[]'
                            ) AS product_images
                        FROM 
                            products AS p 
                        LEFT JOIN 
                            product_images AS pi 
                        ON 
                            p.product_id = pi.product_id 
                        GROUP BY 
                            p.product_id`;

    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // create new product
  static async createNewProduct(product, images) {
    try {
      // Start a transaction
      await db.query("BEGIN");

      // Insert the product into the products table
      const productInsertQuery = `INSERT INTO products(product_name, description, price, unique_code) VALUES ($1, $2, $3, $4) RETURNING product_id`;
      const productResult = await db.query(productInsertQuery, [
        product.name,
        product.description,
        product.price,
        product.unique_code,
      ]);
      const productId = productResult.rows[0].product_id;

      if (images.secure_url || images.url) {
        // If imageURL is provided, insert it into the product_prices table
        const imageInsertQuery = `INSERT INTO product_images(product_id, image_url, image_secure_url, image_asset_id, image_public_id)   
                                          VALUES ($1, $2, $3, $4, $5)`;
        await db.query(imageInsertQuery, [
          productId,
          images.url,
          images.secure_url,
          images.asset_id,
          images.public_id,
        ]);
      }

      // Commit the transaction
      await db.query("COMMIT");
      return productResult;
    } catch (error) {
      // Rollback the transaction in case of an error
      await db.query("ROLLBACK");
      throw error;
    }
  }
}

module.exports = ProductModel;
