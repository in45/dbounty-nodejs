# DBounty Node.js Real-Time Server

## Overview

The **DBounty Node.js Real-Time Server** facilitates real-time communication within the DBounty platform. It manages WebSocket connections to enable live chat and updates between users, managers, and admins. This server handles message routing and JWT authentication.

## Features

- **Real-Time Messaging:** Supports real-time messaging between users, managers, and admins.
- **Report Notifications:** Notifies users about new reports and updates on report statuses.
- **JWT Authentication:** Secures WebSocket connections using JWT with RSA encryption.
- **Socket.IO Integration:** Uses Socket.IO for real-time, bidirectional communication.

## Code Structure
- Server Setup: Initializes Express server and Socket.IO.
- Routes: Defines endpoints for report submission and messaging.
- Socket Events: Handles WebSocket connections and message routing.
- Authentication Middleware: Verifies JWT tokens for secure WebSocket communication.

## Installation
```sh
npm install
```
## Configuration
1. Place your `public.pem` file in the root directory. This file is used for JWT verification.
2. The server listens on port 5000. This can be adjusted in the code if necessary.
## Usage
```sh
node main.js
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
