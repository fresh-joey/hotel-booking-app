# Hotel Booking App

A microservices-based hotel booking application with React frontend, MySQL, Docker, and AWS integrations.

## ✅ Features

- User authentication with Google/Facebook OAuth
- Hotel search and booking
- Booking confirmation with email notification via AWS SES
- Hotel image upload via AWS S3
- Admin dashboard for hotel management
- User profile editing
- Hotel reviews and ratings

## 🐳 Run Locally

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local development without Docker)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd hotel-booking-app
```

2. **Configure environment variables**
```bash
# Copy the example environment file and configure it
cp .env.example .env
```

Edit `.env` and update the following with your values:
- `MYSQL_ROOT_PASSWORD` - MySQL root password
- `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` - AWS credentials
- `S3_BUCKET_NAME` - AWS S3 bucket name
- `SES_EMAIL_SOURCE` - Verified SES email address
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - Google OAuth credentials
- `FACEBOOK_APP_ID` & `FACEBOOK_APP_SECRET` - Facebook OAuth credentials

3. **Configure frontend environment (optional for Docker)**
```bash
cd frontend
cp .env.example .env.local
```

Front-end API URLs can be customized in `frontend/.env.local` if needed (defaults to localhost services).

4. **Start the application**
```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`

## 🏗️ Architecture

### Services
- **Auth Service** (Port 4000) - User authentication with OAuth
- **Hotel Service** (Port 4001) - Hotel management and search
- **Booking Service** (Port 4002) - Booking management and SES emails
- **User Service** (Port 4003) - User profile management
- **Review Service** (Port 4004) - Hotel reviews and ratings
- **Frontend** (Port 3000) - React Vite application
- **MySQL** (Port 3306) - Database

### Technology Stack
- **Frontend**: React 18, Vite, React Router
- **Backend**: Node.js, Express
- **Database**: MySQL 8.0
- **ORM**: Sequelize
- **Cloud**: AWS (S3, SES)
- **Deployment**: Docker, Docker Compose

## 📝 Environment Variables

See `.env.example` for all available environment variables including:
- Database configuration
- AWS credentials
- OAuth credentials
- API endpoint URLs
