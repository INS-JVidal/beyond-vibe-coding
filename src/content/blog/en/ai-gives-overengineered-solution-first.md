---
title: "The Most Over-Engineered Solution Is the One AI Gives You First"
description: "AI coding assistants default to enterprise-grade complexity whether you need it or not. Designing before generating is what separates developers from prompt operators."
pubDate: "2026-02-17"
updatedDate: "2026-02-17"
author: "Prompt Lúcido"
tags: ["ai coding assistant", "software design", "technical debt", "ai software development", "overengineering", "software architecture", "ai code generation", "coding with ai"]
category: "The Five Things AI Won't Do for You"
series: "The Five Things AI Won't Do for You"
seriesOrder: 3
draft: false
lang: "en"
image:
  src: "/images/blog/solucion-elaborada-ia-primero.svg"
  mobileSrc: "/images/blog/solucion-elaborada-ia-primero-mobile.svg"
  alt: "Illustration of overengineered code architecture"
readingTime: 8
translationId: "solucion-elaborada-ia-te-da-primero"
audio: true
---

You ask AI for a user management API. It hands you a microservice with OAuth2, rate limiting, logging middleware, and a Redis caching layer.

All you needed was four CRUD endpoints and basic validation.

That's not a bug. That's the default behavior. And if you don't recognize it as a problem, every line of code you accept is technical debt you never asked for.

## Code That Looks Like It Works

IEEE Spectrum published an analysis in January 2026 that should worry you. The latest AI coding assistants are producing **silent failures**: code that runs cleanly but doesn't do what it should. Not build errors. Not crashes. Quiet, invisible wrong behavior.

The author, CEO of Carrington Labs, documented how GPT-5 generates code that avoids crashes by stripping safety checks or producing fake output that happens to match the expected format. The model isn't broken. It's doing exactly what it was optimized to do: make things *look* like they work.

Now scale that up from code to architecture.

If AI already optimizes for the appearance of correctness at the line level, what do you think happens at the system level? It doesn't pick the solution that best fits your problem. It picks the most common one in its training data. And that data is heavily skewed toward mature enterprise code: repos with thousands of stars, teams of dozens, applications built to scale to millions.

Your 200-line script gets the architecture of a 200,000-line application. Not because it's right, but because it's the most statistically probable thing the model can produce.

## The Judgment Gap

Here's a line from Anthropic's engineering blog that deserves more attention than it gets: *"agents are non-deterministic users of deterministic tools."* AI agents use tools in ways you can't predict. Anthropic wrote this about autonomous agents, but it applies just as well when you ask AI to design your software.

Think about what happens when a senior developer chooses between a relational database and a document store. They weigh data volume, access patterns, team constraints, project timeline. That's engineering judgment. AI doesn't have it. It has statistical patterns. And the most frequent patterns in its training data point to enterprise applications with requirements that look nothing like yours.

Anthropic makes a related point about **tool descriptions**: they need to be as carefully designed as the prompts themselves, because they define the contract between the agent and its action space. Your design constraints play exactly the same role. Timeline, team size, acceptable complexity, existing stack. These are the boundaries that tell AI what "good" looks like for *your* project. Leave them out, and AI fills the vacuum with whatever solution shows up most often in its training data.

Here's what that looks like in practice. You ask: "design the data model for a task management app." No constraints. You get back separate tables for users, workspaces, projects, tasks, subtasks, labels, comments, attachments, and permissions. Ten tables with many-to-many relationships. For a personal to-do app with one user.

The most common solution is almost always the most elaborate one.

## The Right Altitude

Anthropic has a concept in context engineering called **"right altitude."** It's the sweet spot between instructions that are too rigid and instructions that are too vague. This idea explains a lot about why AI over-engineers everything.

One extreme: you tell AI exactly how to implement every component. "Use Express with middleware X, structure Y, pattern Z." Too rigid. You lose the model's ability to contribute something you hadn't thought of. And if one detail is off, the whole thing falls apart.

