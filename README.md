# Seminar on Machine Learning Paradigms

Interactive presentation for a seminar on machine learning paradigms:
- Supervised Learning
- Unsupervised Learning
- Discovery-Based Learning

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Node/Express server bundle for production runtime
- PNPM as package manager

## Project Structure

- `client/` - frontend app and slides
- `server/` - server entry used in production build
- `shared/` - shared types/utilities
- `patches/` - dependency patches used by PNPM

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM 10+

### Install Dependencies

```bash
pnpm install
```

### Run in Development

```bash
pnpm run dev
```

This starts the Vite development server.

### Build for Production

```bash
pnpm run build
```

The build outputs:
- frontend assets to `dist/public`
- server bundle to `dist/index.js`

### Run Production Build

```bash
pnpm run start
```

## Available Scripts

- `pnpm run dev` - start development server
- `pnpm run build` - create production build
- `pnpm run start` - run built server
- `pnpm run preview` - preview built frontend
- `pnpm run check` - TypeScript type-check
- `pnpm run format` - format files with Prettier

## Seminar Notes

- Slide navigation supports keyboard arrows and footer buttons.

## Contributors

- Harsh Dubey (RA2411033010002)
- Mridula Manoj (RA2411033010012)
- Abhiraj Bhowmick (RA2411033010013)
