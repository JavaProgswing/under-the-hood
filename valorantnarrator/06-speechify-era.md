# 6 · The Speechify era (Feb 2024 – Nov 2025) — a retrospective

> **Scope note.** This page is an engineering *retrospective* on a part of Valorant Narrator I
> retired on purpose. It documents what the system did, why it was a bad foundation, and what
> replaced it. It deliberately does **not** give a step-by-step guide to driving Speechify's
> consumer service programmatically, defeating its bot detection, harvesting/refreshing its auth
> tokens, or rotating accounts to stretch free credits. That would be a playbook for abusing a
> third party's access controls and terms, which I won't publish — not even for my own dead code.
> The lesson is the point here, not the method.

## What it was

When Coqui's hosted Studio shut down at the end of 2023, premium "agent voices" came back in
**v2.4** on top of **Speechify's consumer voice-cloning product**. Reference clips of each agent
(scraped from the Valorant Fandom wiki — that part is covered in
[04-agent-voices-and-cloning.md](04-agent-voices-and-cloning.md)) were turned into cloned voices,
and my backend generated speech from them on demand instead of a person clicking through a browser.

From the desktop app's point of view nothing changed: it still called `/getPremiumVoice` and got
back an audio URL to stream. Everything new lived in the backend.

## Why I even did it

- **Coqui had just disappeared.** The feature people paid for vanished overnight and I wanted it
  back fast.
- **Hosted neural TTS was expensive** relative to what a student project could charge.
- **Consumer voice-cloning was improving faster than the API products.** The quality was there; it
  just wasn't exposed as something you were meant to build on.

All three were real pressures. None of them made it a *good* idea — they made it an expedient one.

## Why it was the wrong foundation

This was, in hindsight, the weakest and least defensible part of the whole product:

- **No contract.** It depended on an undocumented consumer surface that could change or lock down
  any day. It was never a supported integration, so it could never be a dependable feature — only
  a demo that happened to keep working.
- **Wrong cost model.** Consumer accounts and consumer credits are not built to back a product
  other people pay for. The unit economics never actually closed; they just hadn't fallen over yet.
- **Terms & ethics.** Using a consumer service this way sits at best in a terms-of-service grey
  area, and it meant pushing cloned voices of Riot's voice actors through a third party I had no
  agreement with. Two separate consent problems stacked on top of each other.
- **Silent, correlated failure.** When it broke, it broke for *everyone at once* and with no useful
  error. The commit log for this era is a stream of "premium voice fix" entries — that's what
  operating on borrowed infrastructure feels like.
- **It couldn't scale with trust.** Every mitigation for the above made the system more elaborate
  and more fragile, not more legitimate. There's no amount of engineering that turns "unsanctioned
  use of someone else's service" into a product you can stand behind.

## What replaced it, and why that's better

**v3.90 (Nov 2025)** moved synthesis onto the **user's own machine** — first XTTS-v2
([VoiceCloner](https://github.com/JavaProgswing/VoiceCloner)), then NeuTTS Air (AgentVoiceServer).
Full detail in [04-agent-voices-and-cloning.md](04-agent-voices-and-cloning.md). The properties
that matter:

| | Speechify era | Local model |
|---|---|---|
| Third party in the hot path | yes (every line) | no |
| Per-line marginal cost | consumer credits | zero |
| Fails when | the third party changes anything | basically never |
| What the backend holds | a lot it shouldn't | only licensing + quotas |
| Defensible | no | yes |
| Offline | no | yes |

The backend's job shrank to the part it should always have been: *is this user allowed, and how
much quota is left* — not *proxy a third-party service we don't have a deal with*.

## The lesson I'd actually pass on

**If a feature only works because of a service you don't have an agreement with, it isn't a feature
yet — it's a prototype on borrowed time.** The engineering can be clever and still be the wrong
thing to build on. The fix usually isn't a better workaround; it's removing the dependency, even
when that means running a model on every user's laptop and eating the startup cost.

That migration — from "clever use of someone else's cloud" to "boring thing I fully own" — is the
most valuable decision in the project's history, and the one I'd make faster next time.
