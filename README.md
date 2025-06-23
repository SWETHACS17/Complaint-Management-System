# 📃Complaint Management System

A simple complaint management system built with Next.js, MongoDB,Cloudinary and Tailwind CSS.

## Features

- User authentication (login/register)
- Submit complaints with title, description, and optional photo
- View list of submitted complaints
- Delete complaints

## Technologies Used

- Next.js 13 (App Router)
- MongoDB (with Mongoose)
- NextAuth.js for authentication
- Tailwind CSS for styling
- Cloudinary for file storage

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/complaint-management-system.git
   cd complaint-management-system

   ```

2. Installations:
```bash
npx create-next-app@latest complaint-management-system
npm i
cd complaint-management-system
npm install mongoose
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
npm install bcryptjs
npm install framer-motion


```
3. Setting MongoDB and Cloudinary:
   • Go to https://cloud.mongodb.com and log in.
   •Create a new project → then build a database.
   •Choose MongoDB Atlas → pick free/shared tier.
   •Deploy a cluster.
   •Once created, go to Database > Connect → choose Connect using MongoDB Compass or Drivers.
   •Copy the connection string under “Connect your application”, which looks like:
   ```bash
   mongodb+srv://<Yourusername>:<Yourpassword>@cluster0.mongodb.net/?retryWrites=true&w=majority

   ```
4. NEXTAUTH_SECRET
      This is a long random string used to encrypt NextAuth tokens.
      
      Run this in your terminal to generate a secure secret:
      ```bash
      openssl rand -base64 32
      ```
      Or, generate a 32-char strong secret online via:
      ```bash
      https://generate-random.org/string-generator
      ```
5. NEXTAUTH_URL
      This is the URL of the app.
      
      For local development:
      NEXTAUTH_URL=http://localhost:3000

6. Cloudinary Configuration
      To store and serve images (optional unless you're using it):
      Go to https://cloudinary.com → Sign up or log in.
      Go to your dashboard.You'll find:
      
      CLOUD_NAME
      API_KEY
      API_SECRET
      
      Copy those values to your .env.local.

7. Sample Final .env File:
```bash
MONGODB_URI=mongodb+srv://swetha:yourpassword@cluster0.mongodb.net/complaint-system?retryWrites=true&w=majority
NEXTAUTH_SECRET=q9HeTt...your-generated-secret...
NEXTAUTH_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=swetha_cloud
CLOUDINARY_API_KEY=1234567890
CLOUDINARY_API_SECRET=your_cloudinary_secret
```
8. To run:
```bash
npm run dev
```

💫Now Our Complaint Management System is ready!
