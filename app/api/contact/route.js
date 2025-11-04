import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';

// Simple in-memory rate limiting (for demonstration)
// In production, use Redis or database for rate limiting
const rateLimitMap = new Map();

// Sanitize function to prevent XSS
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  
  // Remove potentially dangerous characters/scripts
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .trim();
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate message length
function isValidMessage(message) {
  return message && message.length >= 10 && message.length <= 1000;
}

// Rate limiting function
function isRateLimited(ipAddress) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 requests per window

  if (!rateLimitMap.has(ipAddress)) {
    rateLimitMap.set(ipAddress, {
      count: 0,
      resetTime: now + windowMs
    });
  }

  const client = rateLimitMap.get(ipAddress);

  if (now > client.resetTime) {
    // Reset the counter if the window has passed
    client.count = 0;
    client.resetTime = now + windowMs;
  }

  if (client.count >= maxRequests) {
    return true; // Rate limited
  }

  // Increment the count
  client.count += 1;
  return false; // Not rate limited
}

export async function POST(req) {
  console.log("Contact API route hit");

  try {
    // Get IP address for rate limiting
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || req.connection?.remoteAddress || '127.0.0.1';
    
    console.log("Request IP:", ipAddress);
    console.log("Request headers:", req.headers);

    // Check rate limiting
    if (isRateLimited(ipAddress)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.'
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    console.log("Request body:", body);

    let { name, email, message } = body;

    // Sanitize inputs
    name = sanitizeInput(name);
    email = sanitizeInput(email);
    message = sanitizeInput(message);

    // Validation
    if (!name || !email || !message) {
      console.log("Validation failed: missing fields");
      return NextResponse.json({
        success: false,
        message: 'All fields are required'
      }, { status: 400 });
    }

    // Additional validation
    if (name.length < 2 || name.length > 50) {
      return NextResponse.json({
        success: false,
        message: 'Name must be between 2 and 50 characters'
      }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        message: 'Please provide a valid email address'
      }, { status: 400 });
    }

    if (!isValidMessage(message)) {
      return NextResponse.json({
        success: false,
        message: 'Message must be between 10 and 1000 characters'
      }, { status: 400 });
    }

    // Additional spam detection
    // Check for excessive links in the message
    const linkCount = (message.match(/https?:\/\//g) || []).length;
    if (linkCount > 2) {
      return NextResponse.json({
        success: false,
        message: 'Invalid message format detected'
      }, { status: 400 });
    }

    let client;
    try {
      client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(process.env.COLLECTION_NAME);

      const contactData = {
        name,
        email,
        message,
        timestamp: new Date(),
        ip: ipAddress, // Store IP for potential abuse monitoring
        userAgent: req.headers.get('user-agent'),
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
        <p><strong>Name:</strong> ${name.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        <p><strong>Email:</strong> ${email.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        <hr>
        <small>IP: ${ipAddress}</small>
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