export const projectsData = {
  "AirMouse3D": {
    title: "AirMouse3D",
    description: "3D Air Mouse Using Smartphone Motion Sensors",
    tech: ["Rust", "Python", "Firebase", "Kotlin", "Android Sensor API"],
    content: `
# 3D Air Mouse Using Smartphone Motion Sensors

## Project Overview
The **3D Air Mouse** project enables a smartphone to act as a wireless mouse for a PC using built-in motion sensors. Instead of traditional mouse hardware, the system captures hand movements via the phone’s gyroscope and accelerometer and translates them into real-time cursor movements and mouse actions on a computer.

The project uses a **session-based pairing mechanism** and **Firebase Realtime Database** for communication between the mobile device and the PC. A Rust-based PC receiver listens to motion updates and controls the cursor using operating system–level APIs.

## Objectives
* Replace traditional mouse input with motion-based control
* Enable touch-free and portable PC interaction
* Implement real-time motion data synchronization
* Design a session-based pairing system without Bluetooth
* Demonstrate cross-platform system-level programming

## System Architecture
### High-Level Flow
\`\`\`
Smartphone Sensors
        ↓
Firebase Realtime Database (Session ID)
        ↓
PC Receiver (Rust)
        ↓
OS-Level Mouse Control
\`\`\`

## Technology Stack
### Mobile Application
* Platform: Android
* Language: Kotlin
* APIs: Android Sensor API

### Cloud / Backend
* Firebase Realtime Database
* JSON-based data exchange

### PC Receiver
* Language: Rust
* Networking: reqwest (Firebase REST API)
* Async Runtime: tokio
* OS Control: enigo
    `
  },
  "GenuineGate": {
    title: "GenuineGate",
    description: "Real-time anti-scalping bot protection MVP",
    tech: ["Go", "Redis", "Nginx", "JavaScript", "Gin"],
    content: `
# GenuineGate
> **Real-time anti-scalping bot protection MVP**  
> Detect automated bots during high-traffic product drops using behavioral analysis

**Architecture:** Browser Tracker → Nginx → Go API → Redis → Admin Dashboard

## What It Does
GenuineGate protects checkout flows by analyzing user behavior in real-time:
- Captures mouse movements, clicks, scrolls, and visibility
- Assigns risk scores (0-100) based on bot-like patterns
- Blocks high-risk sessions (>80), delays suspicious ones (50-80)
- Provides real-time admin dashboard for monitoring

## Risk Model
- Heuristics: low interaction volume, low click-interval entropy, unrealistic timing bursts, rapid request frequency, fingerprint instability.
- Decision engine: score > 80 → block; 50–80 → delay; < 50 → allow. Scores stored in Redis with TTL.

## Tech Stack
- **Backend**: Go (Gin framework)
- **Store**: Redis
- **Proxy**: Nginx (Rate limiting & Load balancing)
- **Frontend**: Plain JS Tracker + HTML Admin Dashboard
    `
  },
  "MachineGuard": {
    title: "MachineGuard",
    description: "AI-powered industrial monitoring platform",
    tech: ["Kotlin", "Python", "MQTT", "Firebase", "IoT", "Jetpack Compose"],
    content: `
# Machine-Guard-AI
An AI-powered, sustainable industrial monitoring platform combining IoT, machine learning, and autonomous decision-making.

## Project Overview
Machine-Guard-AI is an end-to-end industrial intelligence system designed to transform industries from reactive monitoring to autonomous, predictive, and sustainable operations.

The platform integrates:
- **IoT Hardware**: ESP32-based real-time sensing (temperature, vibration, gas, power)
- **Backend Services**: Scalable Flask API with MQTT ingestion and data storage
- **Machine Learning**: Unsupervised anomaly detection and digital twin prediction
- **Mobile Application**: Native Android app with real-time monitoring and AI insights

## Core Capabilities
### AI-Driven Anomaly Detection
- Unsupervised ML models learn normal machine behavior
- Detect unusual patterns without static thresholds
- Machine-specific fine-tuning without full retraining

### Autonomous Actions
- Early alerts and risk scoring
- Load control and safety shutdowns
- Gas and thermal hazard response
    `
  },
  "MicroDet": {
    title: "MicroDet",
    description: "Lightweight Drone-Based Object Detection",
    tech: ["PyTorch", "TensorRT", "TinyGrad", "OpenCV"],
    content: `
# MicroDet – Lightweight Drone-Based Object Detection
A lightweight, anchor-free object detection system built using MicroDet, optimized for aerial / drone imagery.

## Executive Summary
MicroDet delivers efficient, anchor-free person detection for drone imagery with a practical train-validate-infer pipeline.
The repository is designed for experimentation speed, stable training behavior, and deployment-friendly inference.

## Model Overview
MicroDet is a one-stage, anchor-free detector designed for speed and efficiency.

### Architecture
- **Backbone**: Lightweight CNN for feature extraction
- **Neck**: Multi-scale feature aggregation
- **Head**: Classification branch (Quality Focal Loss) & Regression branch (DFL)

## Tech Stack
- **Language**: Python
- **Framework**: PyTorch
- **Vision**: OpenCV
- **Model**: MicroDet
- **Data Format**: COCO
- **Hardware**: CUDA GPU
    `
  },
  "MiningLCA": {
    title: "Mining LCA Tool",
    description: "AI-Driven Life Cycle Assessment for Mining",
    tech: ["React", "Flask", "MongoDB", "Scikit-learn", "XGBoost", "PyTorch", "LangChain (RAG)"],
    content: `
# AI-Driven Life Cycle Assessment (LCA) Tool for Mining & Metallurgy

## Problem Statement
Mining and metallurgy industries are resource-intensive and generate significant environmental impacts. Traditional methods are manual and complex.

Our solution leverages **AI and data-driven models** to:
- Automate LCA calculations
- Predict environmental impact (carbon, water, energy)
- Support circularity and sustainability

## Key Features
- **AI-Powered Predictions**: Estimate carbon footprint, energy demand, and water usage.
- **Clustering & Benchmarking**: Group mines into sustainability clusters.
- **Scenario Simulation**: Run *what-if* analysis for renewable energy adoption.
- **Knowledge Integration**: Retrieve scientific insights via **RAG AI**.

## Tech Stack
- **Frontend**: React.js, TailwindCSS, Chart.js
- **Backend**: Flask
- **Database**: MongoDB
- **AI/ML**: Scikit-learn, XGBoost, PyTorch, LangChain (RAG)
    `
  },
  "AISoftSkill": {
    title: "AI Soft Skill Coach",
    description: "AI-powered interview preparation tool",
    tech: ["Python", "Agentic AI", "LLMs", "React", "Firebase"],
    content: `
# AI Soft Skill Coach
An AI-powered interview preparation tool that parses candidate resumes and generates personalised, role-specific mock-interview questions using large language models (LLMs).

## Features
- **Resume Parsing**: Automatically extracts skills and experience from uploaded PDFs.
- **Role-Specific Questions**: Generates targeted interview questions tailored to the candidate's profile.
- **Agentic AI**: Uses sophisticated AI agents to simulate a real interviewer.
- **Mock Interviews**: Interactive session with real-time feedback.

## Achievements
- **TGF 2.0 2026 Finalist**: Ranked in the Top 10 out of 300 teams.

## Tech Stack
- **AI**: LLMs, Agentic AI
- **Frontend**: React
- **Backend**: Python
- **Storage**: Firebase
    `
  }
};
