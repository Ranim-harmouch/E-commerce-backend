import connection from '../config/db.js'; // Ensure correct path

const Images = {
    create: async (url, product_id) => {
        const query = `
            INSERT INTO Images (url, product_id) 
            VALUES (?, ?)
        `;
        const [result] = await connection.execute(query, [url, product_id]);
        return { id: result.insertId, url, product_id };
    },

    getAll: async () => {
        const query = `SELECT * FROM Images`;
        const [rows] = await connection.execute(query);
        return rows;
    },

    getById: async (id) => {
        const query = `SELECT * FROM Images WHERE id = ?`;
        const [rows] = await connection.execute(query, [id]);
        return rows[0] || null;
    },

    update: async (id, url) => {
        const query = `
            UPDATE Images 
            SET url = ? 
            WHERE id = ?
        `;
        const [result] = await connection.execute(query, [url, id]);
        return result.affectedRows > 0;
    },

    delete: async (id) => {
        const query = `DELETE FROM Images WHERE id = ?`;
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    }
};

export default Images;
