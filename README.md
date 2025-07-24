# Cybersecurity Log Dashboard

A full-stack web app for visualizing and analyzing SIEM logs.

## Features

- **Frontend:**
  - Built with React, Vite, and TailwindCSS.
  - Interactive charts (with Recharts) for event counts and trends.
  - Modern, responsive UI.

- **Backend:**
  - Node.js with Express.
  - Serves paginated log data and chart-ready analytics through REST API.
  - CORS enabled for communication between frontend-backend and frontend-backend.
  - Reads from a sample SIEM log file (`sample_siem_log.jsonl`).

## Getting Started

### Prerequisites

- Node.js (v16+ is preferred)
- npm

### Installation

1. **Install dependencies:**
   - For the backend:
     cd Server
     npm install
     
   - For the frontend:
     cd ../Client
     npm install

# Running the App

- **Run the backend:**
  cd Server
  npm run dev
  
- **Run the frontend:**
  The frontend will be available at http://localhost:5173 , and the backend API at http://localhost:5000.

## License

This project is licensed under the ISC License.
