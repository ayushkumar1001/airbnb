import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function DELETE(request, { params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId) {
    throw new Error('Missing reservationId');
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
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
    I hope this message finds you well. We wanted to confirm that your request to delete your property listing on Airbnb Clone has been successfully completed. Your listing is no longer available on our platform.
    <br/>
    We understand that this decision may have been made for various reasons, and we respect your choice. If you ever decide to return as a host in the future, please know that you are always welcome to create a new listing on our platform.
    <br/>
    Here are a few key points to note:
    <br/>
    <ol>
      <li><strong>Listing Removal</strong>: Your property listing has been removed from our platform, and it is no longer visible to potential guests.</li>
      <li><strong>Reservation Cancellations</strong>: Any reservations associated with the deleted listing have been canceled. Guests who had booked your property have been notified, and any payments processed will be refunded in accordance with our cancellation policy.</li>
      <li><strong>Reviews and Ratings</strong>: Any reviews or ratings related to the deleted listing have also been removed from our platform.</li>
      <li><strong>Account Information</strong>: Your Airbnb Clone account remains active, and you can still access your account settings and any other listings you may have.</li>
    </ol>
    <br/>
    Should you ever have any questions or need assistance with any aspect of our platform or hosting in the future, our support team is here to help. Feel free to reach out to them.
    <br/>
    We appreciate the time you spent as a host on Airbnb Clone, and we wish you the best in your future endeavors. If you ever reconsider hosting again or have any feedback or suggestions for us, please don't hesitate to get in touch.
    <br/>
    Thank you for being a part of our community, and we hope you have a wonderful day.
    <br/><br/>
    Warm regards,
    <br/>
    The Airbnb Clone Team
  </p>`;

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: currentUser?.email,
    subject:
      'Confirmation: Your Property Listing on Airbnb Clone Has Been Deleted',
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
