# Wango - Parking Payment Web App

Wango is a full-stack web application that allows users to register, log in, and manage on-street parking sessions with city-specific pricing logic.

## Features

- Register and login using email and car plate (no password)
- Select city and parking area
- Start and stop parking sessions
- City-specific pricing rules (e.g. NYC, Washington)
- Display total price after parking ends

## Tech Stack

- **Frontend**: React + Vite + TypeScript + Bootstrap
- **Backend**: Node.js + Express + Prisma + PostgreSQL
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Testing**: Jest (unit tests), Postman (API)

## Why PostgreSQL + Prisma?

I chose PostgreSQL because it’s a reliable and trusted database that's great for organizing structured information like users, cities, and parking records. Prisma helps me work with the database more easily by simplifying how I read and save data, without needing to write complex database code.

## Setup Instructions

1. Clone the repo
2. Create `.env` files in both `frontend/` and `backend/`
3. Install dependencies:

```bash
cd backend && npm install
cd ../frontend && npm install


## Database Seeding

To populate the database with sample cities and parking areas, use the Prisma seed script.

### ✳ Run the seed script

```bash
npx prisma db seed
