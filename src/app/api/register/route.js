import prisma from '@/libs/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const message = `<p> Dear ${name},
    <br/><br/>
    We are thrilled to welcome you to Airbnb Clone! Your account has been successfully created, and you're now a valued member of our community.
    <br/>
    Your Airbnb Clone account opens the door to a world of possibilities:
    <br/>
    <ol>
      <li><strong>Create Listings</strong>: If you're a property owner, you can start listing your properties for rent right away.</li>
      <li><strong>Search and Book</strong>: As a guest, you can explore a wide range of accommodations and start planning your next adventure.</li>
      <li><strong>Manage Bookings</strong>: Easily keep track of your reservations, communicate with hosts (if applicable), and enjoy a seamless booking experience.</li>
      <li><strong>Save Favorites</strong>: Bookmark listings you love and come back to them later.</li>
      <li><strong>Stay Informed</strong>: Receive updates on new listings, special offers, and more.</li>
    </ol>
    <br/>
    We're committed to providing you with a safe, user-friendly platform and exceptional customer support. If you have any questions or need assistance at any point, our support team is here to help. 
    <br/>
    Thank you for choosing Airbnb Clone for your property rental and travel needs. We look forward to being part of your journey and helping you create memorable experiences.
    <br/>
    Once again, welcome to Airbnb Clone!
    <br/><br/>
    Warm regards,
    <br/>
    The Airbnb Clone Team
  </p>`;

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: 'Welcome to Airbnb Clone - Your Account is Ready!',
    html: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error);
    } else {
      console.log('Email Sent');
      return true;
    }
  });

  return NextResponse.json(user);
}
