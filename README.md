# E-Commerce Bookstore

Welcome to the E-Commerce Bookstore! This project is a full-stack application 
built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. 
It allows users to browse, search, and purchase books online.

## Visit: 
https://legendary-frangipane-3f8c38.netlify.app/

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (sign up, login, logout)
- Browse and search for books
- View book details
- Add books to the shopping cart
- Checkout process
- Admin panel for managing books and orders

## Technologies Used

- **Frontend:**
  - React.js
  - Redux (for state management)
  - React Router (for navigation)
  - Axios (for API calls)
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (for database)
  - Mongoose (for MongoDB object modeling)
  
- **Others:**
  - JWT (for authentication)
  - Bootstrap (for styling)
## Installation

To get started with the E-Commerce Bookstore, follow these steps:

1. Clone the repository:
   - git clone https://github.com/kushal022/BookStore.git

2. Navigate to the project directory:
  - cd bookStore
    
3. Install the backend dependencies:
  - cd server
  - npm init

4. Install the frontend dependencies:
  - cd client
  - npm install

5. Set up your MongoDB database and update the connection string in the backend configuration.

6. Start the backend server:
  - node app.js

7. Start the frontend application:
  - npm run dev

## Usage
  - Once the application is running, you can access it in your web browser at http://localhost:5371.
  - You can create an account, login, browse books, and make purchases.

## API Endpoints
  - Here are some of the key API endpoints available in the application:

    - `POST /api/users/signup` - Register a new user
    - `POST /api/users/signin` - Log in an existing user
    - `GET /api/books` - Retrieve a list of all books
    - `GET /api/books/:id` - Retrieve details of a specific book
    - `POST /api/cart` - Add a book to the shopping cart
    - `POST /api/order` - Place a new order
    

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

Thank you for checking out the E-Commerce Bookstore! Happy reading!

Feel free to modify any sections to better fit your project or add any additional information that you think is necessary!
