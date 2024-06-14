# Bike Rental Reservation System Backend

This repository contains the backend API for  Bike Rental Reservation System. The API allows users to register, log in, view and update profiles, add and manage bikes  and create and manage bike rentals. The project is built using TypeScript, MongoDB, and Express.js.

## Technology
- MongoDB (Database)
- Mongoose (ODM)
- TypeScript (ODM)
- Expressjs (ODM)

## Table of Contents

- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v16 or later)
- [npm](https://www.npmjs.com/get-npm) (v8 or later)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mahamodulhasanmoon/bike-rental-service
   cd bike-rental-service

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    NODE_ENV = production
    BASE_URL= https://bike-rental.brainicsoft.xyz
   
    mongoDB_URI=database Here
    PORT=8000
    SALT_ROUND=12
    ACCESS_TOKEN=token_here
    REFRESH_TOKEN=token_here
    DEFAULT_PASS=Pa$$word!
    ACCESS_TOKEN_ExPIRE=1hr
    REFRESH_TOKEN_ExPIRE=1d
    
    ```

4. **Compile TypeScript:**

    ```bash
    npm run build
    ```

5. **Start the server:**

    ```bash
    npm start
    ```

## API Documentation

The API is documented using OpenAPI 3.0. The `openapi.yaml` file contains the complete documentation.

## Endpoints

## https://bike-rental.brainicsoft.xyz/



# contact-information
### For any queries or issues, please contact:
- Name: Mahamodul Hasan Moon
- Email: mahamodulhasan.moon@gmail.com
- Website: https://mahamodulhasan.me
- phone: 8801734921621