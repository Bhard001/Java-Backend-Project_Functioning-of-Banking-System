🚀 Mini Banking System – Full Stack (React + Vite • Spring Boot • JWT • MySQL)

A secure, production-style Mini Core Banking System built using React (Vite) on the frontend and Spring Boot on the backend.
This project simulates real digital banking workflows — including login authentication, deposits, withdrawals, money transfer, and real-time transaction history.

The system is designed as a prototype of a real banking application, where only pre-registered users in the database can log in (no public sign-ups).


mini-banking-frontend/
    
    ├── src/
      │   ├── api/
      │   │   └── bankingApi.js
      │   ├── components/
      │   │   ├── Navbar.jsx
      │   │   ├── Sidebar.jsx
      │   │   ├── Loader.jsx
      │   │   └── ProtectedRoute.jsx
      │   ├── context/
      │   │   └── AuthContext.jsx
      │   ├── pages/
      │   │   ├── LoginPage.jsx
      │   │   ├── Dashboard.jsx
      │   │   ├── DepositPage.jsx
      │   │   ├── WithdrawPage.jsx
      │   │   ├── TransferPage.jsx
      │   │   └── TransactionHistoryPage.jsx
      │   ├── App.jsx
      │   └── main.jsx
      ├── index.html
      ├── package.json
      └── vite.config.js


Backend :
 
      src
     └── main
         ├── java
         │    └── com.bankingsystem
         │          ├── controller
         │          ├── model
         │          ├── repository
         │          ├── service
         │          ├── security
         │          └── exception
         └── resources
               ├── application.properties
               └── schema.sql (optional)



Features Implemented

    ✅ 1. User Authentication (JWT Security)

          Secure login using JWT tokens

          Passwords stored using BCrypt hashing

          Stateless authentication with filters

          Role-based logic initially planned, later simplified for cleaner flow

    ✅ 2. User Management

          Register user

          Fetch user

          Delete user (Admin-level action)

          Search user by email or phone

    ✅ 3. Transaction Operations

          Deposit money

          Withdraw money

          Money transfer between users

          Auto-log every transaction in history

    ✅ 4. Transaction History API

          Get complete history for any user

          Pagination & Sorting support

          Query formats like:

                /transactions?page=0&size=10

                /transactions?sort=date,desc


Controller Layer

  Handles incoming API requests
  Examples:

    UserController

    AuthController

    TransactionController

Service Layer

  Contains business logic

    UserService

    TransactionService

    CustomUserDetailsService

Repository Layer

  Handles MySQL operations using Spring Data JPA

    UserRepository

    TransactionRepository

Security Layer

    JwtUtil

    JwtAuthenticationFilter

    JwtAuthorizationFilter

    SecurityConfig

🛢️ Database: MySQL Setup
Database Name:

banking_system

🗄️ Database Tables

    🧑 1. users
          Column Name	Type	Description
          id	INT (PK)	Auto-generated user ID
          name	VARCHAR	Full name
          email	VARCHAR (unique)	Used for login + identification
          phone	VARCHAR	Contact number
          password	VARCHAR	BCrypt encoded password
          balance	DECIMAL	Current account balance
          created_at	TIMESTAMP	User creation time

      ✔ This table is directly mapped to the User entity.
       ✔ Password is encrypted before saving.

    💳 2. transactions
          Column Name	Type	Description
          id	BIGINT (PK)	Unique transaction ID
          user_id	INT (FK)	Linked to users(id)
          transaction_type	VARCHAR	CREDIT / DEBIT / TRANSFER
          amount	DECIMAL	Amount involved
          description	VARCHAR	Details of transaction
          timestamp	TIMESTAMP	Auto-generated

      ✔ Every time deposit/withdraw/transfer is executed → a new row is created.
       ✔ Pagination + sorting is applied on this table.


🔐 JWT Authentication Flow

    User hits the /api/auth/login endpoint

    AuthenticationManager validates credentials

    CustomUserDetailsService loads user from DB

    Password is checked via BCrypt

    If valid → server returns JWT Token

    Token must be included for future API calls:

          Authorization: Bearer <your_token_here>

