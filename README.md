# UET Explorer

> **Enterprise-Grade Interactive Technical Architecture Visualizer for Ultra Ethernet Transport — The Next-Generation Network Protocol Reimagining High-Performance Distributed Systems**

<div align="center">

[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC%20BY--ND%204.0-blue.svg)](https://creativecommons.org/licenses/by-nd/4.0/)
[![Tech Stack: React 19 + TypeScript + Vite](https://img.shields.io/badge/Built%20With-React%2019%20%2B%20TypeScript%20%2B%20Vite-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![UEC Specification: v1.0.2](https://img.shields.io/badge/UEC%20Spec-v1.0.2-009688?logo=linux)](https://www.ueconference.org)
[![Linux Foundation Project](https://img.shields.io/badge/Linux%20Foundation-Steward-FCC624?logo=linux%20foundation&logoColor=white)](https://www.linuxfoundation.org)
[![Built for AI/HPC](https://img.shields.io/badge/Workload-AI%2FHPC%2FMLCOMM-FF6B6B?logo=nvidia&logoColor=white)](https://ueconference.org)
[![Deployment: Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![Node Requirements](https://img.shields.io/badge/Node-18.0%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Bundle Size](https://img.shields.io/badge/Bundle-511%20kB%20%28163%20kB%20gzip%29-green)](.)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)

**[Live Demo](https://uetexplorer.vercel.app/) · [Read the Spec](https://ueconference.org/specifications) · [GitHub](https://github.com/Necromancer0912/UET-Explorer) · [Discussions](https://github.com/Necromancer0912/UET-Explorer/discussions)**

</div>

---

## Comprehensive Table of Contents

### Core Sections

- [Executive Overview](#-executive-overview)
- [What is Ultra Ethernet Transport?](#-what-is-ultra-ethernet-transport-uet)
- [Feature Showcase](#-feature-showcase)
- [System Architecture](#-system-architecture)
- [Complete Tech Stack](#-complete-tech-stack)

### Getting Started

- [Quick Start Guide](#-quick-start-guide)
- [Detailed Installation](#-detailed-installation)
- [Development Environment Setup](#-development-environment-setup)
- [Running Examples](#-running-examples)

### Development & Advanced

- [Development Workflow](#-development-workflow)
- [Code Structure & Organization](#-code-structure--organization)
- [Component Development Guide](#-component-development-guide)
- [Data Model & State Management](#-data-model--state-management)
- [Advanced Configuration](#-advanced-configuration)
- [Performance Optimization](#-performance-optimization)

### Technical Deep Dives

- [UET Protocol Deep Dive](#-uet-protocol-deep-dive)
- [Complete Resource Library](#-complete-resource-library)
- [Component Reference Documentation](#-component-reference-documentation)
- [Comprehensive FAQ](#-comprehensive-faq)

### Contributing & Community

- [Contributing Guidelines](#-contributing-guidelines)
- [Licensing & Legal](#-licensing--legal)
- [Acknowledgments](#-acknowledgments)

---

## Overview

**UET Explorer** is an interactive, visually-rich web application that demystifies the Ultra Ethernet Transport (UET) protocol stack. It serves as:

- **Educational Tool**: Learn the UET architecture through hierarchical visual exploration
- **Technical Reference**: Deep-dive into each layer with comprehensive technical documentation
- **Architecture Visualizer**: See how components interact within the 5-layer model
- **Interactive Dashboard**: Expand/collapse component groups, drill down into specifications

Designed for **network engineers**, **systems architects**, **hardware designers**, and **ML platform teams** working with AI cluster networking.

---

## What is Ultra Ethernet Transport?

### The Problem It Solves

Traditional networking stacks (TCP/IP, even RDMA) were designed for **general-purpose computing**:

- Kernel context switching overhead (microseconds)
- Slow-start congestion control (milliseconds for AI training)
- Connection setup costs (hundreds of microseconds)
- Head-of-line blocking in packet loss scenarios
- Single-path routing (cannot exploit multi-path Clos fabrics)

**Modern AI & HPC demands:**

- Sub-microsecond latency (needed for synchronized GPU training)
- 400+ Gbps throughput per NIC
- Nanosecond-scale credit-based congestion control
- Per-packet multipath spraying across leaf-spine fabrics
- Native RDMA with hardware memory management

### UET's Solution

**Ultra Ethernet Transport** is a revolutionary Layer 4 protocol by the Ultra Ethernet Consortium (UEC) that executes the **entire transport stack inside the Network Interface Card (NIC)**:

```
┌─────────────────────────────────────────────────────┐
│ Application (PyTorch, NCCL, MPI, JAX)               │
├─────────────────────────────────────────────────────┤
│ Libfabric v2.0 (OFI Provider) — User-Space          │
├─────────────────────────────────────────────────────┤
│ UET NIC Driver (Control Path Only)                  │
├─────────────────────────────────────────────────────┤
│ NIC ASIC (SES + PDS + CMS + TSS)      <<< FAST PATH │
│ ├─ Session Establishment Sublayer (SES)             │
│ ├─ Programmable Data Sublayer (PDS)                 │
│ ├─ Congestion Management Sublayer (CMS)             │
│ └─ Transport Security Sublayer (TSS)                │
├─────────────────────────────────────────────────────┤
│ IEEE 802.3 Ethernet (Standard PHY/MAC)              │
└─────────────────────────────────────────────────────┘
```

**Key Achievement**: **Zero-copy, sub-microsecond latency** without kernel involvement.

---

## Features

### Interactive Architecture Tree

- **Hierarchical Expansion**: Click to expand/collapse component groups
- **Visual Hierarchy**: Depth-coded grayscale shading for layer visualization
- **Connector Lines**: Tree structure lines showing parent-child relationships
- **Badge Counts**: See child component count per group at a glance

### Multi-Level Documentation

Each component provides three levels of detail:

1. **Short Description** (1-2 lines): Quick overview
2. **Long Description** (full paragraph): Technical context and design rationale
3. **Technical Details** (structured facts): Implementation specifics, algorithms, and standards

### Modern UI/UX

- Responsive design (desktop to tablet)
- Smooth expand/collapse animations (Framer Motion)
- Dark-friendly grayscale palette
- Component navigation via React Router
- 3D visual accents (Three.js scenes for layer visualization)

### Direct Navigation

Click any component name to jump to its detailed specification page with:

- Full technical documentation
- System diagrams
- Related components
- Standard references (IEEE, IETF, UEC)

### Mobile Optimized

- Responsive layout adapts to all screen sizes
- Touch-friendly expand/collapse controls
- Readable typography on small screens

---

## Architecture

### Application Structure

```
┌─────────────────────────────────────────────────────────┐
│ Production Build                                        │
│ (Vercel | Next.js Export | Docker Container)            │
└─────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────┐
│ React Application Layer                                 │
│ ├─ App.tsx (Main Router + Layout)                       │
│ ├─ main.tsx (Entry Point + Hydration)                   │
│ └─ index.css (Global Styles)                            │
└─────────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────┬──────────────────────┐
│ Pages (Route Handlers)           │ Config & Build       │
│ ├─ LandingPage.tsx               │ ├─ package.json      │
│ │  └─ Hero + Hierarchy Tree      │ ├─ vite.config.ts    │
│ └─ NodePage.tsx                  │ ├─ tsconfig.json     │
│    └─ Spec Details View          │ └─ vercel.json       │
└──────────────────────────────────┴──────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────┐
│ Components (Reusable UI Modules)                        │
│ ├─ MindTreeViewer.tsx    ◄─── Interactive Hierarchy     │
│ ├─ ThreeScene.tsx        ◄─── 3D Layer Visualizations   │
│ ├─ Navbar.tsx            ◄─── Navigation Header         │
│ ├─ SpecificationLinks.tsx ◄─── UEC Spec Downloads       │
│ └─ Footer.tsx            ◄─── Site Footer               │
└─────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────┐
│ Data Layer                                              │
│ ├─ uetTree.ts  (1000+ lines)                            │
│ │  └─ Complete UET Component Tree (Recursive Structure) │
│ └─ assets/ (Images, Icons)                              │
└─────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────┐
│ Static Assets                                           │
│ └─ public/                                              │
│    └─ illustrations/  (SVG Files)                       │
└─────────────────────────────────────────────────────────┘
```

### Data Model: `uetTree.ts`

The entire UET architecture is modeled as a recursive tree structure with multi-level documentation. Every component includes:

- **id**: Unique identifier
- **label**: Display name
- **description**: 1-2 line summary
- **longDescription**: Full technical paragraph (200+ words)
- **techDetails**: Structured facts array
- **algorithms**: Named algorithms and techniques
- **children**: Nested child components (recursive)

---

## Tech Stack

| Layer               | Technology    | Version | Purpose                  |
| ------------------- | ------------- | ------- | ------------------------ |
| **UI Framework**    | React         | 19.2.4  | Component-based UI       |
| **Language**        | TypeScript    | 5.x     | Type-safe development    |
| **Build Tool**      | Vite          | 8.0.1   | Lightning-fast dev/build |
| **Styling**         | Tailwind CSS  | 4.2.2   | Utility-first CSS        |
| **Animation**       | Framer Motion | 12.38.0 | Smooth transitions       |
| **Routing**         | React Router  | 7.13.1  | Client-side navigation   |
| **3D Graphics**     | Three.js      | 0.183.2 | 3D layer visualizations  |
| **Package Manager** | npm           | 10.x    | Dependency management    |
| **Deployment**      | Vercel        | Latest  | Serverless hosting       |

---

## Getting Started

### Prerequisites

- **Node.js** 18.0+ (includes npm)
- **Git** for version control
- **macOS / Linux / Windows** (cross-platform)

### Installation

```bash
# Clone the repository
git clone https://github.com/Necromancer0912/UET-Explorer.git
cd UET-Explorer

# Install dependencies
npm install

# Verify installation
npm run build  # Should succeed with 0 errors
```

### Quick Start (Dev Mode)

```bash
# Start the development server
npm run dev

# Output:
#   ➜  Local:   http://localhost:5173/
#   ➜  press h to show help

# Open in browser: http://localhost:5173/
```

---

## Development

### Project Scripts

```bash
# Development server (with HMR)
npm run dev

# Production build (optimized, 511 kB bundle)
npm run build

# Preview production build locally
npm run preview

# Run ESLint checks
npm run lint

# Type checking only
npx tsc --noEmit
```

### Build Output

```
✓ 431 modules transformed
dist/index.html              0.77 kB │ gzip: 0.41 kB
dist/assets/index-*.css     10.81 kB │ gzip: 2.98 kB
dist/assets/index-*.js     511.54 kB │ gzip: 163.96 kB
✓ built in 250ms
```

### Adding New Components to the Tree

To add a new component to the UET hierarchy:

1. **Edit** `src/data/uetTree.ts`
2. **Add node** to appropriate parent's `children` array
3. **Component appears** automatically in tree UI — no component code changes needed!

---

## UET Technical Deep Dive

### The 5-Layer UET Model

UET defines a complete networking stack across 5 layers:

#### 1. **Software Layer**

**Responsibility:** Application interface, job isolation, kernel bypass

- **Libfabric OFI Provider**: Zero-copy user-space WQE posting
- **Memory Registration**: DMA buffer pinning
- **JobID Authorization**: Per-job security tokens (64-bit)
- **Elimination of kernel context switching** on hot path

#### 2. **Transport SES** (Session Establishment Sublayer)

**Responsibility:** QP creation, handshake protocol, endpoint discovery

- **5-Message Handshake**: INIT → INIT_ACK → SETUP → SETUP_ACK → CONFIRM
- **Hardware Offload**: All processed by NIC ASIC
- **SYN Cookie Protection**: Handshake DoS defense
- **MTU Negotiation**: Aligned segment sizes

#### 3. **Transport PDS** (Programmable Data Sublayer)

**Responsibility:** Packet transmission, reception, memory coherency

- **TX Queue**: Work Queue Elements for send/write/read
- **RX Queue**: Completion Queue Elements for events
- **Memory Regions**: Tagged memory with permissions
- **Wire Protocol**: UET-specific packet format

#### 4. **Transport CMS** (Congestion Management Sublayer)

**Responsibility:** Buffer availability, traffic control, fairness

**Algorithms:**

- **NSCC** (Network-Signaled CC)
- **RCCC** (Receiver Credit CC)
- **CSIG** (Congestion Signaling)
- **PCM** (Programmable CC)

#### 5. **Transport TSS** (Transport Security Sublayer)

**Responsibility:** Authentication, encryption, integrity

- **HMAC-SHA256**: Per-packet authentication
- **AES-GCM**: Optional encryption
- **JobID Binding**: Packet security tokens
- **Hardware acceleration**: Full line-rate security

---

### UET vs Competing Protocols

| Feature           | TCP       | RoCEv2         | InfiniBand     | UET             |
| ----------------- | --------- | -------------- | -------------- | --------------- |
| **Kernel Bypass** | ❌ No     | ✅ Yes         | ✅ Yes         | ✅ Yes          |
| **Latency**       | 10-100 μs | 1-5 μs         | 0.5-2 μs       | **0.5-1 μs**    |
| **Congestion**    | RTT-based | Credit-based   | Credit-based   | **Hardware ns** |
| **Multipath**     | ECMP      | ❌ No          | Ring/Tree      | **Per-packet**  |
| **Open Std**      | ✅ IETF   | ⚠️ Proprietary | ⚠️ Proprietary | ✅ **UEC/LF**   |
| **RDMA Native**   | ❌ No     | ✅ Yes         | ✅ Yes         | ✅ **Hardware** |

---

## Resources & References

### Official Documentation

- [Ultra Ethernet Consortium](https://ueconference.org/)
- [UEC Specification v1.0.2](https://ueconference.org/specifications)
- [Linux Foundation](https://www.linuxfoundation.org/)
- [UEC White Papers](https://ueconference.org/resources/whitepapers)

### Implementation References

- [Libfabric (OFI)](https://ofiwg.github.io/libfabric/)
- [NCCL](https://github.com/NVIDIA/nccl)
- [PyTorch Distributed](https://pytorch.org/docs/stable/distributed.html)
- [OpenMPI](https://www.open-mpi.org/)

---

## FAQ

**Q: Is UET production-ready?**
A: Yes. Specification v1.0 released June 2025. NVIDIA/AMD shipping UET NPUs in 2026.

**Q: Does UET replace RoCE?**
A: No. UET replaces TCP, not RoCE. Coexistence: RoCE for legacy, UET for AI/HPC.

**Q: What's the latency improvement?**
A: UET ~0.5-1 μs vs TCP ~10-100 μs. **100x faster**.

**Q: Do I need kernel changes?**
A: No. All hot-path ops bypass kernel via NIC ASIC.

**Q: What's included in the repository?**
A: Complete UET Explorer source. Build, test, and deploy locally or on Vercel.

---

## Contributing

We welcome contributions! Areas of interest:

- Expanded documentation
- UI improvements & dark mode
- Internationalization
- Protocol diagrams
- Unit tests
- Bug fixes

---

## License

**Code:** MIT License (modify, commercial use allowed)

**UET Specification Reference:** CC BY-ND 4.0 (attribution required; no derivatives)

---

## Acknowledgments

- **Ultra Ethernet Consortium** — Protocol design & standardization
- **Linux Foundation** — Governance & stewardship
- **React, Vite, TypeScript** — Amazing tools
- **Network engineers worldwide** — Pushing HPC boundaries

---

**Built for the next generation of high-performance networks.**

**[Visit Live Site](https://uetexplorer.vercel.app/) · [GitHub Repo](https://github.com/Necromancer0912/UET-Explorer) · [UEC Specifications](https://ueconference.org)**

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
