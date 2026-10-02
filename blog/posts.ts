// Paste-ready entries for src/data/me.ts -> blogs: [ ... ]
// Same shape as your existing posts: { title, date, readTime, authors, excerpt, tags, content }.
// Renderer rules (Blog.tsx ContentRenderer): paragraphs split on blank lines, a line starting
// with "> " renders as a quote, 2-space-indented lines read as code. Avoid backticks in content.

export const newPosts = [
  {
    title: "Why I Keep Rewriting the Same Bot",
    date: "Oct 2026",
    readTime: "5 min read",
    authors: ["Yashasvi Allen Kujur"],
    excerpt:
      "Three Discord bots over five years, each a near-total rewrite of the last. Turns out every rewrite was really about one thing: state.",
    tags: ["Discord", "Python", "Architecture", "Dev Story"],
    content: `I have built the same Discord bot three times. VoithosHelper in 2021, Vithron through 2023, Aestron ever since. Each one was a near-total rewrite of the last, and for a long time I told myself each rewrite was about features. It wasn't. Every single one was about state: where it lives, who owns it, and whether it survives a restart.

VoithosHelper was one 5,000-line file kept awake on a free host with a ping trick. State lived in Python globals. A restart wiped everything. I learned the event loop and rate limits and not much else, which at that point was the entire point.

Vithron was the do-everything era. Still one file, but now seventeen thousand lines and a hundred and seventy commands, and I committed to it eighteen hundred times in under two years. The important change was not the feature count, it was moving anything I could not afford to lose into Postgres. Mutes and bans and blacklists got pending tables so a punishment that ends in two hours actually survives a redeploy. That one idea, persist anything with a timer, is still the thing I reach for first.

The smell I ignored for too long: the setup notes said things like edit the owner IDs on line 76 and change the channel IDs on line 2429. When your docs cite line numbers, your architecture is telling you something.

Aestron started as a copy of Vithron and then, embarrassingly, stayed a 16,000-line monolith for three more years. The real rewrite happened in a single week in 2026: main.py went from ~16,000 lines to 3,800, split across 39 modules. The headline change was boring and the most valuable thing I have done to that codebase: the database module owns the connection pool, and every command asks for the pool instead of importing a shared global. Panels for tickets and verification register stable button IDs so they keep working after a restart. Nothing a user does gets lost anymore.

So here is the progression, which is the whole story: globals, then one file plus a database, then owned modules with a managed pool and components that persist. Same bot, three times, each one just a better answer to where does the state live.

If you are early and building something that stays online, skip a generation. Put durable state in a real database on day one, keep config in the environment, and assume every process will restart at the worst possible moment. Your future self, staring at a line-2429 reference, will thank you.`,
  },
  {
    title: "If It Only Works Because of Someone Else's Service, It Isn't a Feature Yet",
    date: "Oct 2026",
    readTime: "5 min read",
    authors: ["Yashasvi Allen Kujur"],
    excerpt:
      "Valorant Narrator's 'agent voices' rode three different hosted services before I did the obvious thing and ran the model on the user's own machine. The migration was the best decision in the project.",
    tags: ["TTS", "Architecture", "Valorant", "Dev Story"],
    content: `The feature people actually paid for in Valorant Narrator was agent voices: your teammate's typed callout, spoken in a voice that sounds like a Valorant agent. Under the hood that feature changed engines three times, and the pattern of why is more useful than any of the individual setups.

It started on a hosted voice product. Then that product wound down its service, and the feature vanished overnight. I brought it back on a different hosted service. For about twenty-one months it worked, and the whole time it sat on an undocumented consumer surface that I had no agreement to build on. When it broke, it broke for everyone at once, with no useful error. The commit log for that era is just a stream of premium voice fix, premium voice fix, premium voice fix.

That is what operating on borrowed infrastructure feels like. Not one dramatic failure, but a slow tax: every change upstream is your incident, the economics never quite close because consumer credits were never meant to back a paid product, and you can't actually stand behind it because the whole thing lives in a terms-of-service grey area.

The fix, when I finally did it, was the obvious one I had been avoiding because it sounded expensive: run the model on the user's own machine. First XTTS-v2, then a lighter GGUF model through llama.cpp for the people on low-end laptops who are most of the audience. The desktop app talks to a tiny local server over loopback and gets audio back. No third party in the hot path. Zero marginal cost per line. It works offline. It fails basically never.

And the backend shrank to what it should always have been. Instead of proxying a service I didn't own, it now only answers the question it has a right to answer: is this user allowed, and how much quota is left.

The migration from clever use of someone else's cloud to a boring thing I fully own is, in hindsight, the single best decision in the project's history, and the one I would make much faster next time. So the lesson I keep now: if a feature only works because of a service you don't have an agreement with, it isn't a feature yet. It's a prototype on borrowed time. The fix is rarely a better workaround. It's removing the dependency, even when that means shipping a model to every laptop and eating the startup cost.`,
  },
  {
    title: "Getting a Program's Voice Into a Game's Microphone",
    date: "Oct 2026",
    readTime: "6 min read",
    authors: ["Yashasvi Allen Kujur"],
    excerpt:
      "Synthesizing speech was the easy half of Valorant Narrator. Convincing a game that the speech came from a push-to-talk mic was the half that ate the tickets.",
    tags: ["Audio", "Windows", "Java", "Valorant"],
    content: `Making text into speech is a solved problem; you call a TTS engine and get audio. The genuinely hard half of Valorant Narrator was the other direction: getting that audio onto the game's team voice channel, which only accepts a microphone, and only while a push-to-talk key is held.

The microphone part is a virtual audio cable. It gives you a playback device and a recording device that are wired together, so anything you play into one shows up as mic input on the other. The app pins its own audio output to the cable's input, points the game's voice-capture device at the cable's output, and also listens the cable back to your real speakers so you can hear what your teammates hear. One gotcha that cost a real bug: Windows remembers per-device mute and volume across sessions, so a cable that got muted once silently breaks everything with no error anywhere. The current build just force-unmutes both ends to full volume on every start.

The push-to-talk part is where I went through three designs. Version one pressed the key on a timer while the audio player ran and released it when the player said it was done. The problem is that done meant the file finished decoding, not that the sound finished leaving the buffer, so the last word got clipped. It also meant the Windows built-in voices, which play from a separate process and give you no events at all, could not be timed this way.

The fix was to stop trusting the player and start trusting the audio. A detector opens the cable's output as a recording line and watches the actual signal level: root-mean-square of each small chunk, converted to decibels, with a one-second calibration at startup to learn the room's noise floor and set a threshold a few dB above it. Now the narration flow is dead simple. Press the key. Start speaking. Wait until the detector first hears real signal on the cable, then wait until it goes quiet again, then release. There is a hard cap on how long the key can be held so a steady hum can never pin the mic open forever, and the release always runs in a finally block so the key can never get stuck down.

The nice part is that this made every voice engine behave identically. Cloud neural voices, a local model, or a Windows voice from an entirely different process: the app does not care how the audio was produced, only whether the cable is currently carrying sound. The thing that reports whether to hold the key is the same physical signal the game is about to receive, which is exactly the thing you actually care about.

Lesson I took from it: when a timing decision keeps being subtly wrong, check whether you are measuring a proxy instead of the real event. I was timing a decoder when the thing I cared about was sound in a wire. Measuring the wire made three fragile designs collapse into one simple one.`,
  },
  {
    title: "OCR Is Easy. Not Narrating the Same Line Twice Is the Hard Part.",
    date: "Oct 2026",
    readTime: "5 min read",
    authors: ["Yashasvi Allen Kujur"],
    excerpt:
      "Reading text off a screen is a one-liner now. Deciding which of those reads is a genuinely new message, on a flickering fading chat box, is where all the engineering went.",
    tags: ["OCR", "Computer Vision", "C#", "Valorant"],
    content: `The current version of Valorant Narrator reads chat by looking at the screen. A small sidecar captures the game window, crops the chat box by fractions of the window so it is resolution independent, upscales, and runs the built-in Windows OCR engine about twenty times a second. That part is almost free. The entire difficulty is downstream: deciding which recognized lines are actually new messages worth speaking.

Live game chat is a hostile input for this. A message is semi-transparent and fades out, so the same line reads slightly differently frame to frame. OCR jitters: it reads test 11 as testll, it swaps O and 0. Long messages wrap onto a second line with no sender tag. The input box churns as you type. Scroll back through history and every old line reappears. Naively narrate every recognized line and the app becomes an unusable stutter machine.

So almost all the code is about suppression. A few of the ideas that carried their weight:

Require the channel brackets in the parse. A real line looks like a bracketed channel, then name, then colon, then body. Requiring the brackets throws away the input bar and the HUD text for free, because neither has them.

Track an anchor, not a set. The sidecar remembers the last line it actually spoke, and every frame it finds that line again using a fuzzy, edit-distance match that tolerates OCR noise. Everything below the anchor is new, in order, so a burst of three messages narrates in the right order and nothing above the anchor gets repeated.

Gate on stability. The newest visible line has to read identically for a couple of frames before it is spoken, so a message still fading in gets spoken once, as its settled text, instead of three times as it sharpens.

Detect bulk view changes. If a frame shares less than half its lines with the previous frame, that is a tab switch or the chat expanding or a big scroll, not a new message. Re-seed silently. This single rule killed the most common complaint, which was the app re-reading everything the moment you opened a whisper.

And make idle genuinely free. If the cropped image hashes the same as the last frame, skip OCR entirely. No new pixels, no work, no CPU, which matters a lot for an app whose entire promise is that it does not cost you frames.

The meta-lesson is one I keep relearning: the model or the library is rarely the hard part anymore. Recognizing the text took one line. Deciding what to do with a stream of noisy, overlapping, re-appearing recognitions was the actual product. The intelligence lives in the plumbing around the clever bit, not in the clever bit.`,
  },
  {
    title: "Shipping a Python Model Server Inside a Java App",
    date: "Oct 2026",
    readTime: "5 min read",
    authors: ["Yashasvi Allen Kujur"],
    excerpt:
      "Valorant Narrator is a Java desktop app that also has to run a Python neural TTS model on the user's machine. Gluing those two worlds together was its own small project.",
    tags: ["Java", "Python", "Packaging", "Dev Story"],
    content: `The agent voices in Valorant Narrator run on a local neural TTS model. The app itself is Java. So the real question was never which model, it was how do you ship a multi-gigabyte Python model server to a non-technical Windows user and drive it from Java without either half knowing the other exists.

The contract I settled on is deliberately boring. The model lives behind a tiny HTTP server on localhost. The Java app starts the server as a child process, waits for a specific line on its stdout that means ready, then POSTs text and gets back audio. That is the entire interface. Either side can be rewritten as long as that stays true, and in fact the Python engine has been swapped out underneath without the Java side noticing.

The Python side is frozen into a single Windows executable with PyInstaller, so users never touch pip. That immediately creates problems you do not have in development:

First, startup. A onefile build re-extracts the whole model to a temp dir on every launch, which for multi-GB weights is painful. The onedir build unpacks once at install and starts fast, so that is what ships.

Second, a genuinely cursed bug: the frozen exe shipped a numba cache that was zeroed out, and that crashed a dependency's import with an unpickling error, which killed the whole voice server before it could say ready. The fix did not need a re-release of the Python exe at all. The Java launcher wipes and redirects the cache directory via an environment variable before starting the process, so the broken bundled cache is never read. Being able to patch the Python side from the Java side, without rebuilding the Python side, saved a release.

Third, updates. The model exe and the app update on separate tracks. The app reads the exe's Windows file-version, compares it against what the backend advertises, and downloads a replacement if it is behind. Only the launcher exe gets replaced; the giant internal folder stays. So a voice fix can ship without pushing a whole new installer.

And finally, progress and liveness. The Java side reads the Python stdout line by line, matches the loading-progress lines, and shows them in the UI, so the user sees something during the slow model load instead of a frozen window. Timeouts are generous for synthesis but bounded, so a hung model can never wedge the one narration thread forever.

None of this is glamorous. But the lesson held up: when you have to marry two runtimes, make the seam between them as small and as dumb as possible. A process boundary plus an HTTP call on localhost is easy to reason about, easy to swap, and — as the numba fix showed — easy to work around from the other side when one half misbehaves.`,
  },
  {
    title: "Precision Over Recall: Perception for a Game Bot",
    date: "Oct 2026",
    readTime: "5 min read",
    authors: ["Yashasvi Allen Kujur"],
    excerpt:
      "I rebuilt my Snake.io bot around one rule: it is better to miss a thing than to hallucinate one. That single bias changed the whole design.",
    tags: ["Computer Vision", "Automation", "Python", "Dev Story"],
    content: `My first attempt at a Snake.io bot drove off per-frame heuristics: look at this frame, guess where the food and the enemies are, steer. It was unreliable in a way I could not debug, because the mistakes were never in the steering. They were in what it thought it was looking at.

So I threw out the steering and rebuilt the perception layer alone, around one bias: precision over recall. A detection the bot reports should almost always be real, even if that means it reports fewer of them. A bot that occasionally misses a food orb is fine. A bot that hallucinates an enemy that is not there will juke into a wall for no reason, and you will never figure out why from the steering code.

Two ideas did most of the work.

The first is that the camera is locked to your own snake, so the entire world scrolls past at your own speed every frame. If you estimate that global scroll and subtract it, then anything still moving is moving in the world, which means it is a live enemy. Static loot stops reading as a threat the moment you cancel out your own motion. That one subtraction removed a whole category of false enemies.

The second is making perception explicit and typed instead of a soup of pixels. Every frame becomes a small scene with named categories: self, enemy with a head and a world-relative velocity, border, food, loot. Each detection carries a confidence. Food versus loot is just density: sparse round blobs are food, dense clusters are loot, and loot is never an enemy.

The part I am most glad I built is the one that is not in the bot at all: a validation harness. It serves a little review UI that lets me rate each class on each frame and computes live per-class precision. The classifier does not get to drive until its numbers clear a bar. That turned perception from a vibe into something I could actually certify before trusting it.

The transferable lesson is about where to put your skepticism. In a control system, a confident wrong input is far more dangerous than a missing one, because everything downstream trusts it. Bias your perception toward silence over confident nonsense, make it say how sure it is, and measure that before you let anything act on it.`,
  },
];
