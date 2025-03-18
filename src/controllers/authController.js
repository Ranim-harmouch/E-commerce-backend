import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from '../config/db.js'

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if the email already exists in the database
    const [existingUser] = await connection.query('SELECT email FROM Users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    /*const hashedPassword = await bcrypt.hash(password, 10);*/

    // Insert new user into the Users table
    try {
        const [result] = await connection.query(
            'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)', 
            [name, email, password, 'user'] // Set default role to 'user'
        );
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    // Find the user by email
    const [users] = await connection.query('SELECT id, email, password, role FROM Users WHERE email = ?', [email]);
    if (users.length === 0) {
        return res.status(400).json({ error: 'This user does not exist' });
    }
    const user = users[0];

    // Compare the entered password with the hashed password in the database
    /*const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
        return res.status(400).json({ error: 'Incorrect password' });
    }*/
   if(!(password === user.password)){
    return res.status(400).json({ error: 'Incorrect password' });
   }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies only in production
        sameSite: 'Lax',
        maxAge: 3600000, // 1 hour
    };

    // Set token in cookie
    res.cookie("token", token, cookieOptions);
    res.json({ message: "Login successful",token });
};

export const logoutUser = (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure cookies only in production
        sameSite: 'Lax',
    };

    res.clearCookie("token", cookieOptions);
    res.json({ message: "Logged out successfully" });
};

export const getMe = async (req, res) => {
    try {
        const { id } = req.user; // Assuming the JWT token contains the user ID

        // Fetch user details by ID
        const [userData] = await connection.query('SELECT id, name, email, role FROM Users WHERE id = ?', [id]);

        if (userData.length === 0) {
            return res.status(500).json({ error: 'User not found' });
        }

        res.json(userData[0]);
    } catch (error) {
        console.error('Error in getMe:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
