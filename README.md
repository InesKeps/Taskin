# TaskIn

A task management app built with React, TypeScript, Redux Toolkit, and Back4App (Parse) as the backend.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **State management:** Redux Toolkit
- **Styling:** Tailwind CSS v4
- **Backend:** Back4App (Parse Server)
- **Forms:** Formik + Yup

## Features

- User authentication (register / login / logout)
- Create, complete, edit, and delete tasks
- Priority levels: High, Medium, Low
- Optional task categories
- Filter by status (All / Active / Completed) and priority
- Per-user data isolation via Parse ACL

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/InesKeps/taskin.git
cd taskin
npm install
```

### 2. Create a Back4App app

1. Go to [back4app.com](https://www.back4app.com) and create a free account
2. Create a new app
3. Go to **App Settings → Security & Keys**
4. Copy your **Application ID** and **JavaScript Key**

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your keys:

```
VITE_PARSE_APP_ID=your_application_id
VITE_PARSE_JS_KEY=your_javascript_key
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Login, Register, Dashboard
├── store/          # Redux slices (auth, tasks)
├── types/          # TypeScript interfaces
└── utils/          # Parse SDK initialization
```

## Deployment

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.  
Make sure to set `VITE_PARSE_APP_ID` and `VITE_PARSE_JS_KEY` as environment variables in your hosting platform.
