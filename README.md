# ShopMate — Shopping List App

A simple and responsive **Shopping List App** built with **React + TypeScript**, **Redux Toolkit**, **Tailwind CSS**, and **JSON Server**.

This project allows users to register, log in, and manage multiple shopping lists. Each shopping list can contain multiple items that users can add, edit, delete, search, and sort by name or category.

---

## Features

### User Management
- User **Registration** with: name, surname, email, password, and cell number  
- User **Login** with encrypted credentials  
- **Protected routes** — only logged-in users can access home or list pages  
- **Profile page** where users can update their info  
- **Logout** functionality  

### Shopping List Management
- Create, view, edit, and delete shopping lists  
- Each list can have multiple **items** with:
  - Item name  
  - Quantity  
  - Category  
- Search and sort items inside each list  
- Data is stored persistently in a **JSON Server** backend  
- Lists and items update instantly with Redux state management  

### Technical Features
- Built with **React + TypeScript**  
- State managed by **Redux Toolkit**  
- Styled with **Tailwind CSS**  
- Data stored and fetched via **JSON Server**  
- Responsive design for mobile, tablet, and desktop  
- URL reflects search and sort states  

---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React + TypeScript |
| State Management | Redux Toolkit |
| Styling | Tailwind CSS |
| Backend (Mock API) | JSON Server |
| Routing | React Router v6 |

---

## Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/shopping-list-app.git
cd shopping-list-app
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start the Backend and Frontend

**Option A — One command (recommended for testing):**
```bash
npm run dev:all
```
This starts both the JSON Server (port 5000) and the React app (port 5173).

**Option B — Two terminals:**
```bash
# Terminal 1: start the API
npm run server

# Terminal 2: start the app
npm run dev
```

### 4️⃣ Open the App


The app runs at:
 http://localhost:5173
The JSON API runs at:
 http://localhost:5000

 Folder Structure
src/
 ├── pages/
 │   ├── LoginPage.tsx
 │   ├── RegisterPage.tsx
 │   ├── HomePage.tsx
 │   ├── ListDetailsPage.tsx
 │   ├── ProfilePage.tsx
 │
 ├── redux/
 │   ├── store.ts
 │   ├── userSlice.ts
 │   ├── listSlice.ts
 │
 ├── App.tsx
 ├── main.tsx
 ├── index.css
