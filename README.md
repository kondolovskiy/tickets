# Event Tickets Application

A full-stack application for managing event tickets built with React, TypeScript, and Express.

## Prerequisites

- Node.js (version 18 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Available Scripts

- `npm start` - Starts the production server from the built files
- `npm run server` - Starts the development server with hot-reload
- `npm run client` - Starts the Vite development server for the client
- `npm run dev` - Runs both client and server in development mode concurrently
- `npm run build` - Builds both server and client for production
- `npm test` - Runs the test suite

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Testing Library

### Backend
- Express.js
- TypeScript
- Node.js

## Project Structure

```
├── client/ # Frontend React application
│ ├── src/
│ └── vite.config.ts
├── server/ # Backend Express application
│ ├── src/
│ └── index.ts
└── package.json
```

## API Endpoints

The server runs on `http://localhost:6000` by default and exposes the following API endpoints:

- `/api/tickets` - Ticket-related operations

## License

MIT
