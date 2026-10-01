# under-the-hood

Write-ups of how my projects work underneath: the architecture, the rewrites, and the decisions
that aren't obvious from the code.

Most READMEs tell you how to run a thing. This is the other half — why it's built the way it is,
and what earlier versions tried. It's also the source material for posts on my site.

**Author:** Yashasvi Allen Kujur · [yashasviallen.is-a.dev](https://yashasviallen.is-a.dev/) ·
GitHub [@JavaProgswing](https://github.com/JavaProgswing)

---

## Teardowns

| Folder | Project | What's inside |
|---|---|---|
| [valorantnarrator/](valorantnarrator/) | **Valorant Narrator** | Three years and ~40 releases of a desktop app that reads Valorant text chat and speaks it on team voice. Five generations of chat capture, the audio-routing problem, four voice-synthesis backends, and the backend/quotas/payments story. |
| [discord-bots/](discord-bots/) | **VoithosHelper → Vithron → Aestron** | One Discord bot across three rewrites and five years: a 5k-line Replit file, a 17k-line / 1,868-commit Heroku monolith with a Postgres schema and dashboard, and a 39-module discord.py 2.7 package with a FastAPI site, Riot RSO linking and tests. |

Drafts for new site posts live in [blog/](blog/).

More teardowns will land here as I write them.

---

## Project index

Everything I've built that's worth pointing at, with a one-line purpose and a rough timeframe.
Dates are repo creation → last activity (or local first → last edit for things never pushed).
Grouped by theme, newest-ish first within each group.

### 🎙️ Valorant Narrator & its satellites

| Project | When | Purpose |
|---|---|---|
| [ValorantNarrator](https://github.com/JavaProgswing/valorantnarratorOPS) (OPS mirror) | 2023-08 → 2026-07 | The desktop app: Valorant text chat → real-time agent-voice comms. Full teardown in [valorantnarrator/](valorantnarrator/). |
| [VoiceCloner](https://github.com/JavaProgswing/VoiceCloner) | 2025-12 → 2026-07 | Generic local XTTS-v2 voice-clone server; shipped as the agent-voice engine. |
| AgentVoiceServer *(private)* | 2026-07 | Current local NeuTTS Air voice server with a backend authorization gate. |
| [api-valnarrator-vercel](https://github.com/JavaProgswing/api-valnarrator-vercel) *(private)* | 2024-10 → 2026-07 | Current backend: FastAPI on Vercel + Supabase, quotas, temp AWS creds, agent-voice licensing. |
| [site-valnarrator-vercel](https://github.com/JavaProgswing/site-valnarrator-vercel) | 2024-10 → 2025-12 | `valnarrator.vercel.app` — landing, download, ToS/privacy, referrals. |
| payment-valnarrator-vercel *(private)* | 2024-10 → 2025-11 | Checkout + webhooks: PayPal (international) and Razorpay (INR). |
| [ValorantMatchStats](https://github.com/JavaProgswing/ValorantMatchStats) | 2025-01 | Match-stats viewer, built on the same Riot local-API knowledge. |
| [whispercpp](https://github.com/JavaProgswing/whispercpp) | 2024-08 | whisper.cpp snapshot used for the (short-lived) in-app dictation experiment. |

### 🧠 ML / AI / RAG

| Project | When | Purpose |
|---|---|---|
| [jailbreaker-llm](https://github.com/JavaProgswing/jailbreaker-llm) | 2026-09 | LLM-vs-LLM automated red-teaming research platform (attacker fine-tuned against a target). |
| [cineguide-rag](https://github.com/JavaProgswing/cineguide-rag) | 2026-08 | Evaluated movie-discovery RAG: hybrid retrieval, grounded answers, monitoring. |
| [rag-n8n-spring-platform](https://github.com/JavaProgswing/rag-n8n-spring-platform) | 2026-09 | Production-style RAG platform: Spring Boot, n8n, pgvector, Mongo, Redis, Ollama, CI. |
| [syllabusRet](https://github.com/JavaProgswing/syllabusRet) | 2026-09 | Syllabus RAG assistant with cited, evidence-bound answers. |
| [Urban-Heat-Mitigation](https://github.com/JavaProgswing/Urban-Heat-Mitigation) | 2026-06 → 07 | Physics-informed geospatial ML for urban-heat hotspots and mitigation planning. |
| [climate-platform](https://github.com/JavaProgswing/climate-platform) | 2026-03 | Flood prediction + urban-heat + energy forecasting, end-to-end. |
| [garbage-sorter / waste-classifier](https://huggingface.co/spaces/jprcoder/waste-classifier) | 2026-03 → 07 | Image classifier for waste sorting (HF Space). |
| [Claimify](https://github.com/JavaProgswing/Claimify) | 2026-08 | Evidence-based claim verification: Firecrawl + local NLI, web app + browser extension. |
| [StockMarketPredictor](https://github.com/JavaProgswing/StockMarketPredictor) | 2025-04 | Stock outlook from latest news + market data via an LLM. |
| [ml-* course projects](https://github.com/JavaProgswing?tab=repositories&q=ml-) | 2026-07 | Nine from-scratch ML projects (titanic, fraud, wine, digits, gaze/gesture, …). |

### 🔌 Automation, reverse engineering & tooling

| Project | When | Purpose |
|---|---|---|
| [aula-f75](https://github.com/JavaProgswing/aula-f75) | 2026-07 | Reverse-engineered USB-HID protocol for the Aula F75 keyboard — full keymap read/write, no official SDK. |
| [snake-io-bot](https://github.com/JavaProgswing/snake-io-bot) | 2026-07 | Snake.io perception + autopilot over ADB: explicit temporal vision layer, certified per-class precision. |
| [ChessAutomation](https://github.com/JavaProgswing/ChessAutomation) | 2025-07 → 2026-02 | Desktop chess assistant: GUI, analysis, move automation. |
| [SRM-WIFI-Login](https://github.com/JavaProgswing/SRM-WIFI-Login) | 2024-12 → 2026-02 | Windows tray app that auto-logs-in to the campus captive portal. |
| [SRM-Academia-Timetable](https://github.com/JavaProgswing/SRM-Academia-Timetable) | 2025-08 → 2026-01 | Visualizes the SRM academic timetable. |
| [gridee-cli](https://github.com/JavaProgswing/gridee-cli) | 2026-07 → 08 | ADB/UIAutomator CLI that books badminton slots through the app's own UI. |
| [ChatGPTSeleniumAutomation](https://github.com/JavaProgswing/ChatGPTSeleniumAutomation) | 2024-08 → 2025-04 | Drive the ChatGPT web UI programmatically. |
| [wifi-walk-survey](https://github.com/JavaProgswing/wifi-walk-survey) | 2026-03 → 07 | DIY Wi-Fi site-survey tool: walk a building, IDW-interpolated signal heatmap (NetSpot-lite). |
| [LenovoLegionToolkit](https://github.com/JavaProgswing/LenovoLegionToolkit) (fork) | 2026-05 | Extended Legion automation (Bluetooth, DND, fan, night-light…). |

### 🌐 Web / apps / platforms

| Project | When | Purpose |
|---|---|---|
| [Personal-Apex](https://github.com/JavaProgswing/Personal-Apex) | 2026-06 → 09 | "Apex" — a personal productivity OS for college life (timetable, tasks, focus). |
| [RepoSignal](https://github.com/JavaProgswing/RepoSignal) | 2026-10 | Turns a repo's issues/PRs into an evidence-backed maintainer attention queue. |
| [GotYourBack](https://github.com/JavaProgswing/GotYourBack) | 2026-09 | SRM-only marketplace for borrowing/lending/selling within a trusted student community. |
| [AssistanceSupport](https://github.com/JavaProgswing/AssistanceSupport) | 2026-02 | AI support portal: Gemini + image analysis for refund claims + policy enforcement. |
| [Roadmap-Builder](https://github.com/JavaProgswing/Roadmap-Builder) | 2025-08 → 2026-02 | Skill/academics roadmap generator. |
| [GDGoC](https://github.com/JavaProgswing/GDGoC) | 2025-04 → 07 | Speaker-session booking platform (OTP auth, calendar, email). |
| [CompleteBlogApp](https://github.com/JavaProgswing/CompleteBlogApp) | 2025-10 | Full-stack blogging platform (CRUD, auth). |
| [ChatAnalysis](https://github.com/JavaProgswing/ChatAnalysis) | 2026-05 | Chat-export analysis dashboard (WhatsApp/Discord/ChatGPT/Claude) + optional local-LLM profiling. |
| [Aestron](https://github.com/JavaProgswing/Aestron) | 2023-01 → 2026-07 | Full-feature Discord bot (moderation, music, giveaways, tickets, Valorant UI) — 3rd generation; teardown in [discord-bots/](discord-bots/). |
| [vithron_webdashboard](https://github.com/JavaProgswing/vithron_webdashboard) / [VoithosHelper1](https://github.com/JavaProgswing/VoithosHelper1) | 2021 → 2022 | Earlier generations of the same bot: Quart + Discord OAuth2 dashboard, and the original Replit bot. |

### 🧩 Java / systems / fundamentals

| Project | When | Purpose |
|---|---|---|
| [chess-server](https://github.com/JavaProgswing/chess-server) + [Checkora](https://github.com/JavaProgswing/Checkora) | 2025-12 → 2026-01 | Chess backend (Spring Boot) and a minimax + C++ engine chess platform. |
| [EffaceDistractions](https://github.com/JavaProgswing/EffaceDistractions) | 2025-12 | JavaFX app that blocks distracting applications. |
| [flight-server](https://github.com/JavaProgswing/flight-server) + [FlightReservationSystem](https://github.com/JavaProgswing/FlightReservationSystem) | 2025-12 | Flight reservation: Spring Boot backend + HTML/JS frontend. |
| [ChatApp](https://github.com/JavaProgswing/ChatApp) | 2022-10 → 2025-01 | Swing chat application (+ Quarkus API rework). |
| **Vosk speaker-recognition / WhisperCPP** *(local)* | 2025 | Speech-to-text and speaker-embedding experiments that fed the dictation work. |
| [AdventOfCode2025](https://github.com/JavaProgswing/AdventOfCode2025) | 2025-12 | AoC solutions. |

> Forks I've contributed to or studied (classpro, Wavelink, tesseract.js, goscraper, auto-resume,
> procurement-ai-assistant, and the GSoC-org set) are intentionally left off this index — it's for
> things I built or led.

---

## Conventions

- Each teardown is its own folder with a `README.md` entry point and numbered chapters.
- Diagrams are Mermaid so they render on GitHub and stay diffable.
- Secrets, keys, account identifiers and user data are **never** reproduced here. Third-party
  internals are described at the level needed to understand *my* design decisions, not to
  reproduce anyone else's service.
