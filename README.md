# YouTube SPA

A modern YouTube-inspired Single Page Application built with React, TypeScript, and the YouTube Data API. The application allows users to search for videos, watch content, save search queries, and enjoy a responsive interface with authentication and persistent application state.

> 🚀 Live Demo: https://<vladislavevteev16.github.io/youtube-spa>

---

## ✨ Features

- 🔎 Search YouTube videos
- ▶️ Watch videos directly in the application
- 💾 Save search queries for quick access
- 🔐 User authentication
- 🌓 Light & Dark themes
- 🌐 Language switching
- 📱 Responsive layout for desktop and mobile
- 📄 Grid/List view modes
- 📌 Persistent application state with Redux Persist

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React 19, TypeScript |
| Build Tool | Vite |
| UI | Ant Design |
| State Management | Redux Toolkit |
| Persistence | Redux Persist |
| Forms | React Hook Form |
| Routing | React Router v7 |
| HTTP Client | Axios |
| Video Player | React YouTube, React Player |
| Utilities | Day.js, UUID |

---

## 🏗 Architecture

The application follows a component-based architecture with centralized state management using Redux Toolkit.

### Architecture Highlights

- Redux Toolkit manages application state.
- Redux Persist stores user preferences and saved data between sessions.
- Axios provides a centralized API layer.
- Modular structure separates pages, reusable components, hooks, API services, and Redux slices.
- Routing is handled with React Router.

---

## 📁 Project Structure

src/
├── api/             # API clients
├── assets/          # Static assets
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── pages/           # Application pages
├── redux/
│   ├── slices/      # Redux slices
│   └── store/       # Store configuration
├── types/           # TypeScript types
├── utils/           # Helper functions
└── App.tsx
---

## 🚀 Getting Started

### Requirements

- Node.js 20+
- npm

### Installation

git clone <repository-url>
cd youtube-spa
npm install
### Run Development Server

npm run dev
Open:

http://localhost:5173
### Build

npm run build
### Preview Production Build

npm run preview
---

## ⚙️ Configuration

Create a .env file and provide the required API credentials.

VITE_YOUTUBE_API_KEY=your_api_key
If authentication is enabled:

VITE_AUTH_API_URL=your_auth_service
---

## 📖 API

| Endpoint | Description |
|----------|-------------|
| /search | Search YouTube videos |
| /videos | Retrieve video details |
| /channels | Retrieve channel information |

> The application communicates with the YouTube Data API v3 through a centralized Axios client.

## 🔮 Future Improvements

- Unit and integration tests
- Infinite scrolling
- Advanced search filters
- Playlist management
- Favorites and watch history
- Better accessibility (ARIA)
- Docker support
- CI/CD pipeline

---

## 💡 Design Decisions

- Redux Toolkit provides predictable and scalable state management.
- Redux Persist preserves user settings and saved queries across browser sessions.
- React Hook Form simplifies form validation and improves performance.
- Axios centralizes API configuration and request handling.
- The project is organized into reusable components to encourage maintainability and future scalability.

---

## ⭐️ Acknowledgements

- YouTube Data API v3
- React
- Vite
- Ant Design
- Redux Toolkit