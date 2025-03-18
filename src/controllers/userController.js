import db from '../config/db.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM Users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if user has pending orders
        const [pendingOrders] = await db.query(
            "SELECT COUNT(*) AS count FROM Orders WHERE id = ? AND status IN ('pending', 'processing', 'shipped')",
            [id]
        );

        if (pendingOrders[0].count > 0) {
            return res.status(400).json({ error: "Cannot delete user. They have pending orders." });
        }

        // Check if user has product reviews or comments
        const [userReviews] = await db.query(
            "SELECT COUNT(*) AS count FROM Review WHERE user_id = ?",
            [id]
        );

        if (userReviews[0].count > 0) {
            return res.status(400).json({ error: "Cannot delete user. They have posted reviews or comments." });
        }

        // Proceed with user deletion
        await db.query("DELETE FROM Users WHERE id = ?", [id]);

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    let updatedFields = { name, email, role };

    try {
        if (password && password !== "*****") {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.password = hashedPassword;
        }

        await db.query("UPDATE Users SET ? WHERE id = ?", [updatedFields, id]);

        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};