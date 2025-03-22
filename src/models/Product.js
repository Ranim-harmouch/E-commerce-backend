
import connection from "../config/db.js"; 

const Product = {
    // Create a new product
    create: (name, description, price, quantity, color, discount, category_id, image_url, callback) => {
        const query = `
            INSERT INTO Products (name, description, price, quantity, color, discount, category_id, image_url, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;
        connection.query(query, [name, description, price, quantity, color, discount, category_id, image_url], (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, { id: result.insertId, name, description, price, quantity, color, discount, category_id, image_url });
        });
    },

    // Get all products
    getAll: (callback) => {
        const query = `SELECT * FROM Products`;
        connection.query(query, (error, rows) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, rows);
        });
    },

    // Get a single product by ID
    getById: (id, callback) => {
        const query = `SELECT * FROM Products WHERE id = ?`;
        connection.query(query, [id], (error, rows) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, rows.length > 0 ? rows[0] : null);
        });
    },

    // Update a product by ID
    update: (id, name, description, price, quantity, color, discount, category_id, callback) => {
        const query = `
            UPDATE Products 
            SET name = ?, description = ?, price = ?, quantity = ?, color = ?, discount = ?, category_id = ?, updated_at = NOW()
            WHERE id = ?
        `;
        connection.query(query, [name, description, price, quantity, color, discount, category_id, id], (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.affectedRows > 0);
        });
    },

    // Delete a product by ID
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
