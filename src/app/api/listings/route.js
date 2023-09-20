import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from 'src/libs/prismadb';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price),
      userId: currentUser.id,
    },
  });

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const message = `<p> Dear ${currentUser?.name},
    <br/><br/>
    We're thrilled to inform you that your property listing on Airbnb Clone is now live and ready to welcome guests from around the world. Congratulations on taking this exciting step towards sharing your space with travelers!
    <br/>
    To ensure that you make the most of your listing and attract potential guests, we recommend a few additional steps:
    <br/>
    <ol>
      <li><strong>Optimize Your Listing</strong>: Take a moment to review your listing and ensure that all information is accurate and up-to-date. High-quality photos, a detailed description, and comprehensive amenity information can significantly enhance your listing's appeal.</li>
      <li><strong>Pricing Strategy</strong>: Consider your pricing strategy carefully. Research similar listings in your area to ensure your rates are competitive. You can adjust your pricing at any time based on demand and seasonality.</li>
      <li><strong>Availability Calendar</strong>: Regularly update your availability calendar to reflect your property's open dates accurately. Guests appreciate transparency, so keeping your calendar up to date is essential.</li>
      <li><strong>Guest Communication</strong>: Promptly respond to guest inquiries and booking requests. Guests are more likely to book with hosts who respond quickly and professionally.</li>
      <li><strong>Safety and Security</strong>: We recommend that you install smoke and carbon monoxide detectors in your property and provide a fire extinguisher. You should also ensure that your property is equipped with a first aid kit and a fire escape plan.</li>
    </ol>
    <br/>
    Remember that Airbnb Clone is here to support you every step of the way. If you have any questions or concerns, please don't hesitate to contact us.
    <br/>
    We wish you great success with your property listing and look forward to helping you create memorable experiences for your guests. Thank you for choosing Airbnb Clone as your trusted partner in the world of property rentals.
    <br/><br/>
    Warm regards,
    <br/>
    The Airbnb Clone Team
  </p>`;

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: currentUser?.email,
    subject: 'Congratulations! Your Property Listing is Live on Airbnb Clone',
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

  return NextResponse.json(listing);
}
