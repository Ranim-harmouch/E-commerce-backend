

import connection from "../config/db.js"; 

const Product = {
    // Create a new product
    create: async (name, description, price, stock, category_id) => {
        const query = `
            INSERT INTO Products (name, description, price, stock, category_id, created_at) 
            VALUES (?, ?, ?, ?, ?, NOW())
        `;
        const [result] = await connection.execute(query, [name, description, price, stock, category_id]);
        return { id: result.insertId, name, description, price, stock, category_id };
    },

    // Get all products
    getAll: async () => {
        const query = `SELECT * FROM Products`;
        const [rows] = await connection.execute(query); //  Extract only rows
        if (!Array.isArray(rows)) {
            throw new Error("Database response is not an array");
        }
        return rows; // Return the actual product list
    },

    // Get a single product by ID
    getById: async (id) => {
        const query = `SELECT * FROM Products WHERE id = ?`;
        const [rows] = await connection.execute(query, [id]);
        return rows.length > 0 ? rows[0] : null; // Ensure correct return type
    },

    // Update a product by ID
    update: async (id, name, description, price, stock, category_id) => {
        const query = `
            UPDATE Products 
            SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, updated_at = NOW()
            WHERE id = ?
        `;
        const [result] = await connection.execute(query, [name, description, price, stock, category_id, id]);
        return result.affectedRows > 0;
    },

    // Delete a product by ID
    delete: async (id) => {
        const query = `DELETE FROM Products WHERE id = ?`;
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    }
};

export default Product;





