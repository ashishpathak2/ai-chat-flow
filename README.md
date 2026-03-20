# ⚡ AI Flow App

A full-stack visual AI workflow application built with React Flow, Node.js, MongoDB, and OpenRouter (Gemini 2.0 Flash).

```
Enter Prompt → [Input Node] ──→ [Result Node] ← AI Response
```

---

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19 + Vite + Tailwind CSS + React Flow |
| Backend   | Node.js + Express.js                |
| Database  | MongoDB Atlas + Mongoose            |
| AI API    | OpenRouter → `google/gemini-2.0-flash-exp:free` |

---

## 📁 Project Structure

```
ai-flow-app/
├── client/                        # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── nodes/
│   │   │   │   ├── InputNode.jsx  # Prompt input node
│   │   │   │   └── ResultNode.jsx # AI response node
│   │   │   ├── FlowCanvas.jsx     # React Flow canvas
│   │   │   └── Controls.jsx       # Top control bar
│   │   ├── services/
│   │   │   └── api.js             # Axios API service
│   │   ├── App.jsx                # Root component + state
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles + React Flow overrides
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── server/                        # Node Backend
    ├── src/
    │   ├── config/
    │   │   ├── db.js              # MongoDB connection
    │   │   └── openrouter.js      # OpenRouter API client
    │   ├── controllers/
    │   │   ├── ai.controller.js   # POST /api/ask-ai
    │   │   └── flow.controller.js # POST /api/save, GET /api/flows
    │   ├── models/
    │   │   └── flow.model.js      # Mongoose Flow schema
    │   ├── routes/
    │   │   ├── ai.routes.js
    │   │   └── flow.routes.js
    │   └── app.js                 # Express app setup
    ├── server.js                  # Entry point
    ├── .env.example               # Environment variable template
    └── package.json
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Configure Environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/ai-flow-app?retryWrites=true&w=majority
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

**Get your keys:**
- **MongoDB Atlas**: [cloud.mongodb.com](https://cloud.mongodb.com) → Free M0 cluster → Get connection string
- **OpenRouter**: [openrouter.ai/keys](https://openrouter.ai/keys) → Create API key

### 3. Run Development Servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# → Server running on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# → App running on http://localhost:5173
```

### 4. Open the App

Visit **http://localhost:5173** in your browser.

---

## 🔌 API Reference

### `POST /api/ask-ai`

Send a prompt, receive AI response.

**Request:**
```json
{
  "prompt": "What is the capital of France?"
}
```

**Response:**
```json
{
  "success": true,
  "response": "The capital of France is Paris."
}
```

---

### `POST /api/save`

Save a prompt+response pair to MongoDB.

**Request:**
```json
{
  "prompt": "What is the capital of France?",
  "response": "The capital of France is Paris."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Flow saved successfully",
  "data": {
    "id": "65f...",
    "prompt": "...",
    "response": "...",
    "createdAt": "2024-03-01T..."
  }
}
```

---

### `GET /api/flows`

Retrieve all saved flows (most recent first, limit 50).

---

### `GET /health`

Server health check.

---

## 🎨 UI Features

- **Dark terminal aesthetic** with green accent (#00ff88)
- **Dot-grid background** on the canvas
- **Animated edges** between nodes with glow effect
- **Shimmer loading** skeleton in Result Node
- **Toast notifications** for success/error states
- **Draggable nodes** — reposition freely on canvas
- **MiniMap** for canvas navigation
- **Zoom controls** with scroll wheel

---

## 🔒 Security Notes

- API keys are **never** exposed to the frontend
- All AI calls are made server-side only
- CORS is configured for localhost only (update for production)
- Input validation on all endpoints

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the dist/ folder
# Set VITE_API_URL env var to your backend URL
```

Update `vite.config.js` proxy → use `VITE_API_URL` env var in `api.js` for production.

### Backend (Railway/Render)
- Push `server/` folder
- Set environment variables: `PORT`, `MONGO_URI`, `OPENROUTER_API_KEY`
- Start command: `node server.js`
