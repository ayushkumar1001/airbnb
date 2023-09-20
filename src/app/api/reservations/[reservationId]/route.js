import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function DELETE(request, { params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId) {
    throw new Error('Missing reservationId');
  }

  const data = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
      OR: [
        {
          userId: currentUser.id,
        },
        {
          listing: {
            userId: currentUser.id,
          },
        },
      ],
    },
  });

  const listing = await prisma.listing.findUnique({
    where: {
      id: data.listingId,
    },
  });

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        {
          userId: currentUser.id,
        },
        {
          listing: {
            userId: currentUser.id,
          },
        },
      ],
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
    I hope this message finds you well. We regret to inform you that your reservation with Reservation ID ${data.id} on ${listing.title} has been canceled. We apologize for any inconvenience this may cause.
    <br/>
    Reservation Details:
    <br/>
    <ol>
      <li><strong>Reservation ID</strong>: ${data.id}</li>
      <li><strong>Property Name</strong>: ${listing.title}</li>
      <li><strong>Check-in Date </strong>: ${data.startDate}</li>
      <li><strong>Check-out Date </strong>: ${data.endDate}</li>
      <li><strong>Total Amount Paid </strong>: $ ${data.totalPrice}</li>
    </ol>
    <strong>Refund Information:</strong>
    <br/>
    <ul>
      <li>The total amount paid for this reservation, including any fees, will be fully refunded to your original payment method.</li>
      <li>Refunds may take up to 5-10 business days to process, depending on your bank or financial institution.</li>
    </ul>
    <strong>Next Steps:</strong>
    <ul>
      <li>We recommend reviewing your travel plans and considering alternative accommodations if needed.</li>
      <li>If you have any questions or require further assistance regarding this cancellation, please don't hesitate to contact our support team.</li>
    </ul>
    <br/>
    We understand that unexpected changes to travel plans can be frustrating, and we apologize for any inconvenience this may have caused. We remain committed to providing excellent service and support throughout your travel journey.
    <br/>
    Thank you for considering Airbnb Clone for your travel needs. We appreciate your understanding, and we hope to have the opportunity to assist you with future travel plans.
    <br/><br/>
    Warm regards,
    <br/>
    The Airbnb Clone Team
  </p>`;

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: currentUser?.email,
    subject: 'Reservation Cancellation: ' + data.id + ' on ' + listing.title,
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

  return NextResponse.json(reservation);
}
