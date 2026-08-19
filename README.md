<div align="center">

  # ⚡ VIDHI AGRAWAL — PORTFOLIO ⚡
  ### *Interactive Brutalist & Kinetic Web Experience*

  [![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
  [![GSAP](https://img.shields.io/badge/GSAP-3.15-00E676?style=for-the-badge&logo=greensock&logoColor=black)](https://greensock.com/gsap/)
  [![Three.js](https://img.shields.io/badge/Three.js-r185-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
  [![License](https://img.shields.io/badge/License-MIT-D4FF00?style=for-the-badge)](./LICENSE)

  <p align="center">
    <strong>A high-impact, interactive developer portfolio blurring the boundary between software engineering and digital art.</strong>
  </p>

  [🌐 Explore Live Portfolio](#) • [💻 View Projects](#-featured-projects) • [📬 Get In Touch](#-contact--connect)

</div>

---

## 🌟 Overview

Welcome to the official repository for **Vidhi Agrawal's Developer Portfolio**. 

Built with **React 19**, **Vite**, **Tailwind CSS v4**, **GSAP**, and **Three.js**, this portfolio deviates from traditional static templates. It embraces a **brutalist kinetic playground** philosophy featuring draggable interactive UI modules, fluid WebGL fluid cursor physics, 3D magnetic card tilts, and a cyberpunk CLI interactive terminal.

### 🎨 Design Philosophy
- **Brutalist Precision**: High-contrast dark mode palette (`#050507` base with `#D4FF00` neon accents and cyan telemetry tones).
- **Interactive Playground**: Every hero component is a physically draggable object with dynamic z-index depth sorting.
- **Fluid & Kinetic Motion**: Smooth 120 FPS WebGL splash physics, GSAP entrance timelines, and 3D magnetic hover vectors.
- **Cyberpunk Telemetry**: A custom interactive terminal module supporting real-time user transmission dispatches and live view counter tracking.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **🕹️ Interactive Drag Playground** | Drag floating project cards and code chips freely across the screen with smooth position tracking and double-click navigation. |
| **🌊 WebGL Hydrodynamic Splash** | Custom WebGL fluid simulation cursor active on the hero section, responding dynamically to mouse speed and velocity. |
| **🎴 3D Magnetic Tilt Cards** | Internship experience cards with real-time 3D tilt perspective calculation, neon corner indicators, and cyber text glitch scramble effects. |
| **💻 Cyberpunk CLI Terminal** | Full-screen terminal environment allowing visitors to dispatch contact messages, check analytics, and execute CLI commands (`exit`, `projects`, `about`). |
| **📱 100% Mobile Responsive** | Adaptive layout engine optimizing WebGL shaders, marquee tickers, and drawer navigation for mobile and desktop screens. |
| **🚀 Sub-Second Performance** | Optimized asset pipelines, code splitting, and direct DOM mutation hooks ensuring lightning-fast initial load times. |

---

## 🛠️ Tech Stack & Architecture

### **Frontend Core & Frameworks**
- **React 19** (`react`, `react-dom`): UI Component Architecture
- **React Router 8** (`react-router`): Client-Side Routing & Navigation
- **Vite 7** (`vite`): Next-Gen Lightning Fast Build Tooling

### **Animation & Graphics**
- **GSAP 3** (`gsap`): High-Performance Timeline Animations & Entrance Sequences
- **Three.js** (`three`): WebGL 3D Rendering Engine & Kinetic Shaders
- **Lucide React** (`lucide-react`): Crisp SVG Icon System

### **Styling & Design System**
- **Tailwind CSS v4** (`tailwindcss`, `@tailwindcss/vite`): Modern Utility-First CSS Engine
- **Custom Typography**: `Syne` (Display Headlines) & `JetBrains Mono` (Code & Telemetry)

---

## 🚀 Featured Projects

| Project | Description | Tech Stack | Links |
| :--- | :--- | :--- | :--- |
| **👁️ SIPVision** | AI-powered Computer Vision & Real-time Telemetry Suite processing live video feeds with 30ms object detection. | React, Next.js, Tailwind CSS | [Live Demo](https://sip-vision.vercel.app) • [GitHub](https://github.com/Codomania-Legends/SIPVision.git) |
| **🎓 EnzoSkills** | Interactive Skill Development & Collaborative Learning Platform tracking node progress and live code sandbox execution. | React, Next.js, Tailwind CSS | [Live Demo](https://enzo-skills.vercel.app) • [GitHub](https://github.com/Codomania-Legends/EnzoSkills.git) |
| **🔀 ContriZee** | Open-source contribution tracking & instant UPI settlement system automating pull-request reviews. | React, TypeScript, MongoDB | [Live Demo](https://contri-zee.vercel.app) • [GitHub](https://github.com/Codomania-Legends/ContriZee.git) |
| **📄 CraftRume** | Dynamic ATS-friendly resume builder with dual-pane real-time PDF generation and modular template engine. | React, Tailwind CSS, Vite | [Live Demo](https://craft-rume.vercel.app) • [GitHub](https://github.com/VidhiAgrawa/Craft-Rume.git) |

---

## 📂 Project Structure

```bash
Portfolio/
├── public/                      # Static assets & PDF documents
│   ├── Completion-Certificate.pdf
│   ├── Offer-letter.pdf
│   ├── Contrizee/
│   ├── Craftrume/
│   ├── Enzoskills/
│   └── Sipvision/
├── src/
│   ├── MainComponents/          # Main application page modules
│   │   ├── About-me/            # Interactive Bio & Tech Matrix page
│   │   ├── Experience/          # Internship Experience & 3D Cards page
│   │   ├── HomePage/            # Hero Kinetic Playground & Main Showcase
│   │   ├── Project/             # Project Grid & Detail View Modal
│   │   └── Terminal/            # Cyberpunk CLI Contact Terminal
│   ├── Utilities/               # Reusable UI Components & Shaders
│   │   ├── CodeChip.jsx         # Draggable Code Chip Component
│   │   ├── FloatingCard.jsx     # Draggable Interactive Card Component
│   │   ├── Loading.jsx          # Initial Boot Loading Screen
│   │   ├── Navbar.jsx           # Responsive Fixed Glass Navbar
│   │   └── SplashCursor.jsx     # WebGL Fluid Physics Simulation
│   ├── App.jsx                  # Main Route Definitions & Initial Load Guard
│   ├── App.css                  # Global Utilities & Animations
│   ├── index.css                # Base Design Tokens & Font Imports
│   └── main.jsx                 # Application Entry Point
├── package.json                 # Dependencies & Build Scripts
├── vite.config.js               # Vite Configuration
└── README.md                    # Project Documentation
```

---

## ⚙️ Getting Started & Local Development

Follow these steps to set up and run the portfolio locally on your machine:

### Prerequisites
Make sure you have **Node.js** (v18.0 or higher) and **npm** installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VidhiAgrawa/Portfolio.git
   cd Portfolio
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 👩‍💻 About The Developer

**Vidhi Agrawal** is a Full Stack Developer and Creative Frontend Engineer pursuing a **B.Tech in Computer Science** (Specialization in Full Stack Development & Blockchain) at *Shri Vaishnav Vidhyapeeth Vishwavidyalaya*. 

With hands-on experience as a **Developer Intern at Abreonix**, she specializes in crafting fast, performant web applications paired with strong core computer science fundamentals in Java and Data Structures & Algorithms.

---

## 📬 Contact & Connect

Feel free to reach out for collaborations, project inquiries, or software developer opportunities!

- **GitHub**: [@VidhiAgrawa](https://github.com/VidhiAgrawa)
- **LinkedIn**: [Vidhi Agrawal](https://www.linkedin.com/in/vidhiagrawa/)
- **LeetCode**: [Vidhi_Agrawal_](https://leetcode.com/u/Vidhi_Agrawal_/)
- **Email**: [vidhi.agrawal.tech@gmail.com](mailto:vidhi.agrawal.tech@gmail.com)

---

<div align="center">
  <sub>Engineered with ⚡ by <strong>Vidhi Agrawal</strong></sub>
</div>
