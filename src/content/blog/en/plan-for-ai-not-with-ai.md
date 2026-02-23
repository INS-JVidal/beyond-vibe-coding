---
title: "Don't Plan with AI. Plan for AI."
description: "AI doesn't save you planning time. It shifts where you spend it. And if you don't decide where, it decides for you."
pubDate: "2026-02-23"
updatedDate: "2026-02-23"
author: "Prompt Lúcido"
tags: ["ai assisted development", "ai coding", "software planning", "context engineering", "greenfield brownfield", "claude code", "attention budget", "scoping"]
category: "fundamentals"
series: "Five Things AI Won't Do for You"
seriesOrder: 3
draft: false
lang: "en"
image:
  src: "/images/blog/planificar-para-la-ia.svg"
  mobileSrc: "/images/blog/planificar-para-la-ia-mobile.svg"
  alt: ""
readingTime: 8
translationId: "plan-for-the-ai"
audio: false
---

You open your editor. Fresh project, empty folder. You tell the AI: "Build me a REST API for task management with auth, a database, and deploy on AWS." In under a minute you've got a full architecture with diagrams, dependencies, and a five-phase execution plan. Looks solid. You hit accept.

You just made the most expensive mistake in AI-assisted development. Not because the plan is bad, but because you have no way of knowing whether it's good. The AI didn't plan with you. It planned for you. And the difference between those two prepositions is what separates a project that works from one that only looks like it does for the first 48 hours.

## The trap of the convincing plan

Here's a number that should change how you think about planning with AI. In an internal study at Anthropic involving 132 engineers and over 200,000 Claude Code sessions, published in December 2025, the headline finding was a roughly 50% productivity boost. But the really interesting data point was buried elsewhere: 27% of AI-assisted work wouldn't have been done at all without AI. And at the same time, engineers reported spending more time verifying AI output, not less.

Sit with that for a second. More work shipped, but more time spent checking it. In other words, AI doesn't eliminate planning. It moves it. And if you don't decide where it goes, you end up spending it on fixing things that shouldn't have been generated in the first place.

This ties directly into something we covered in ["The Mistake You Make Before Your First Prompt"](/blog/the-mistake-before-first-prompt): the information asymmetry between you and the AI runs in opposite directions depending on whether you're in greenfield or brownfield. When it comes to planning, that asymmetry gets amplified. Because when you ask the AI to plan, you're delegating the one activity where knowing what it doesn't know matters most.

## The one-shot syndrome

When Anthropic built their first long-running agents, they ran into a pattern they documented in "Effective harnesses for long-running agents": Claude kept trying to solve entire projects in a single pass. One attempt, one architecture, everything at once. The team called it "one-shotting" and flagged it as one of the most persistent failure modes in the model's behavior.

The fix wasn't giving the agent a better plan. It was imposing a structure that made it impossible to plan everything upfront: one feature at a time, with descriptive commits between each step and progress files tracking the current state. They didn't improve the planning. They constrained it.

Think about what that means for you. When you kick off a greenfield project and ask the AI for a full plan, you're reproducing the exact pattern that the people who built the AI identified as broken. The AI generates an architecture that sounds right, covers all the bases, holds together nicely. And that's precisely what makes it dangerous: it's convincing before it's correct.

The plan AI proposes in greenfield isn't based on what your project actually needs. It's based on what statistically shows up in similar projects. Put differently, it's an average plan for a project that hasn't figured out what makes it different yet. And accepting an average plan at the start of a project is the surest way to guarantee your architecture won't hold up when the hard decisions arrive, the ones that actually require real context.

A Carnegie Mellon study, referenced in Anthropic's own analysis, adds another layer: experienced developers become 19% slower when using AI tools, while believing they're moving faster. It's not that the tool fails. It's that the overconfidence the tool creates shuts down exactly the kind of thinking that planning demands. The more convincing the plan sounds, the less you question it. And the less you question it, the worse the outcome.

## In brownfield, the plan isn't what you do. It's what you show.

If the greenfield problem is accepting a plan too early, the brownfield problem is different: dumping too much context on the AI all at once. And this one has a technical basis worth understanding.

