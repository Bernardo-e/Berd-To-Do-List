# 🐦 Berd's Cozy To-Do List (Cozy Dark Theme Edition)

A beautiful, charming, and highly interactive task manager designed exclusively with a custom **Cozy Dark Theme** aesthetic, smooth spring physics animations, and persistent storage. Crafted with love by **Berd**.

This project provides a delightful and visually calming dark mode productivity workspace, combining subtle micro-interactions, progress analytics, and satisfying confetti rewards upon task completion.

---

## ✨ Features Built by Berd

Every feature in this app was thoughtfully selected and implemented to create the ultimate cozy planning environment:

### 🌌 Dedicated Cozy Dark Theme
*   **Aesthetic Night-sky Palette:** A permanently enabled dark theme using deep violet-grays, soft pastel lavender, mint, coral, and glowing sky blue colors that are extremely gentle on the eyes.
*   **Premium Custom Typography:** Styled using the elegant **Outfit** and **Quicksand** Google Fonts for a soft, friendly reading experience.
*   **Custom Scrollbars:** Rounded, delicate scrollbars that match the dark theme aesthetics perfectly.
*   **No Flicker Load:** Configured to load in dark mode instantly at the document root level.

### 📝 Complete Task Lifecycle (CRUD)
*   **Smart Expandable Form:** A smooth collapsible task creation interface utilizing Framer Motion layout transitions.
*   **Custom Task Attributes:** Create tasks with a:
    *   **Title** (required)
    *   **Detailed description** (optional)
    *   **Due date** (with native date picker trigger)
    *   **Priority Level:** *Mild 🌸*, *Medium ☀️*, or *Spicy 🔥* with distinct color-coded badges.
    *   **Category Tags:** Organize tasks into *Personal 🧸*, *Study 📚*, *Work 💼*, *Health 🍎*, or *Chores 🧹*.
*   **Inline Editing:** Change task descriptions, titles, priority, and due dates dynamically without leaving the list view.
*   **Complete & Delete:** Complete tasks with a click, or delete them cleanly with responsive animations.

### 🌟 Micro-Animations & Celebrations
*   **Confetti Celebration:** Complete any task to trigger a custom, pastel-colored confetti burst powered by `canvas-confetti`!
*   **Spring Physics Transitions:** Powered by `framer-motion` for bouncy lists, card layout appearances, hover zooms, and smooth checkmarks.

### 📈 Smart Progress Tracking
*   **Interactive Stats Card:** Computes and displays **Total**, **Done (Completed)**, and **Left (Pending)** task counts.
*   **Visual Progress Bar:** An animated, gradient-filled progress bar showing your current percentage completion.
*   **Encouraging Captions:** Generates dynamic, cozy words of encouragement (e.g., *"Let's take a deep breath and start with a single, small step! 🌱"*, *"Look at you go! Over halfway there, you're doing amazing! 🌟"*) matching your current progress level.

### 💾 Fully Persistent Storage
*   **Auto-Save:** Powered by a custom React `useLocalStorage` hook to ensure your tasks and checklist statuses remain exactly as you left them, even after closing the browser or refreshing the page.

---

## 🛠️ Tech Stack & Dependencies

*   **Core:** React 19 & Vite (for lightning-fast Hot Module Replacement)
*   **Styling:** Tailwind CSS v4 (configured with CSS `@theme` variables) & Vanilla CSS
*   **Icons:** Lucide React (for smooth, lightweight vector icons)
*   **Animations:** Framer Motion (for physics-based transitions)
*   **Celebration:** Canvas Confetti

---

## 📂 Project Structure

Here is how the project components are structured:

```text
src/
├── components/
│   ├── EmptyState.jsx      # Cozy empty-state illustrations and messages
│   ├── Header.jsx          # App logo, time-greeting manager, and Cozy Dark Mode badge
│   ├── StatsCard.jsx       # Completion progress and dynamic encouragement quotes
│   ├── TaskFilters.jsx     # Tabs for filtering tasks (All, Active, Completed)
│   ├── TaskForm.jsx        # Smart expandable task input with custom fields
│   ├── TaskItem.jsx        # Detailed card for each task, editing, and toggle controls
│   └── TaskList.jsx        # Animated container for organizing active filters
├── hooks/
│   └── useLocalStorage.js  # React hook for seamless state syncing
├── App.jsx                 # Central state coordinator and overall layout grid
├── App.css                 # Base overrides and container stylings
├── index.css               # Google fonts, Tailwind v4 base, and custom color tokens
└── main.jsx                # DOM entry point
```

---

## 🚀 Getting Started

To run Berd's Cozy To-Do List app on your local machine:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Bernardo-e/Berd-To-Do-List.git
    cd Berd-To-Do-List
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open the local address (usually `http://localhost:5173`) in your web browser.

4.  **Build for Production:**
    ```bash
    npm run build
    ```
    Creates a highly optimized `dist` folder ready for deployment.

---

<div align="center">
  <p>Made with 💖 by <b>Berd</b> ✨</p>
</div>
