# 🗂️ Kanban Board

A modern, responsive **Kanban Board** built with **Next.js**, **TypeScript**, **TailwindCSS**, **Redux Toolkit**, and **dnd-kit** for smooth drag-and-drop interactions.

This project allows you to manage tasks visually by organizing them into customizable columns such as **To Do**, **In Progress**, and **Done**. Cards can be reordered within a column or moved across columns — all with beautiful animations and mobile responsiveness.

---

## 🚀 Features

- **Drag & Drop** with `@dnd-kit/core` for moving cards between columns or reordering within the same column.
- **Redux Toolkit** for state management.
- **Responsive Design** using TailwindCSS — works on desktop and mobile.
- **Customizable Columns** — define any number of columns in `kanbanSlice`.
- **Card Details** including:
  - Priority tags (Low, Medium, High, Completed)
  - Optional description
  - Team member avatars
  - Comment and file counters
- **Smooth Animations** when dragging and dropping.
- **Persistent State (optional)** — can be configured to save to `localStorage` or API.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Drag & Drop:** [dnd-kit](https://docs.dndkit.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Images:** [next/image](https://nextjs.org/docs/pages/api-reference/components/image)

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/kanban-board.git

# Navigate to project directory
cd kanban-board

# Install dependencies
npm install

# or
yarn install
