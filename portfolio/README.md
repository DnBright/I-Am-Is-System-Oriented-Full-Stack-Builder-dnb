# System-Oriented Engineer Portfolio

A premium, full-stack portfolio designed for system architects. Built with Next.js, Tailwind CSS, and real-time GitHub integration.

## 🚀 Local Setup

Follow these steps to synchronize the system and run it locally:

### 1. Requirements
- Node.js 18+ 
- npm / yarn / pnpm

### 2. Configuration
The system requires connection to the GitHub API. 
1. Copy the environment template:
   ```bash
   cp .env.local.example .env.local
   ```
2. Open `.env.local` and configure your credentials:
   - `GITHUB_TOKEN`: Generate a **Personal Access Token (classic)** on GitHub with `repo` and `read:user` scopes.
   - `GITHUB_USERNAME`: Your GitHub handle (e.g., `DnBright`).

### 3. Installation
Install all required dependencies:
```bash
npm install
```

### 4. Initialization
Launch the development server:
```bash
npm run dev
```

The system will be accessible at: [**http://localhost:3000**](http://localhost:3000)

## 🏗 Core Architecture

- **App Router**: Leveraging React Server Components for optimal performance.
- **Real-time Data**: Direct integration with GitHub Events API.
- **Analytics Engine**: Custom logic for calculating coding patterns and consistency.
- **Premium UI**: Dark-themed dashboard aesthetic with Framer Motion animations.

## 📊 Available Routes

- `/` - System Overview
- `/projects` - Technical Case Studies
- `/live` - Real-time Command Center
- `/analytics` - Performance Metrics
- `/try` - Interactive Simulation
- `/about` - Engineering Philosophy

---
**Status**: `READY_FOR_DEPLOYMENT`
