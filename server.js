const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:*', 'http://127.0.0.1:*'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for social links
app.get('/api/social', (req, res) => {
    res.json({
        email: 'muhammadusman5965etc@gmail.com',
        github: 'https://github.com/MuhammadUsmanGM',
        // Placeholder social links
        linkedin: '#',
        twitter: '#',
        instagram: '#',
        facebook: '#'
    });
});

// Create transporter for sending emails
let transporter;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
} else {
    console.log("Email configuration not found. Contact form will log to console only until configured.");
    // Create a dummy transporter that logs to console
    transporter = {
        sendMail: (mailOptions) => {
            return new Promise((resolve, reject) => {
                console.log("Email would have been sent (simulation):");
                console.log("To:", mailOptions.to);
                console.log("Subject:", mailOptions.subject);
                console.log("Text:", mailOptions.text);
                console.log("Email sent to console successfully!");
                resolve({ messageId: 'simulated' });
            });
        }
    };
}

// API endpoint to handle contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please fill in all fields' 
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide a valid email address' 
            });
        }
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to your email
            subject: `Portfolio Contact: Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };
        
        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully!', info.messageId);
        console.log('Contact form submission received:');
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);
        
        res.status(200).json({ 
            success: true, 
            message: 'Thank you for your message! I\'ll get back to you soon.' 
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred while sending your message. Please try again.' 
        });
    }
});

// Handle 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Route not found' 
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!' 
    });
});


module.exports = app;
if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`\n🚀 Server is running successfully!`);
        console.log(`📍 Local:    http://localhost:${PORT}`);
        console.log(`📍 Network:  http://127.0.0.1:${PORT}`);
        console.log(`💌 Email configured: ${process.env.EMAIL_USER ? 'Yes' : 'No (simulation mode)'}`);
        console.log(`\n📝 Contact form endpoint: http://localhost:${PORT}/api/contact`);
    });
}
