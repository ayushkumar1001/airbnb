# Airbnb Clone

Welcome to the Airbnb Clone project! This web application allows users to list their properties, search for accommodations, make reservations, and enjoy a seamless booking experience.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Registration and Authentication
- Property Listing and Management
- Reservation Booking
- Search and Filtering of Listings
- User Dashboard with Reservation History
- Favorites and Saved Listings
- Payment Processing with Stripe Integration
- Email Notifications for Booking and Account Updates

## Demo
[Screencast from 25-09-23 08:07:25 PM IST.webm](https://github.com/Luciferxgkp/airbnb-clone/assets/76958987/70d8b8a4-5065-4e72-8eac-c5a3eeffce89)

You can check out the live demo of the Airbnb Clone to explore its features and functionality.

## Installation

To run this project locally, follow these steps:

1.  Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/airbnb-clone.git
    ```

2.  Install the dependencies:

    ```bash
     yarn install
    ```

3.  Create a `.env` file in the root directory of the project and add the following environment variables:

        ```bash
        DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.hx8dsng.mongodb.net/<database>"
        NEXTAUTH_SECRET="NEXTAUTH_SECRET"
        GITHUB_ID=your-github-id
        GITHUB_SECRET=your-github-secret
        GOOGLE_CLIENT_ID=your-google-client-id
        GOOGLE_CLIENT_SECRET=your-google-client-secret
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
        NODEMAILER_PW="your-password"
        NODEMAILER_EMAIL="your-email"
        STRIPE_SECRET_KEY="your-stripe-secret-key"
        NEXT_PUBLIC_APP_URL="http://localhost:3000" # or your production URL
        ```

4.  Run the development server:

        ```bash
        yarn run dev
        ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- Users can create accounts, list properties, search for accommodations, and make reservations.
- Users can view their reservations and manage their listings from their dashboard.
- Users can save listings to their favorites and view them from their dashboard.
- Property owners can manage their listings, view reservation requests, and interact with guests.
- Property owners can view their reservations and manage their listings from their dashboard.

## Technologies Used

- Frontend: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- Backend: [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/)
- Authentication: [NextAuth.js](https://next-auth.js.org/)
- Payment Processing: [Stripe](https://stripe.com/)
- Image Uploads: [Cloudinary](https://cloudinary.com/)
- Email Notifications: [Nodemailer](https://nodemailer.com/about/)
- Deployment: [Vercel](https://vercel.com/)

## Contributing

Contributions are welcome! Please refer to the [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the terms of the [MIT License](LICENSE)
