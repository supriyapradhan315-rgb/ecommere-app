# E-Commerce Web Application

This workspace contains a full-stack e-commerce application built with React, Vite, Express, and MongoDB.

## Features

- Product catalog with search
- Product details pages
- Shopping cart with add/remove/update quantity
- Checkout and order placement
- User registration and login
- Admin dashboard for product management and order status updates
- JWT authentication with role-based access control

## Setup

1. Copy `.env.example` to `server/.env` and update the MongoDB connection string.
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. Start both frontend and backend in development:
   ```bash
   npm run dev
   ```

## Server

- Runs on `http://localhost:5000`
- API base path: `/api`
- Default admin credentials are seeded from `server/.env`.

## Client

- Runs on `http://localhost:5173`
- Proxy set to backend API for `/api` requests

## Notes

- Use `server/.env` to configure `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
- The admin dashboard is only available after logging in as an admin user.