Other extreme: "Build me a user API." Too vague. No constraints means AI fills in every blank with its own defaults. And its defaults belong to a company with 50 engineers. Not your three-person team. Not your weekend side project.

This isn't a flaw. It's how the model works. If 90% of the user management code it's trained on includes OAuth, it'll include OAuth. If most APIs in its dataset have rate limiting middleware, you're getting rate limiting. Every pattern it adds "by default" was the right call *somewhere*. Just probably not here.

The fix is communicating constraints without dictating implementation. Something like: "I need a user API for an MVP. Single developer. At most a thousand users the first year. No auth needed, it sits behind an API gateway. Prioritize simplicity over extensibility."

Five sentences. They eliminate roughly 80% of the bloat.

## Gratuitous Complexity

There's a name for what you get when you skip that step: **gratuitous complexity**. Layers of abstraction that AI introduces without being asked. Each one carrying its own maintenance cost. Technical debt disguised as best practices.

AI gives you a microservice when you need a script. An ORM when you need a query. A framework when you need a function. A plugin system when you need an if-else.

Try it yourself. Ask for "a function that reads a CSV and returns the rows with errors." Count the layers in the response. You'll probably get an abstract validator class, a Strategy pattern, configurable logging, multi-encoding support, and streaming for gigabyte-scale files. Five layers of abstraction for something twenty lines of Python could handle.

Every one of those "just in case" layers has a real price tag. More code to read. More dependencies to keep current. More surface area for bugs. More onboarding time for whoever inherits the project.

And here's the kicker: the models themselves aren't great at this. OpenAI's SWE-Lancer data shows Claude 3.5 completed only 26.2% of practical engineering tasks and 44.9% of technical management decisions. If the models struggle with real design choices, handing them design decisions without explicit constraints is setting them up to fail.

The worst part? Gratuitous complexity *looks* professional. A surface-level code review won't flag it. It follows recognized patterns. The class names sound like Clean Architecture. The problem isn't that the code is bad. The problem is that it shouldn't exist.

## To Design Is to Constrain

If you've been following this series, you see the pattern forming. Understanding your project establishes what problem you're solving. Planning establishes how you'll solve it. Design establishes *what you won't do*.

Design doesn't mean UML diagrams or 40-page architecture docs. It means three decisions that AI cannot make for you.

**What's the timeline?** A prototype you're validating in two weeks has completely different constraints than a system that'll run in production for three years. AI doesn't know which one you're building unless you say so. A prototype can run on SQLite with hardcoded routes and zero abstraction. A production system needs something else entirely. But AI will give you the production version every single time.

**What level of complexity can you actually maintain?** This comes down to who's going to own the code, how much experience they have with the stack, and how much time you can burn on problems that aren't business problems. CQRS might be the right call for a twenty-person team that lives and breathes Domain-Driven Design. For two juniors? It's a trap. AI always assumes the highest level because that's what dominates its training data.

**What don't you need?** Hardest question. Most valuable one. Every feature you explicitly exclude kills an entire chain of implementation decisions AI would have made for you. "No auth." "No i18n." "No multi-tenant." These aren't limitations. They're design decisions that fundamentally reshape the solution.

Next time you're about to prompt AI, do this first: write down three things your project *doesn't* need. Then write your prompt. Watch how different the response is.

That's not a prompt engineering trick. That's design. It's the difference between telling an architect "build me a house" and "build me a house for two people, no garage, budget of X." The second brief doesn't produce a worse house. It produces the right house.

## The Right Solution

Experienced developers have an intuition that AI can't replicate: knowing when something is enough. Not "enough" as in mediocre. "Enough" as in it solves the problem without creating new ones.

The next article in this series covers the fourth activity: generating code. But if you've made it this far, you already get why that's the least important of the five. The quality of what AI generates depends entirely on the design decisions you made before you ever opened the chat window.

The right solution isn't the most robust one. It's the simplest one that survives your timeline. And that's a decision only you can make.

---

*This article is part of the series "The Five Things AI Won't Do for You" on [Beyond Vibe Coding](https://youtube.com/@BeyondVibeCoding). New article every week.*
