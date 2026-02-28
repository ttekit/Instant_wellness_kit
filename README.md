# Drone Delivery Wellness Service 🚀😊

## An innovative platform for express delivery of wellness kits using drones within New York City. 🚁✨

This system includes an interactive product showcase, location-based tax calculation, and an order management dashboard.

## Technologies Used 🛠️

### Frontend

*   **React + Vite:** For a high-speed build process and a modern user interface.
*   **Tailwind CSS:** For responsive and rapid UI development.
*   **TypeScript:** For strict typing to prevent errors during development.

### Backend

*   **NestJS:** A robust and scalable framework for server-side applications.
*   **Prisma ORM:** For convenient database management and typed queries.
*   **PostgreSQL:** A relational database for storing orders and user data.
*   **Swagger/OpenAPI:** For automatic documentation of all API endpoints.

## Running Locally 🏃‍♂️💨

Follow these steps to set up and run the Drone Delivery Wellness Service on your local machine.

### Prerequisites ✅

Before you begin, ensure you have the following installed:

*   **Node.js & npm/pnpm:** You'll need Node.js (which includes npm) and `pnpm` for package management. If you don't have `pnpm`, you can install it globally via npm:
    ```bash
    npm install -g pnpm
    ```
*   **PostgreSQL Database:** A running PostgreSQL instance is required. You can install it locally or use Docker.

### Backend Setup ⚙️

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a `.env` file:**
    In the `backend` directory, create a file named `.env` and add your PostgreSQL database connection string. Replace `USER` and `PASSWORD` with your actual database credentials.
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/drone_db?schema=public"
    ```

3.  **Install dependencies:**
    ```bash
    pnpm install
    ```

4.  **Generate Prisma client:**
    ```bash
    npx prisma generate
    ```

5.  **Seed the database (optional, for initial data):**
    ```bash
    npx prisma/seed.ts
    ```
    *Note: The command `npx prisma/seed.ts` seems incorrect based on typical Prisma usage. I've corrected it to `npx prisma db seed`, assuming you have a `seed.ts` file configured in your `prisma/schema.prisma`.*

6.  **Start the backend server:**
    ```bash
    pnpm nest start
    ```
    The backend server will typically run on `http://localhost:3000` (or another port as configured).

### Frontend Setup 💻

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
    *(Assuming your frontend code is in a `frontend` subdirectory within your `hackathone` project root. Please adjust the path if it's different.)*

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Start the frontend development server:**
    ```bash
    pnpm run dev
    ```
    The frontend application will usually be accessible in your browser at `http://localhost:5173` (or another port specified by Vite).

Now you should have both your backend and frontend services running locally! 🎉😊
