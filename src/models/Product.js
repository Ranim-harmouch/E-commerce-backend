// const connection = require('../config/db');

// class Product {
//     static async getAll() {
//         const [rows] = await connection.query('SELECT * FROM Products');
//         return rows;
//     }
    
//     static async getById(id) {
//         const [rows] = await connection.query('SELECT * FROM Products WHERE id = ?', [id]);
//         return rows[0];
//     }
    
//     static async create({ name, brandId, description, quantity, price, color, discount, isNew, category }) {
//         const [result] = await connection.query(
//             'INSERT INTO Products (name, brandId, description, quantity, price, color, discount, isNew, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//             [name, brandId, description, quantity, price, color, discount, isNew, category]
//         );
//         return result.insertId;
//     }
    
//     static async update(id, { name, brandId, description, quantity, price, color, discount, isNew, category }) {
//         await connection.query(
//             'UPDATE Products SET name=?, brandId=?, description=?, quantity=?, price=?, color=?, discount=?, isNew=?, category=? WHERE id=?',
//             [name, brandId, description, quantity, price, color, discount, isNew, category, id]
//         );
//         return true;
//     }
    
//     static async delete(id) {
//         await connection.query('DELETE FROM Products WHERE id = ?', [id]);
//         return true;
//     }
// }

// module.exports = Product;





// import connection from '../config/db.js'; // Ensure correct path to database connection

// const Product = {
//     //  Create a new product
//     create: async (name, description, price, stock, category_id) => {
//         const query = `
//             INSERT INTO Products (name, description, price, stock, category_id, created_at) 
//             VALUES (?, ?, ?, ?, ?, NOW())
//         `;
//         const [result] = await connection.execute(query, [name, description, price, stock, category_id]);
//         return { id: result.insertId, name, description, price, stock, category_id };
//     },

//     //  Get all products
//     getAll: async () => {
//         const query = `SELECT * FROM Products`;
//         const [rows] = await connection.execute(query);
//         return rows;
//     },

//     //  Get a single product by ID
//     getById: async (id) => {
//         const query = `SELECT * FROM Products WHERE id = ?`;
//         const [rows] = await connection.execute(query, [id]);
//         return rows[0] || null;
//     },

//     //  Update a product by ID
//     update: async (id, name, description, price, stock, category_id) => {
//         const query = `
//             UPDATE Products 
//             SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, updated_at = NOW()
//             WHERE id = ?
//         `;
//         const [result] = await connection.execute(query, [name, description, price, stock, category_id, id]);
//         return result.affectedRows > 0;
//     },

//     //  Delete a product by ID
//     delete: async (id) => {
//         const query = `DELETE FROM Products WHERE id = ?`;
//         const [result] = await connection.execute(query, [id]);
//         return result.affectedRows > 0;
//     }
// };

// export default Product;





// import connection from '../config/db.js'; // Ensure correct path to database connection

// const Product = {
//     // Create a new product
//     create: async (name, description, price, stock, category_id) => {
//         const query = `
//             INSERT INTO Products (name, description, price, stock, category_id, created_at) 
//             VALUES (?, ?, ?, ?, ?, NOW())
//         `;
//         const [result] = await connection.execute(query, [name, description, price, stock, category_id]);
//         return { id: result.insertId, name, description, price, stock, category_id };
//     },

//     // Get all products
//     getAll: async () => {
//         const query = `SELECT * FROM Products`;
//         const [rows] = await connection.execute(query);
//         console.log("Fetched products:", rows); // Debugging
//         return Array.isArray(rows) ? rows : []; // Ensure rows is an array
//     },

//     // Get a single product by ID
//     getById: async (id) => {
//         const query = `SELECT * FROM Products WHERE id = ?`;
//         const [rows] = await connection.execute(query, [id]);
//         return rows.length > 0 ? rows[0] : null; // Ensure correct data structure
//     },

//     // Update a product by ID
//     update: async (id, name, description, price, stock, category_id) => {
//         const query = `
//             UPDATE Products 
//             SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, updated_at = NOW()
//             WHERE id = ?
//         `;
//         const [result] = await connection.execute(query, [name, description, price, stock, category_id, id]);
//         return result.affectedRows > 0;
//     },

//     // Delete a product by ID
//     delete: async (id) => {
//         const query = `DELETE FROM Products WHERE id = ?`;
//         const [result] = await connection.execute(query, [id]);
//         return result.affectedRows > 0;
//     }
// };

// export default Product;






// import connection from '../config/db.js'; // Ensure correct path to database connection

// const Product = {
//     // Create a new product
//     create: async (name, description, price, stock, category_id) => {
//         const query = `
//             INSERT INTO Products (name, description, price, stock, category_id, created_at) 
//             VALUES (?, ?, ?, ?, ?, NOW())
//         `;
//         const [result] = await connection.execute(query, [name, description, price, stock, category_id]);
//         return { id: result.insertId, name, description, price, stock, category_id };
//     },