📡 API Overview (High-Level)

    🔑 Authentication
          Method	Endpoint	Description
          POST	/api/auth/login	Login + generate JWT

    🧑 User APIs
          Method	Endpoint	Description
          GET	/api/users/{id}	Get user details
          DELETE	/api/users/{id}	Delete user
          GET	/api/users/search?email=	Search user

    💰 Transaction APIs
          Method	Endpoint	Description
          POST	/api/transactions/deposit	Deposit money
          POST	/api/transactions/withdraw	Withdraw money
          POST	/api/transactions/transfer	Transfer money
          GET	/api/transactions/history/{userId}	Get transaction history with pagination


    🧩 Pagination & Sorting Example
        GET /api/transactions/history/5?page=0&size=10&sort=timestamp,desc


This returns:

  Page 0

  10 transactions

  Sorted by latest first


▶️ How to Run the Backend (Spring Boot)
Prerequisites

Java 17+

Maven 3.8+

MySQL running locally

Step 1 – Configure DB

Edit application.properties:

    spring.datasource.url=jdbc:mysql://localhost:3306/banking_system
    spring.datasource.username=root
    spring.datasource.password=your_password
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.format_sql=true


Step 2 – Install Dependencies

    mvn clean install


Step 3 – Start Server

    mvn spring-boot:run


The Spring Boot server starts on → http://localhost:8080


⚛️ How to Run the Frontend (Vite + React)

    Install Dependencies
    npm install


Start Development Server

    npm run dev


Frontend runs on → http://localhost:5173


🎯 Features (Fully Implemented)

    🔐 Authentication

          JWT-based login

          Only database-registered users allowed

          Protected routes

          Auto-token storage & persistence

    💼 Core Banking Operations

          Deposit Money

          Withdraw Money

          Transfer Between Users

          Real-time account balance


Beautiful, clean transaction history (paginated on backend)

📊 Dashboard

    Account overview

    Recent activity

    Quick actions


📚 Clean Frontend Structure

    Reusable components

    Centralized API service

    Global auth context

Tailwind CSS UI

Fully responsive

🧠 Why This Project Is Important

    This is not a basic CRUD project — it's an industry-grade architecture simulating real banking backend logic:

    ✔ Real authentication workflow (JWT)
    ✔ Money logic with validations
    ✔ Stateful dashboards
    ✔ Secure API communication
    ✔ Transaction recording (audit trail)
    ✔ Clean separation: Controller → Service → Repository → Model


This project is extremely useful for:

    Backend development portfolio
    
    Full-stack engineering interviews
    
    Demonstrating real-world problem solving
    
    Showcasing secure system design

🧮 Tech Stack

Frontend

    React (Vite)
    
    Tailwind CSS
    
    React Hook Form
    
    React Router DOM
    
    Axios
    
    Toastify
    
    Context API


Backend

    Java 17
    
    Spring Boot 3+
    
    Spring MVC
    
    Spring Security (JWT)
    
    Spring Data JPA
    
    MySQL
    
    Lombok

Tools

    VS Code / IntelliJ
    
    Postman
    
    Git + GitHub
    
    Maven


🚀 What Makes This Project Different?

    ✔ Security-first approach
    
    Not a typical CRUD app — the system enforces:
    
    Authenticated-only access
    
    JWT validation
    
    Role-based behavior possibility
    
    Clean API protection
    
    ✔ Banking-accurate logic
    
    Withdraw only if balance ≥ amount
    Real-time updates
    Clear error handling
    
    ✔ Future-ready architecture
    
    This project is structured so it can grow into a real product:
    
🔮 Future Scope

    Online Payments Integration (UPI / Stripe)
    
    Wallet Money Manager
    
    Multi-user accounts
    
    Admin Dashboard
    
    Monthly Statements PDF
    
    Credit & Loan Modules
    
    AI insights on spending patterns

📦 API Endpoints Summary

    Auth
    POST /api/auth/login

User

    GET /api/user/me

Transactions

    POST /api/transactions/deposit
    POST /api/transactions/withdraw
    POST /api/transactions/transfer
    GET  /api/transactions/history?page=0&size=10


🧩 Frontend Flow Overview

    ✔ Login user → store token → redirect dashboard
    ✔ All routes protected with ProtectedRoute
    ✔ API calls auto-attach Authorization header
    ✔ Each banking action updates balance live
    ✔ Transaction table refreshes immediately

📘 How to Contribute

    Fork the repo

    Create a new branch
    
    Add feature / fix

Submit PR

📄 License

This project is open for educational and portfolio use.
