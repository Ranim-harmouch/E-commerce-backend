import db from '../config/db.js';

export const getUsers = async (req, res) => {
    try {
        const [users] = await db.execute('SELECT * FROM Users');
        res.status(200).json({
            data: users,
            message: "Users retrieved successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Users annot be displayed",
            error: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if user has pending orders
        const [pendingOrders] = await db.execute(
            "SELECT COUNT(*) AS count FROM Orders WHERE id = ? AND status IN ('pending', 'shipped')",
            [id]
        );

        if (pendingOrders[0].count > 0) {
            return res.status(400).json({
                data: null,
                message: "Cannot delete user. They have pending orders.",
                error: null
            });
        }

        // Check if user has product reviews or comments
        const [userReviews] = await db.execute(
            "SELECT COUNT(*) AS count FROM Review WHERE user_id = ?",
            [id]
        );

        if (userReviews[0].count > 0) {
            return res.status(400).json({
                data: null,
                message: "Cannot delete user. They have posted reviews or comments.",
                error: null
            });
        }

        // Proceed with user deletion
        await db.execute("DELETE FROM Users WHERE id = ?", [id]);

        res.json({
            data: null,
            message: "User deleted successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error deleting user",
            error: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    let updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (role) updatedFields.role = role;

    try {
        // Prevent empty updates
        const keys = Object.keys(updatedFields);
        if (keys.length === 0) {
            return res.status(400).json({
                data: null,
                message: "No fields to update"
            });
        }

        const setClause = keys.map(key => `${key} = ?`).join(", ");
        const values = [...Object.values(updatedFields), id];

        await db.execute(`UPDATE Users SET ${setClause} WHERE id = ?`, values);

        // Fetch the updated user data
        const [updatedUser] = await db.execute(
            "SELECT id, name, email, role FROM Users WHERE id = ?", 
            [id]
        );

        if (updatedUser.length === 0) {
            return res.status(404).json({
                data: null,
                message: "User not found after update"
            });
        }

        res.json({
            data: updatedUser[0], // Return updated user details
            message: "User updated successfully"
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            data: null,
            message: "An error occurred while updating the user",
            error: error.message
        });
    }
};
