import nodemailer from 'nodemailer';

// Setup Nodemailer transport
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: ' akeem.kunze27@ethereal.email',
        pass: 'qpdMxEVNQqZ4rQduXn'
    }
});



export const sendEmail = async (req, res) => {
    const { name, email,phone, message } = req.body; // Get data from frontend

    try {
        let info = await transporter.sendMail({
            from: `"${name}" <${email}>`, // Sender name and email
            to: 'personalemail@gmail.com', // Replace with your actual email
            subject: 'New Contact Us Message',
            text: message, // Plain text body
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Phone:</strong> ${phone}</p> 
                   <p><strong>Message:</strong> ${message}</p>`
        });

        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ success: false, message: 'Email sending failed' });
    }
};