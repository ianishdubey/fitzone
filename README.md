# FitZone - Complete Fitness Website with Backend

A comprehensive fitness website with full-stack functionality including user authentication, cart management, order processing, and more.

## 🚀 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **User Authentication**: Sign up, sign in, password reset
- **Shopping Cart**: Add programs/services, manage quantities
- **Program Management**: Browse, filter, and purchase fitness programs
- **Order Management**: Track orders, view history
- **Healthcare AI**: AI-powered fitness and nutrition assistant
- **Payment Integration**: Stripe payment processing
- **Contact System**: Contact forms with email integration

### Backend Features
- **RESTful API**: Express.js with MongoDB
- **Authentication**: JWT-based auth with bcrypt password hashing
- **User Management**: Profile management, activity logging
- **Cart System**: Persistent cart with user sessions
- **Order Processing**: Complete order lifecycle management
- **Email Service**: Automated emails for confirmations
- **Security**: Rate limiting, input validation, CORS protection
- **Database**: MongoDB with Mongoose ODM

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Zustand** for state management
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Nodemailer** for email service
- **Stripe** for payment processing
- **Express Validator** for input validation

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fitzone-website.git
cd fitzone-website
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Setup

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
VITE_APP_NAME=FitZone
VITE_APP_VERSION=1.0.0
```

#### Backend (server/.env)
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/fitzone
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_12345
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@fitzone.com
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
OPENAI_API_KEY=your_openai_api_key
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SESSION_SECRET=your_session_secret_here
```

### 4. Database Setup
Make sure MongoDB is running locally or provide a cloud MongoDB URI in the environment variables.

#### Seed the Database (Optional)
```bash
npm run seed
```

### 5. Start the Application

#### Development Mode (Both Frontend & Backend)
```bash
npm run dev:full
```

#### Or start separately:
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
npm run dev
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Cart Management
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:orderId` - Get specific order
- `POST /api/orders/:orderId/cancel` - Cancel order

### Programs & Services
- `GET /api/programs` - Get all programs
- `GET /api/programs/:id` - Get specific program

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds
- **Rate Limiting**: Prevent abuse and brute force attacks
- **Input Validation**: Express-validator for request validation
- **CORS Protection**: Configured for frontend domain
- **Helmet**: Security headers middleware
- **Account Lockout**: Temporary lockout after failed attempts

## 📱 Key Components

### Frontend Components
- `AuthModal`: User authentication modal
- `Cart`: Shopping cart with persistent state
- `HealthcareAI`: AI-powered fitness assistant
- `CheckoutPage`: Complete checkout process
- `Header`: Navigation with auth state
- `Programs/Services`: Browse and purchase items

### Backend Models
- `User`: Complete user profile and preferences
- `Program`: Fitness programs with scheduling
- `Order`: Order management with history
- `Cart`: Persistent cart items

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)
```bash
cd server
# Set environment variables in hosting platform
# Deploy with Node.js runtime
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@fitzone.com or create an issue in the repository.

## 🔄 Updates & Maintenance

- Regular security updates
- Database backups
- Performance monitoring
- Error logging and monitoring

---

**FitZone** - Transform Your Body, Transform Your Life! 💪