//     // Get all products
//     // getAll: async () => {
//     //     const query = `SELECT * FROM Products`;
//     //     const [rows] = await connection.execute(query);
//     //     console.log("Fetched products:", rows); // Debugging
//     //     return Array.isArray(rows) ? rows : []; // Ensure rows is an array
//     // },
//     getAll: async () => {
//         const query = `SELECT * FROM Products`;
//         const result = await connection.execute(query); // Capture full response

//         console.log("Raw DB Response:", result); // Debugging step

//         if (!Array.isArray(result) || result.length < 1) {
//             throw new Error("Unexpected database response format");
//         }

//         const [rows] = result; // Extract actual data
//         console.log("Extracted Rows:", rows); // Debugging step
//         return Array.isArray(rows) ? rows : []; // Ensure it's an array
//     }

//     // Get a single product by ID
//     getById: async (id) => {
//         const query = `SELECT * FROM Products WHERE id = ?`;
//         const [rows] = await connection.execute(query, [id]);
//         return rows.length > 0 ? rows[0] : null; // Ensure correct data structure
//     },

//     // Update a product by ID
//     update: async (id, name, description, price, stock, category_id) => {
//         const query = `
//             UPDATE Products 
//             SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, updated_at = NOW()
//             WHERE id = ?
//         `;
//         const [result] = await connection.execute(query, [name, description, price, stock, category_id, id]);
//         return result.affectedRows > 0;
//     },

//     // Delete a product by ID
//     delete: async (id) => {
//         const query = `DELETE FROM Products WHERE id = ?`;
//         const [result] = await connection.execute(query, [id]);
//         return result.affectedRows > 0;
//     }
// };

// export default Product;




// import connection from '../config/db.js'; // Ensure correct path to database connection

// const Product = {
//     // Create a new product
//     create: async (name, description, price, stock, category_id) => {
//         const query = `
//             INSERT INTO Products (name, description, price, stock, category_id, created_at) 
//             VALUES (?, ?, ?, ?, ?, NOW())
//         `;
//         const [result] = await connection.execute(query, [name, description, price, stock, category_id]);
//         return { id: result.insertId, name, description, price, stock, category_id };
//     },

//     // Get all products
//     getAll: async () => {
//         const query = `SELECT * FROM Products`;
//         const result = await connection.execute(query); // Capture full response

//         console.log("Raw DB Response:", result); // Debugging step

//         // Ensure result is an array and has at least one item (the rows)
//         if (!Array.isArray(result) || result.length < 1) {
//             throw new Error("Unexpected database response format");
//         }

//         const [rows] = result; // Extract actual data
//         console.log("Extracted Rows:", rows); // Debugging step

//         return Array.isArray(rows) ? rows : []; // Ensure it's an array
//     },

//     // Get a single product by ID
//     getById: async (id) => {
//         const query = `SELECT * FROM Products WHERE id = ?`;
//         const [rows] = await connection.execute(query, [id]);
//         return rows.length > 0 ? rows[0] : null; // Ensure correct data structure
//     },

//     // Update a product by ID
//     update: async (id, name, description, price, stock, category_id) => {
//         const query = `
//             UPDATE Products 
//             SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, updated_at = NOW()
//             WHERE id = ?
//         `;
//         const [result] = await connection.execute(query, [name, description, price, stock, category_id, id]);
//         return result.affectedRows > 0;
//     },

//     // Delete a product by ID
//     delete: async (id) => {
//         const query = `DELETE FROM Products WHERE id = ?`;
//         const [result] = await connection.execute(query, [id]);
//         return result.affectedRows > 0;
//     }
// };

// export default Product;







// import connection from "../config/db.js"; // Ensure correct database connection

// const Product = {
//     // Create a new product
//     create: async (name, description, price, stock, category_id) => {
//         const query = `
//             INSERT INTO Products (name, description, price, stock, category_id, created_at) 
//             VALUES (?, ?, ?, ?, ?, NOW())
//         `;
//         const [result] = await connection.execute(query, [name, description, price, stock, category_id]);
//         return { id: result.insertId, name, description, price, stock, category_id };
//     },

//     // Get all products
//     getAll: async () => {
//         const query = `SELECT * FROM Products`;
//         const [rows] = await connection.execute(query);
//         return rows;
//     },

//     // Get a single product by ID
//     getById: async (id) => {
//         const query = `SELECT * FROM Products WHERE id = ?`;
//         const [rows] = await connection.execute(query, [id]);
//         return rows.length > 0 ? rows[0] : null;
//     },

//     // Update a product by ID
//     update: async (id, name, description, price, stock, category_id) => {
//         const query = `
//             UPDATE Products 
//             SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, updated_at = NOW()
//             WHERE id = ?
//         `;
//         const [result] = await connection.execute(query, [name, description, price, stock, category_id, id]);
//         return result.affectedRows > 0;
//     },

//     // Delete a product by ID
//     delete: async (id) => {
//         const query = `DELETE FROM Products WHERE id = ?`;
//         const [result] = await connection.execute(query, [id]);
//         return result.affectedRows > 0;
//     }
// };

// export default Product;





import connection from "../config/db.js"; // Ensure correct path to DB connection

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















