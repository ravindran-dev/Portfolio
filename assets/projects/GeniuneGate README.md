# GenuineGate

> **Real-time anti-scalping bot protection MVP**  
> Detect automated bots during high-traffic product drops using behavioral analysis

**Architecture:** Browser Tracker → Nginx → Go API → Redis → Admin Dashboard

---

## What It Does

GenuineGate protects checkout flows by analyzing user behavior in real-time:
- Captures mouse movements, clicks, scrolls, and visibility
- Assigns risk scores (0-100) based on bot-like patterns
- Blocks high-risk sessions (>80), delays suspicious ones (50-80)
- Provides real-time admin dashboard for monitoring

**Use cases:** Limited product drops, ticket sales, high-demand merchandise releases

---

Real-time anti-scalping bot protection MVP. Architecture:

---

## Quickstart (Docker Compose)

**Prerequisites:** Docker must be installed. [Get Docker](https://www.docker.com/products/docker-desktop) or run on Linux:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER  # logout/login after
```

**Start the system:**

```sh
# Option 1: Use helper script
./operate.sh start

# Option 2: Manual docker compose
cp .env.example .env
docker compose up --build
```

Services:
- `nginx` on http://localhost (proxies and rate-limits)
- `api` on http://localhost:8080 (Gin backend, serves static web UI)
- `redis` on localhost:6379

Open the tracker at http://localhost/web/tracker and the admin dashboard at http://localhost/web/admin.

**For complete operations guide, see [OPERATIONS.md](./OPERATIONS.md)**

## Local development (no Docker)

Prereqs: Go 1.22+, Redis running locally.

```sh
cp .env.example .env
export $(grep -v '^#' .env | xargs)
go run ./cmd/api
```

API listens on `:$PORT` (default 8080).

## Endpoints
- `POST /metrics` — tracker sends behavior payload every 2s. Requires `X-Session-ID` header.
- `POST /checkout` — protected checkout; uses last risk score.
- `GET /admin/stats` — aggregate stats for dashboard (active, blocked, avg score, RPS).
- `GET /healthz` — liveness probe.
- Static assets under `/web/` (tracker + admin dashboard).

## Config (env vars)
- `PORT` (default 8080)
- `REDIS_ADDR` (default `redis:6379`)
- `REDIS_PASSWORD` (optional)
- `REDIS_DB` (default 0)
- `SESSION_TTL` (default 15m)
- `MODERATE_DELAY` (default 500ms)
- `BLOCK_THRESHOLD` (default 80)
- `MODERATE_THRESHOLD` (default 50)

## Behavior tracker
- Plain JS in `web/tracker/index.html`.
- Captures mouse moves, scrolls, click intervals, visibility changes, screen resolution.
- Sends JSON to `/metrics` every 2s with `X-Session-ID` header; stores UUID in `localStorage`.
- Checkout button posts to `/checkout` with same session ID.

## Admin dashboard
- `web/admin/index.html` polls `/admin/stats` every 3s.
- Displays active sessions, blocked sessions, average risk score, requests/sec, total requests.

## Nginx reverse proxy
- Config in `deploy/nginx/nginx.conf`.
- Proxies all routes to `api:8080` and enforces basic rate limit (20 r/s per IP, burst 10).
- Forwards real client IP via `X-Forwarded-For`.

## Risk model
- Heuristics: low interaction volume, low click-interval entropy, unrealistic timing bursts, rapid request frequency, fingerprint instability.
- Decision engine: score > 80 → block; 50–80 → delay; < 50 → allow. Scores stored in Redis with TTL.

## Sample calls (if you want to script)
```sh
# Send a metrics sample
curl -X POST http://localhost:8080/metrics \ 
	-H "Content-Type: application/json" \ 
	-H "X-Session-ID: demo-123" \ 
	-d '{"mouse_moves":5,"scroll_events":2,"click_intervals_ms":[120,140],"visibility_changes":1,"screen_resolution":"1920x1080","page_hidden":false,"sent_at":1720000000}'

# Attempt checkout
curl -X POST http://localhost:8080/checkout -H "X-Session-ID: demo-123"

# Admin stats
curl http://localhost:8080/admin/stats
```

## Project layout
```
GenuineGate/
├── cmd/api/
│   └── main.go                 # Server entrypoint, routing, middleware
├── internal/
│   ├── config/
│   │   └── config.go           # Environment configuration loader
│   ├── handlers/
│   │   └── handlers.go         # HTTP handlers (metrics, checkout, admin)
│   ├── models/
│   │   └── metrics.go          # Request/response structs
│   ├── risk/
│   │   └── engine.go           # Bot scoring heuristics
│   ├── store/
│   │   └── store.go            # Redis operations
│   └── telemetry/
│       └── metrics.go          # RPS counter, throughput tracking
├── web/
│   ├── tracker/
│   │   └── index.html          # Browser behavior capture UI
│   └── admin/
│       └── index.html          # Real-time monitoring dashboard
├── deploy/nginx/
│   └── nginx.conf              # Reverse proxy + rate limiting config
├── docker-compose.yml          # Multi-service orchestration
├── Dockerfile                  # Go API container build
├── .env.example                # Configuration template
├── operate.sh                  # Operations helper script
├── diagnose.sh                 # Diagnostics tool
├── README.md                   # Project overview (you are here)
├── OPERATIONS.md               # Complete ops guide
└── QUICKSTART.md               # Quick reference cheat sheet
```

## Documentation

- **[INSTALL.md](./INSTALL.md)** — Installation guide for Docker, Go, Redis
- **[QUICKSTART.md](./QUICKSTART.md)** — Quick reference cheat sheet
- **[OPERATIONS.md](./OPERATIONS.md)** — Complete operational guide (testing, monitoring, troubleshooting)
- **[operate.sh](./operate.sh)** — Helper script for common operations
- **[diagnose.sh](./diagnose.sh)** — Automated diagnostics tool

## Helper Scripts

```bash
./operate.sh start      # Start all services
./operate.sh test       # Run automated tests
./operate.sh logs       # View logs
./diagnose.sh           # Run diagnostics
```