# UET Explorer

Interactive technical explorer for Ultra Ethernet Transport (UET), built with React, TypeScript, and Vite.

This application visualizes the UET stack as a hierarchical node tree and presents:
- tight one-line summaries in description fields
- full technical depth in longDescription fields
- structured technical facts in techDetails

## Stack

- React 19
- TypeScript 5
- Vite 8
- Framer Motion
- React Router

## Run

Install dependencies:

    npm install

Start development server:

    npm run dev

Default URL:

    http://localhost:5173

## Build

Create production build:

    npm run build

## Key Files

- src/data/uetTree.ts: core UET dataset and hierarchy
- src/pages/LandingPage.tsx: top-level overview and layer entry
- src/pages/NodePage.tsx: detailed node view
- src/components/ThreeScene.tsx: visual scene and layer illustrations

## Data Model

Each node uses:
- id, label, short
- description for compact summary
- longDescription for detailed technical narrative
- techDetails for section-anchored technical bullets
- algorithms, details, and optional children

## Content Status

Spec-enrichment work tracked in the workspace root README is complete:
- all high-priority items completed
- all medium-priority items completed
- final pass done for tight summaries plus full deep technical long descriptions

## Rendering Notes

- Content is rendered as normal text (no LaTeX or KaTeX equation rendering)
- Typography uses modern monospace-first styling
