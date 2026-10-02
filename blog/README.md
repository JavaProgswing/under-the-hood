# Blog drafts

Paste-ready posts for the portfolio, written in the same voice and shape as the existing ones in
`src/data/me.ts`.

## How to use

Open `src/data/me.ts` in the portfolio, find the `blogs: [ ... ]` array, and paste the objects
from [`posts.ts`](posts.ts) in (drop the `export const newPosts =` wrapper — just the array
items). Newest first matches the current ordering.

Each object already matches the `BlogPost` interface in `src/components/Blog.tsx`
(`title, date, readTime, authors, excerpt, tags, content`) and the `ContentRenderer` rules:
blank line = new paragraph, a line starting with `> ` = quote, no Markdown headers, and **no
backticks** in `content`.

## The four drafts

| Title | Angle | Tags |
|---|---|---|
| Why I Keep Rewriting the Same Bot | The three Discord bots, as a story about *state ownership* | Discord, Python, Architecture |
| If It Only Works Because of Someone Else's Service, It Isn't a Feature Yet | The agent-voice migration to a local model, as a dependency-ownership lesson | TTS, Architecture, Valorant |
| Getting a Program's Voice Into a Game's Microphone | The audio-routing / push-to-talk engineering | Audio, Windows, Java |
| OCR Is Easy. Not Narrating the Same Line Twice Is the Hard Part. | The dedup/anchor/stability engineering around screen OCR | OCR, Computer Vision, C# |
| Shipping a Python Model Server Inside a Java App | The localhost-HTTP seam, PyInstaller, OTA updates, the numba fix | Java, Python, Packaging |
| Precision Over Recall: Perception for a Game Bot | Typed scenes, scroll subtraction, a precision-gated classifier | Computer Vision, Automation, Python |

Each maps to a teardown in this repo ([valorantnarrator/](../valorantnarrator/),
[discord-bots/](../discord-bots/)) if you want to link "read more" from a post.
