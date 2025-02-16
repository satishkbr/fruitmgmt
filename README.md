# fruitmgmt
fruit management
Requirements - 
Github repo in which we push daily progress 
Mongo Atlas Project for database
Render Account to free deploy project for development purpose

# Day 1: Requirement Analysis and Project Setup
# Backend:
- Set up a Node.js project with essential dependencies: express, mongoose, dotenv, cors, nodemailer.
- Create an index.js file to initialize the server.
- Connect Node.js to MongoDB Atlas using mongoose.
- Verify the MongoDB Atlas connection by creating a simple test schema and saving a record.

# Frontend:
- Set up a React project using create-react-app or Vite.
- Install dependencies like axios and react-router-dom.
- Set up basic routing (e.g., Home, Login, Register pages).

# Outcome: Backend and frontend environments are configured and connected to MongoDB Atlas.

# Day 2: User Authentication - Manual
# Backend:
- Create a User model with fields: {name, email, password, isVerified, createdAt}.
- Develop APIs:
  - Register: Save user details and send an OTP for email verification.
  - Verify OTP: Validate the OTP and update the isVerified field.
  - Login: Validate email and password and manage sessions.

# Frontend:
- Build Register and Login pages:
  - Register form: Input fields for email, password, and OTP verification.
  - Login form: Input fields for email and password.
- Connect the forms to backend APIs using axios.

# Outcome: Fully functional manual authentication with OTP verification.

# Day 3: User Authentication - Google Sign-In
Backend:
- Integrate Google OAuth2 for authentication:
  - Create an API endpoint for Google login.
  - Validate Google access tokens and create/update user records in the database.

# Frontend:
- Add a Google Sign-In button to the login and register pages.
- Use Google OAuth client library to obtain access tokens and send them to the backend for validation.

# Outcome: Users can log in or register using Google services.

# Day 4: Fruit Management
# Backend:
- Create a Fruit model: {name, price, quantity, createdAt, updatedAt}.
- Develop CRUD APIs:
  - POST /addFruit
  - PUT /updateFruit/:id
  - DELETE /deleteFruit/:id
  - GET /getAllFruits

# Frontend:
- Build an Admin Panel for managing fruits:
  - A form for adding/editing fruits.
  - A list view for displaying fruits with edit and delete options.
- Create a User View to display all available fruits for purchase.

# Outcome: Complete fruit management functionality for both admin and user roles.

# Day 5: Cart Management
Backend:
- Create a Cart model: {userId, items: [{fruitId, qty}], totalPrice, createdAt}.
- Develop APIs:
  - POST /addToCart
  - GET /viewCart
  - DELETE /removeFromCart/:itemId
  - PUT /updateCartItem/:itemId

Frontend:
- Build a Cart Page for users:
  - Show selected fruits, quantities, and total price.
  - Options to update or remove items.
- Connect the cart frontend to backend APIs.

Outcome: Fully functional cart management for users.

# Day 6-7: Payment Integration
Backend:
- Integrate Stripe or Razorpay for payment processing:
  - Create a payment API to initialize transactions.
  - Verify payment status and update the database with order and payment details.

Frontend:
- Build a Checkout Page:
  - Display the order summary and payment options.
  - Handle payment success and failure scenarios with appropriate feedback.

Outcome: Users can securely complete payments using Stripe/Razorpay.

# Day 8: Order Management
Backend:
- Create an Order model: {userId, items, totalPrice, paymentStatus, createdAt}.
- Develop APIs:
  - POST /placeOrder
  - GET /getUserOrders
  - GET /getAllOrders (admin view).

Frontend:
- Build an Order Page for users:
  - Display order history with details like items, total price, and payment status.
- Build an Admin Order Panel:
  - Display all orders with status management.

Outcome: Complete order management system for both users and admins.


Note: This plan is not bound to exact day-wise progress. Work can be shifted as needed, and the goal is to complete the project within 10 days.

# Above backend can be broken into following services: will try this if possible( begining will start with single backend application)
1. front end - react
2. user mgmt - api
3. product mgmt - api
4. order mgmt - api
5. payment mgmt - api



