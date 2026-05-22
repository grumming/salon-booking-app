# Salon Appointment Booking App

A full-stack web application for managing salon appointments, staff, services, and customer bookings.

## Features

- **Customer Portal**
  - Browse services and staff
  - View availability and book appointments
  - Manage bookings
  - Receive notifications

- **Staff Management**
  - Manage working hours and availability
  - View assigned appointments
  - Update service offerings

- **Admin Dashboard**
  - Manage services, pricing, and duration
  - Staff management
  - Customer management
  - Business analytics and reporting

- **Real-time Updates**
  - Live calendar synchronization
  - Instant booking confirmations
  - Email/SMS notifications

## Tech Stack

- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB Atlas
- **Hosting:** Azure App Service
- **Storage:** Azure Blob Storage
- **Authentication:** JWT + Azure AD (optional)

## Project Structure

```
salon-booking-app/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.tsx
│   ├── package.json
│   └── Dockerfile
├── backend/                  # Express server
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── server.ts
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account (free tier available)
- Azure account with credits
- Docker (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/grumming/salon-booking-app.git
cd salon-booking-app
```

2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your MongoDB and Azure credentials
```

3. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

4. Run development servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Deployment

### Azure Deployment

1. Create Azure App Service
2. Configure MongoDB Atlas connection
3. Deploy using Azure CLI or GitHub Actions

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## API Documentation

See [API.md](API.md) for complete API documentation.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
