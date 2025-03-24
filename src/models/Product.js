
import connection from "../config/db.js"; 

const Product = {
    // Create a new product and store image in Images table
    create: (name, brandId, description, quantity, price, color, discount, isNew, category, callback) => {
        const query = `
            INSERT INTO Products (name, brandId, description, quantity, price, color, discount, isNew, category) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        connection.query(query, [name, brandId, description, quantity, price, color, discount, isNew, category], (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, { id: result.insertId, name, brandId, description, quantity, price, color, discount, isNew, category });
        });
    },

    // Insert Image URL into Images table
    saveImage: (productId, imageUrl, callback) => {
        const query = `INSERT INTO Images (product_id, url) VALUES (?, ?)`;
        connection.query(query, [productId, imageUrl], (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, { id: result.insertId, productId, url: imageUrl });
        });
    },

    // Get all products with their images
    getAll: (callback) => {
        const query = `
            SELECT 
                p.*, 
                JSON_ARRAYAGG(i.url) AS images 
            FROM Products p 
            LEFT JOIN Images i ON p.id = i.product_id 
            GROUP BY p.id
        `;
        connection.query(query, (error, rows) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, rows);
        });
    },

    // Get a single product by ID with images
    getById: (id, callback) => {
        const query = `
            SELECT 
                p.*, 
                JSON_ARRAYAGG(i.url) AS images 
            FROM Products p 
            LEFT JOIN Images i ON p.id = i.product_id 
            WHERE p.id = ?
            GROUP BY p.id
        `;
        connection.query(query, [id], (error, rows) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, rows.length > 0 ? rows[0] : null);
        });
    },

    // Update a product (excluding images)
    update: (id, name, brandId, description, quantity, price, color, discount, isNew, category, callback) => {
        const query = `
            UPDATE Products 
            SET name = ?, brandId = ?, description = ?, quantity = ?, price = ?, color = ?, discount = ?, isNew = ?, category = ?, updated_at = NOW()
            WHERE id = ?
        `;
        connection.query(query, [name, brandId, description, quantity, price, color, discount, isNew, category, id], (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.affectedRows > 0);
        });
    },

    // Delete a product (Images will be deleted automatically due to ON DELETE CASCADE)
    delete: (id, callback) => {
        const query = `DELETE FROM Products WHERE id = ?`;
        connection.query(query, [id], (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.affectedRows > 0);
        });
    }
};

export default Product;




