# 🧱 Microtweet Wall Hackathon

A live-updating 140-character public message board. No login, just post and read.

## ✅ Features (MVP)
- Post short messages (140 char max)
- Optional name field
- Live feed of last 20 messages
- Auto-refresh or manual refresh

---

## 🔧 Tasks

### Backend (API)
- Using `/api/messages.ts`
  - `GET` → Return latest 20 messages
  - `POST` → Validate + store new message

### Frontend
- Show messages (top of page)
- Input form with name + message (bottom)
- POST message to backend
- Refresh list on new post or automatic polling

---

## 🛠️ Hints

- Use `fetch('/api/messages')` for GET and POST
- Use `setInterval` to auto-refresh
