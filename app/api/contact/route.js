import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';

export async function POST(req) {

    console.log("Contact API route hit");

    try {
        console.log("Request headers:", req.headers);

        const body = await req.json();
        console.log("Request body:", body);

        const { name, email, message } = body;

        if (!name || !email || !message) {
            console.log("Validation failed: missing fields");
            return NextResponse.json({
                success: false,
                message: 'All fields are required'
            }, { status: 400 });
        }

        let client;
        try {
            // Save to MongoDB first
            client = new MongoClient(process.env.MONGODB_URI);
            await client.connect();
            const db = client.db(process.env.DB_NAME);
            const collection = db.collection(process.env.COLLECTION_NAME);

            const contactData = {
                name,
                email,
                message,
                timestamp: new Date(),
                status: 'new' // Status field to track message status
            };

            await collection.insertOne(contactData);
            console.log("Contact data saved to MongoDB");
        } catch (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json({
                success: false,
                message: 'Database error occurred. Please try again.'
            }, { status: 500 });
        } finally {
            if (client) {
                await client.close();
            }
        }

        // Send email
        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact: Message from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        console.log("Sending email...");
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");

        return NextResponse.json({
            success: true,
            message: 'Thank you for your message! I\'ll get back to you soon.'
        });

    } catch (error) {
        console.error('Error in contact API route:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to process your request. Please try again.'
        }, { status: 500 });
    }
}