In their article on context engineering, Anthropic introduced a concept they put this way: "LLMs, like humans, have an attention budget." It's a sentence that sounds simple, but it has deep implications for how you plan. Every token that enters the context window eats into the model's capacity to pay attention. And model performance degrades as context grows, even when there's technically room left in the window.

I'm going to call this the attention budget, because that's exactly what it is: a finite resource you spend every time you add information to the prompt. More context doesn't always produce better results. Sometimes it produces worse ones.

In brownfield, your project already has a history. It has implicit conventions, accumulated tech debt, dependencies that live in people's heads rather than in the code. The natural temptation is to dump all of that into the context so the AI "understands" the project. But that blows through the attention budget. You're asking it to process everything in order to understand one part, and the result is that it processes everything poorly.

What Anthropic recommends, and what works for both agents and human developers, is what they call progressive disclosure: revealing context in layers, in the order the task requires, with just enough detail for each step. The bottom line is that instead of front-loading all the context at once, you let the process discover what it needs layer by layer.

In practice, planning in brownfield isn't about writing a massive spec document for the AI. It's about deciding what you show it, in what order, and at what level of detail. Say you need to refactor an auth module. You don't hand over the entire codebase. You start with the module itself, then the existing tests, then the direct dependencies. Each step spends attention budget, and you're the one deciding how to spend it.

That's the difference between planning with the AI and planning for the AI. Planning with the AI means saying "here's everything, make me a plan." Planning for the AI means deciding what information it needs, in what sequence, and what it can safely ignore. Put another way: in the first case, you're outsourcing the thinking. In the second, you're applying it where it counts.

## Scoping as a core skill

If you pull all of this together, a clear pattern emerges. In greenfield, the mistake is accepting the first complete plan. In brownfield, the mistake is giving all the context at once. Both are variations of the same thing: confusing planning with generation.

The real activity AI won't do for you is scoping. That is, deciding what needs to happen next, at what level of detail, and what stays out of scope. That takes judgment the AI doesn't have, because it depends on things that aren't in the code: deadlines, team priorities, tech debt you can live with versus debt you can't, features that matter to users versus features that only matter to the roadmap.

Scoping is, for example, what turns "build me a task API" into "first I need the data model and basic auth, no roles, no deploy, just the structure that lets me validate that entity relationships work before I build on top of them." The second prompt isn't longer for the sake of it. It's more precise because someone did the work of figuring out the minimum that needs to exist before anything else.

Here's a concrete method you can use before any AI interaction on a project, whether greenfield or brownfield.

First, define the unit of work. Not "the app." Not "the module." The next increment that stands on its own. Something you can verify when it's done, without needing what comes after it to exist.

Second, take inventory of your context. In greenfield: what constraints do you have that aren't obvious (team stack, existing infrastructure, conventions you want to keep). In brownfield: what does the AI need to know about what already exists, and in what order.

Third, write down your acceptance criteria before generating anything. If you can't define when something is "done," neither can the AI. And you'll end up verifying without criteria, which is worse than not verifying at all.

This isn't a checklist to follow mechanically. It's a way of thinking that ensures that by the time you open a conversation with the AI, you've already done the work it can't do for you.

## The skill nobody teaches

The difference between a junior and a senior developer working with AI isn't prompt quality. It's scoping quality. The junior asks the AI for a full plan and accepts the first one that sounds good. The senior already knows what they need before they open the chat, and uses the AI to execute increments they've already defined.

To be clear: that doesn't mean AI can't help with planning. It means it helps after you've done the scoping. You can ask it to spot risks in your plan, suggest alternatives to a specific decision, or generate the structure for an increment you've already scoped out. But the call on what comes first, what stays out, and how much context to provide at each step? That's yours. Always yours.

In the next article, we'll dig into the third activity: designing. Because once you've nailed the scoping, the next question is how to turn that increment into a structure the AI can generate with precision, without making up what you didn't tell it.

---

*This article is part of the series "Five Things AI Won't Do for You" on [Prompt Lúcido](https://prompt-lucido.com). New article every week.*
