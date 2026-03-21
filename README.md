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
create a .env file

```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/ai-flow-app?retryWrites=true&w=majority
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

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
