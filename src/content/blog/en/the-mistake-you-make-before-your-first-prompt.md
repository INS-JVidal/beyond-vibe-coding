---
title: "The Mistake You Make Before Your First Prompt"
description: "There are two ways to get AI-assisted development wrong: letting it decide too much when you know nothing, and letting it ignore everything you do know. Both stem from the same problem."
pubDate: "2026-02-14"
updatedDate: "2026-02-14"
author: "Prompt Lúcido"
tags: ["ai", "software-development", "greenfield", "brownfield", "software-engineering"]
category: "fundamentals"
series: "Fundamentals"
seriesOrder: 1
draft: false
lang: "en"
image:
  src: "/images/blog/greenfield-vs-brownfield.svg"
  mobileSrc: "/images/blog/greenfield-vs-brownfield-mobile.svg"
  alt: ""
readingTime: 8
translationId: "mistake-before-first-prompt"
audio: true
---

AI hasn't changed what you need to know to build software. It's changed where you put your attention.

Look up any tutorial on AI-assisted development. Ninety percent of them start with an empty project. "Generate a complete app with a single prompt." Sounds great, demos well, gets clicks. But most professional developers don't live there. They live in systems that already exist, with history, with tech debt, with decisions made by someone who's no longer on the team. For them, that tutorial isn't just irrelevant. It's actively dangerous, because it teaches exactly the wrong mindset.

There are two ways to get AI wrong: letting it decide too much when you know nothing, and letting it ignore everything you do know. The two mistakes look opposite, but they stem from the same problem: not understanding what information the AI has and what information you have.

Let's talk about that.

## Two Developers, a Monday Morning

We have two developers. Both open their editor, both are going to use AI, both are competent. One has an empty project and everything to decide. The other has a three-year-old monolith and 80,000 lines of code.

If their strategy with AI is the same, they're both going to have problems. Completely different problems.

The first one is in what software engineering calls *greenfield*: virgin territory, no constraints, no existing code, no decisions already made. The second is in *brownfield*: a system that already exists, with hidden dependencies, team conventions, and deliberate tech debt.

The difference isn't a minor detail. It's what determines whether AI helps you or sabotages you.

## The Inverted Asymmetry

Here's the core idea.

In **greenfield**, you know less than you think. You haven't discovered the hard problems yet, you haven't hit the edge cases, you haven't had to choose between two bad options. But the AI "knows" more than it should: it has patterns from millions of projects and will hand you a complete, convincing, and premature architecture. The danger is that it fills the decision vacuum with assumptions that look reasonable but aren't anchored to your actual context.

In **brownfield**, exactly the opposite happens. You know more than the AI can possibly know: why that database was chosen, which module can't be touched because three teams depend on it, which naming convention nobody documented but everyone follows. The AI, meanwhile, knows less than it needs to. And yet it acts with total confidence on a system it doesn't understand.

The same risk (confidence without context) manifesting in two opposite ways. This has a name: *inverted information asymmetry*. In greenfield, the asymmetry favors the AI. In brownfield, it favors you. Your value as a developer isn't in writing code faster than the AI. It's in knowing what the AI doesn't know.

## The Transition Nobody Tells You About

Here's where it gets interesting. Greenfield and brownfield aren't two static categories. They're a spectrum, and every project moves in one direction only: toward brownfield.

Every commit, every added dependency, every architectural decision narrows the space of possibilities and increases the information asymmetry between you and the AI. Day one of a project is the only moment when you and the AI have the same information. After the first commit, you're in brownfield.

With today's agentic coding tools (Claude Code, Cursor in agent mode, Windsurf), this transition happens faster than ever. You can have thousands of lines of AI-generated code in a matter of hours. Your project becomes brownfield *of someone else's code*. And that's the worst kind of brownfield, because you don't even have the history in your head.

Vibe coding works. Until it doesn't. And the moment it stops working is exactly the point where your project crosses from greenfield into brownfield, and nobody prepared you for that transition. Suddenly you have a system you don't fully understand, built on decisions you didn't make, and the AI keeps acting with the same confidence it had when the project was empty.

## It's Not One Activity, It's Five

When we say "using AI to code," we're lumping together at least five distinct activities. And in each one, the greenfield/brownfield dynamic plays out differently.

**Understanding.** In greenfield, AI can work as a simulated domain expert that helps you think through edge cases you wouldn't have considered. But it responds with the "average case" from its training data. If your domain has particularities (local regulations, industry conventions, client constraints), the AI doesn't know them. And you might not realize they're missing. In brownfield, AI is great at explaining what a module does. But it can't tell you *why* it was written that way. It understands local syntax and semantics, not historical intent.

**Planning.** In greenfield, AI works well as a sparring partner, but only if you bring real constraints. A useful approach: ask it for three architecture alternatives with explicit tradeoffs, instead of "the best solution." In brownfield, planning isn't "what system to build" but "how to intervene without breaking anything." It's surgery, not construction. The key skill is scoping: knowing exactly which part of the system to touch, what context the AI needs for that specific part, and what it must not touch.

**Designing.** AI has a bias toward complexity. Its training data overrepresents mature, enterprise-grade, well-documented code. It underrepresents "simple code that works for a small team." If you don't explicitly ask for the simplest solution, it'll give you the most elaborate one. On top of that, AI doesn't understand your time horizon. It doesn't distinguish between a two-week prototype and a five-year product, and that constraint changes everything.

**Generating code.** This is where AI shines most visibly and where the danger is greatest. Every time AI generates code, it makes dozens of decisions it doesn't consult you on: directory structure, dependencies, error handling patterns, naming conventions. Most are reasonable. Some are wrong for your case. They're what we might call *ghost decisions*: they're there, they affect your project, and you didn't choose them.

**Verifying.** In greenfield, verification means "does it do what I want?", which requires having specified what you wanted. When AI generates both the code and the tests, the tests tend to verify *what the code does*, not *what it should do*. They're tautological tests. In brownfield, verification means "did I break something that was already working?", a fundamentally harder problem. AI can generate regression tests for existing code that has no tests, and that's enormously valuable. But the most dangerous bugs come from *interactions* between components, not from individual components.

## Three Questions That Should Become a Reflex

If you take away one practical thing from all of this, let it be these three questions. Not as a checklist you look up, but as something you internalize until it becomes automatic. Before any interaction with AI for development:

**Am I building something new or modifying something that exists?** The answer completely changes your strategy. In greenfield, your job is to set constraints before the AI fills the vacuum. In brownfield, your job is to transfer context without overwhelming.

**What does the AI know that I don't, and what do I know that the AI doesn't?** This is the question almost nobody asks, and it's the most important one. Because the answer defines your role in the conversation. You're not a user requesting a service. You're one half of a team where each part holds information the other doesn't have. Your advantage isn't technical. It's contextual.

**What's my verification strategy for whatever it generates?** If you don't have an answer to this before you generate, you're delegating decisions without oversight. And that's not engineering, regardless of how sophisticated the tool is.

## What Hasn't Changed

Understanding complexity, designing clean interfaces, writing meaningful tests, managing tech debt. Those fundamental software engineering skills remain exactly the same. What's changed is how time is distributed: less time writing code, more time thinking, reviewing, and deciding.

The "meta" skills (planning, evaluating, deciding) are now more valuable than the "object" skills (writing code that compiles). And that's not a problem. It's an opportunity for developers who'd rather think.

---

*This article is adapted from the first episode of [Prompt Lúcido](https://youtube.com/@BeyondVibeCoding), a channel about AI-assisted development for thoughtful programmers. New episode every week.*