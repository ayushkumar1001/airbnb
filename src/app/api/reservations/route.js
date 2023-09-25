import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import axios from 'axios';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const headersList = headers();
  const fullUrl = headersList.get('referer') || '';
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { totalPrice, startDate, endDate, listingId } = body;

  if (!totalPrice || !startDate || !endDate || !listingId) {
    return NextResponse.error();
  }

  const listingAndReservations = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          totalPrice,
          startDate,
          endDate,
          userId: currentUser.id,
        },
      },
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
    We are excited to confirm your reservation with Reservation ID ${listingAndReservations.id} for ${listingAndReservations.title} on ${startDate} to ${endDate}. Your stay is now booked, and we can't wait to host you!  
    <br/>
    Reservation Details:
    <br/>
    <ol>
      <li><strong>Reservation ID</strong>: ${listingAndReservations.id}</li>
      <li><strong>Property Name</strong>: ${listingAndReservations.title}</li>
      <li><strong>Check-in Date </strong>: ${startDate}</li>
      <li><strong>Check-out Date </strong>: ${endDate}</li>
      <li><strong>Total Amount Paid </strong>: $ ${totalPrice}</li>
    </ol>
    
    We're committed to ensuring that your stay is enjoyable and hassle-free. If you encounter any issues or need assistance during your stay, please don't hesitate to contact our support team.
    <br/>
    Thank you for considering Airbnb Clone for your travel accommodation needs. We look forward to hosting you, and we wish you a wonderful and memorable stay at ${listingAndReservations.title}.
    <br/>
    Safe travels!
    <br/><br/>
    Warm regards,
    <br/>
    The Airbnb Clone Team
  </p>`;

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: currentUser?.email,
    subject:
      'Reservation Confirmation: ' +
      listingAndReservations.id +
      ' on ' +
      listingAndReservations.title,
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

  return NextResponse.json(listingAndReservations);
}
