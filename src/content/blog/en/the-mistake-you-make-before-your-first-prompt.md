---
title: "The mistake you make before your first prompt"
description: "There are two ways to get AI-assisted coding wrong: letting it decide too much when you know nothing, and letting it ignore everything you do know. Both stem from the same problem."
pubDate: 2025-02-12
updatedDate: 2025-02-12
author: "Prompt Lúcido"
tags: ["ai", "development", "greenfield", "brownfield", "software engineering"]
category: "fundamentals"
draft: false
lang: "en"
image:
  src: "/images/blog/greenfield-vs-brownfield.svg"
  mobileSrc: "/images/blog/greenfield-vs-brownfield-mobile.svg"
  alt: "Two developers facing completely different projects"
readingTime: 7
translationId: "mistake-before-first-prompt"
---

AI hasn't changed what you need to know to build software. It has changed where you put your attention.

There are two ways to get AI wrong: letting it decide too much when you know nothing, and letting it ignore everything you do know. The two mistakes seem like opposites, but they stem from the same problem: not understanding what information the AI has and what information you have.

Let's talk about that.

## Two developers, a Monday morning

We have two developers. Both open their editor, both are going to use AI, both are good at what they do. One has an empty project and everything to decide. The other has a three-year-old monolith with 80,000 lines of code.

If their strategy with AI is the same, both are going to run into problems — completely different problems.

The first is in what software engineering calls *greenfield*: virgin territory, no constraints, no existing code, no decisions made. The second is in *brownfield*: a system that already exists, with history, hidden dependencies, team conventions, and deliberate technical debt.

Most content about AI-assisted development assumes you're in greenfield. "Generate a complete app with a single prompt." But most professional developers spend their time in brownfield. And the difference isn't a minor detail — it's what determines whether AI helps you or sabotages you.

## The inverted asymmetry

Here's the central idea, and it's worth thinking about carefully.

In **greenfield**, you know less than you think. You haven't discovered the hard problems yet, you haven't hit the edge cases, you haven't had to choose between two bad options. But the AI "knows" more than it should: it has patterns from millions of projects and will hand you a complete, convincing, and premature architecture. The danger is that it fills the decision vacuum with assumptions that seem reasonable but aren't grounded in your actual context.

In **brownfield**, exactly the opposite happens. You know more than the AI can possibly know: why that database was chosen, which module can't be touched because three teams depend on it, which naming convention nobody documented but everyone follows. The AI, on the other hand, knows less than it needs to. And yet it acts with full confidence on a system it doesn't understand.

The same risk, confidence without context, manifesting in two opposite ways.

## The transition nobody tells you about

This is where it gets interesting. Greenfield and brownfield aren't two static categories. They're a spectrum, and every project moves in one direction only: toward brownfield.

Every commit, every dependency added, every architectural decision narrows the space of possibilities and widens the information asymmetry between you and the AI. Day one of a project is the only moment when you and the AI have the same information. After the first commit, you're in brownfield.

With the agentic coding tools we have today (Claude Code, Cursor in agent mode, Windsurf), this transition happens faster than ever. You can have thousands of lines of AI-generated code within hours. Your project becomes brownfield *of someone else's code*. And that's the worst kind of brownfield, because you don't even have the history in your head.

## It's not one activity — it's five

When we say "using AI to code," we're lumping together at least five distinct activities. And in each one, the greenfield/brownfield dynamic plays out differently.

**Understanding.** In greenfield, AI can function as a simulated domain expert that helps you think through edge cases you wouldn't have considered. But it responds with the "average case" from its training data. If your domain has particularities — local regulations, industry conventions, or client constraints — the AI doesn't know about them. And you might not realize they're missing. In brownfield, AI is very good at explaining what a module does. But it can't tell you *why* it was written that way. It understands syntax and local semantics, not historical intent.

**Planning.** In greenfield, AI works well as a sparring partner, but only if you bring real constraints. A useful trick: ask for three architecture alternatives with explicit tradeoffs, instead of "the best solution." In brownfield, planning isn't "what system to build" but "how to intervene without breaking anything." It's surgery, not construction. The key skill is scoping: knowing exactly which part of the system to touch, what context the AI needs for that specific part, and what it must not touch.

**Designing.** AI has a bias toward complexity. Its training data overrepresents mature, enterprise-grade, well-documented code. It underrepresents "simple code that works for a small team." If you don't explicitly ask for the simplest solution, it will give you the most elaborate one. On top of that, AI doesn't understand your time horizon. It can't distinguish between a two-week prototype and a five-year product, and that constraint changes everything.

**Generating code.** This is where AI shines most visibly — and where the most danger lies. Every time AI generates code, it makes dozens of decisions it doesn't consult you on: directory structure, dependencies, error handling patterns, naming conventions. Most are reasonable. Some are wrong for your case. These are what we might call *ghost decisions*: they're there, they affect your project, and you didn't choose them.

**Verifying.** In greenfield, verification means "does it do what I want?" — which requires having specified what you wanted. When AI generates both the code and the tests, the tests tend to verify *what the code does*, not *what it should do*. They're tautological tests. In brownfield, verification means "did I break something that already worked?" — a fundamentally harder problem. AI can generate regression tests for existing untested code, and that's enormously valuable. But the most dangerous bugs come from *interactions* between components, not from individual components.

## Three questions before any prompt

If you take away one practical thing from all this, let it be these three questions. Before any interaction with AI for development:

**Am I building something new or modifying something existing?** The answer completely changes your strategy. In greenfield, your job is to set constraints before the AI fills the vacuum. In brownfield, your job is to transfer context without overwhelming it.

**What does the AI know that I don't, and what do I know that the AI doesn't?** This is the question almost nobody asks. In greenfield, the AI knows more patterns than you, but it doesn't know your actual constraints. In brownfield, you know the history and intent; the AI only sees the current code.

**What's my verification strategy for what it generates?** If you don't have an answer to this before generating, you're vibe coding. And vibe coding works until it doesn't — which tends to be when it's already too late to go back.

## What hasn't changed

Understanding complexity, designing clean interfaces, writing meaningful tests, managing technical debt. Those fundamental software engineering skills remain exactly the same. What has changed is the distribution of time: less time writing code, more time thinking, reviewing, and deciding.

The "meta" skills (planning, evaluating, deciding) are now more valuable than the "object" skills (writing code that compiles). And that's not a problem. It's an opportunity for developers who prefer to think.

---

*This article is adapted from the first episode of [Prompt Lúcido](https://youtube.com/@BeyondVibeCoding), a channel about AI-assisted development for developers who prefer to think. New video every week.*
