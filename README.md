# Machine Learning Paradigms

> An AI Seminar presentation exploring the three foundational paradigms of machine learning — Supervised, Unsupervised, and Discovery-Based Learning — with animated 3D visualisations and real-world case studies.

---

## Authors

| Name | Roll Number |
|---|---|
| Harsh Dubey | RA2411033010002 |
| Mridula Manoj | RA2411033010012 |
| Abhiraj Bhowmick | RA2411033010013 |

---

## About

This is an interactive web-based presentation (20 slides) built with React + Vite. It covers the three core machine learning paradigms — from the fundamentals of supervised label-driven training, through unsupervised pattern discovery, to discovery-based exploratory inquiry — with real-world case studies and code examples for each.

Each paradigm section contains a **live, animated 3D Canvas visualisation** rendered entirely with the HTML5 Canvas 2D API and a custom perspective-projection engine (no Three.js).

---

## Slide Overview

| # | Title | Key Concepts |
|---|---|---|
| 1 | **Title Slide** | Introduction |
| 2 | **What is Machine Learning?** | Core goal, pattern recognition, key capabilities |
| 3 | **The Three Paradigms** | Overview of Supervised, Unsupervised, Discovery-Based |
| 4 | **Supervised Learning** | Learning with a teacher, labeled data, decision boundary |
| 5 | **Supervised: Code Example** | Linear Regression, scikit-learn, real estate prediction |
| 6 | **Supervised: Real-World Case Study** | Real estate price prediction, XGBoost, Zillow/Redfin/Opendoor |
| 7 | **Supervised: Types & Algorithms** | Classification vs Regression, algorithm families |
| 8 | **Supervised: Advantages & Limitations** | Trade-offs, key insight |
| 9 | **Unsupervised Learning** | Discovering patterns without guidance, K-Means |
| 10 | **Unsupervised: Code Example** | K-Means Clustering, customer segmentation |
| 11 | **Unsupervised: Real-World Case Study** | E-commerce customer segmentation, Amazon/Spotify/Netflix |
| 12 | **Unsupervised: Techniques & Algorithms** | Clustering, Dimensionality Reduction, PCA, t-SNE |
| 13 | **Unsupervised: Advantages & Limitations** | Trade-offs, key insight |
| 14 | **Discovery-Based Learning** | Self-directed exploration, knowledge graph traversal |
| 15 | **Discovery: Code Example** | EDA, pandas, correlation matrices |
| 16 | **Discovery: Real-World Case Study** | Drug interaction discovery, DeepMind/NASA/Google Brain |
| 17 | **Discovery: Applications & Methods** | EDA, KDD, scientific discovery, problem-solving |
| 18 | **Discovery: Advantages & Limitations** | Trade-offs, key insight |
| 19 | **Comparison: All Three Paradigms** | Side-by-side: data type, guidance, goal, cost, accuracy |
| 20 | **Choosing the Right Paradigm** | Decision framework, workflow integration |

---

## Algorithms & Concepts Covered

- **Supervised Learning** — Linear Regression, Logistic Regression, Decision Trees, Random Forest, SVM, Gradient Boosting (XGBoost), Neural Networks
- **Unsupervised Learning** — K-Means, Hierarchical Clustering, DBSCAN, Gaussian Mixture Models
- **Dimensionality Reduction** — PCA, t-SNE, Autoencoders, UMAP
- **Discovery-Based Learning** — Exploratory Data Analysis (EDA), Knowledge Discovery in Databases (KDD), Neural Architecture Search
- **Evaluation Metrics** — R², RMSE, MAPE, Silhouette Score, Elbow Method

---

## Live 3D Visualisations

| Component | Slide | What it shows |
|---|---|---|
| `SupervisedViz` | 4 | Labeled scatter in 3D — blue/orange class points, rotating decision boundary plane |
| `UnsupervisedViz` | 9 | K-Means in 3D — three colour-coded clusters with pulsing centroid markers and membership lines |
| `DiscoveryViz` | 14 | Knowledge graph exploration — nodes progressively discovered with burst animations and connecting edges |

All visualisations:
- Use a custom `project(x, y, z, rotX, rotY, cx, cy, fov)` perspective-projection function
- Sort all draw calls by depth (z-value) for correct occlusion
- Animate with `requestAnimationFrame` using delta-time based rotation
- Use a seeded LCG random number generator for deterministic, reproducible layouts

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 + TypeScript |
| Bundler | Vite 7 |
| Styling | Tailwind CSS 4 |
| 3D Visualisations | HTML5 Canvas 2D API (custom projection) |
| Routing | Wouter |
| Icons | Lucide React |
| Package manager | pnpm |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Install dependencies

```bash
pnpm install
```

### Run dev server

```bash
pnpm run dev
```

The presentation will be available at `http://localhost:5173` (or the port shown in your terminal).

### Build for production

```bash
pnpm run build
```

### Preview production build

```bash
pnpm run preview
```

### Type-check

```bash
pnpm run check
```

---

## Project Structure

```
ml-paradigms-seminar/
├── client/
│   └── src/
│       ├── components/
│       │   ├── ML3DVisualizations.tsx  # SupervisedViz, UnsupervisedViz, DiscoveryViz
│       │   ├── ErrorBoundary.tsx
│       │   ├── Map.tsx
│       │   └── ui/                    # Shared Radix UI components
│       ├── pages/
│       │   └── Home.tsx               # All 20 slides + navigation logic
│       └── index.css
├── server/
│   └── index.ts                       # Express dev/production server
├── shared/                            # Shared types/utilities
├── patches/                           # PNPM dependency patches
├── vite.config.ts
└── package.json
```

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm run dev` | Start the Vite development server |
| `pnpm run build` | Build frontend + bundle server for production |
| `pnpm run start` | Run the production server (`dist/index.js`) |
| `pnpm run preview` | Preview the built frontend |
| `pnpm run check` | TypeScript type-check (no emit) |
| `pnpm run format` | Format all files with Prettier |
