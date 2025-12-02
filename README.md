Health Actions API

A lightweight full-stack demo showcasing modern CI/CD, automated tests, and serverless API design.
Built with Node.js + Express, deployed as Vercel Serverless Functions, and paired with a React + Vite frontend UI.

✅ Minimal

Live Demo: https://health-actions-api-k46y.vercel.app

✅ With backend link too

Live Demo: https://health-actions-api-k46y.vercel.app
 · API Base: https://health-actions-api.vercel.app/api

✅ With labels

Frontend Demo: https://health-actions-api-k46y.vercel.app

Backend API: https://health-actions-api.vercel.app/api

Features

Serverless Express backend deployed under /api/*

React/Vite frontend for creating and viewing actions

Automated CI pipeline running unit + API tests before deployment

Vercel GitHub integration for instant preview + production deploys

CORS + preflight handling for secure cross-origin requests

In-memory datastore (no database required

Clean, easy-to-extend architecture for prototyping APIs

Start backend locally:
npm install
npm run dev


Backend runs at:

http://localhost:5000

Start frontend:
cd client
npm install
npm run dev


Frontend runs at:

http://localhost:5173
This repo uses Vercel’s CI/CD pipeline:

Every push → automated tests

If tests pass → backend & frontend deploy automatically

Preview deployments for PRs

Production deploy on merge to main



