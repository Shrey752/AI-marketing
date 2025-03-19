# AI Marketing Automation Platform

An AI-powered marketing automation platform for small businesses that helps generate content and manage customer communications.

## Features

- 🤖 AI-Powered Instagram Post Generator
- 📱 Bulk WhatsApp Message Automation
- 👥 Lead Capture & Follow-Up CRM

## Tech Stack

- Frontend: React.js
- Backend: Node.js + Express.js
- Database: Firebase
- AI: OpenAI GPT-4
- Messaging: Twilio/WhatsApp Business API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- OpenAI API key
- Twilio/WhatsApp Business API credentials

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Add required API keys and credentials

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm start
   ```

## Project Structure

```
├── frontend/           # React frontend application
├── backend/           # Node.js + Express backend
└── README.md          # Project documentation
```

## Environment Variables

### Backend (.env)
```
OPENAI_API_KEY=your_openai_api_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
FIREBASE_CONFIG=your_firebase_config
```

### Frontend (.env)
```
REACT_APP_API_URL=your_backend_url
REACT_APP_FIREBASE_CONFIG=your_firebase_config
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 