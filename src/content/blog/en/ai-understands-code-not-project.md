---
title: "AI Understands Your Code. It Doesn't Understand Your Project."
description: "AI models solve 80% of benchmark problems but collapse to 23% when the task demands real comprehension. The gap between those two numbers is exactly what you bring to the table — and what you should never delegate."
pubDate: "2026-02-17"
updatedDate: "2026-02-17"
author: "Prompt Lúcido"
tags: ["ai", "development", "understanding", "context", "software-engineering"]
category: "the-five-activities"
series: "The Five Activities"
seriesOrder: 1
draft: false
lang: "en"
image:
  src: "/images/blog/ai-understands-code-not-project.svg"
  mobileSrc: "/images/blog/ai-understands-code-not-project-mobile.svg"
  alt: ""
readingTime: 8
translationId: "ai-understands-code-not-project"
---

You've got a bug in production. An endpoint returns inconsistent data, but only when two users edit the same resource within a three-second window. You paste the controller code into Claude, describe the problem, and in under a minute you get a detailed response: the model identifies the race condition, explains why it happens, and proposes an optimistic locking solution that is technically flawless.

Except that endpoint shouldn't exist. It was created eight months ago as a temporary workaround because the product team needed a demo for a client who never signed. The real permissions system was designed afterward and makes it redundant. The correct fix isn't to solve the race condition — it's to remove the endpoint and redirect calls to the flow that already works. But the AI doesn't know that, because none of it is in the code.

## What Fails Isn't Capability — It's Comprehension

In early 2026, AI models solve over 80% of the problems on SWE-Bench Verified — the classic software engineering benchmark. Claude Opus 4.5 leads that table. It looks like AI can code nearly as well as a senior engineer.

But in September 2025, Scale AI released SWE-Bench Pro, a benchmark designed for something different: long-horizon tasks on repositories with copyleft licenses and proprietary startup codebases — tasks that would take a professional engineer hours or days. Here the numbers shift dramatically: the best models, including GPT-5 and Claude Opus 4.1, didn't crack 23% resolution.

The most telling data point, though, isn't that number. It's what happened when the researchers stripped out human-written specifications — the requirements, the interfaces, the expected behavior descriptions. GPT-5 dropped from 25.9% to 8.4%. Same model, same code, same problem. The only difference was removing the human context. Performance collapsed to a third.

And the most revealing part is the type of failure. The trajectory analysis showed that Claude Opus 4.1 fails primarily through what the study calls "semantic understanding issues" — technically correct solutions to the wrong problem, accounting for 35.9% of its failures. It's not that the code has bugs. It's that it solves a problem nobody asked it to solve. The model understands syntax with pinpoint precision. It understands intent poorly.

Here's what no benchmark table shows you: the jump from 23% on SWE-Bench Pro to 80% on SWE-Bench Verified doesn't reflect a jump in comprehension. It reflects that easier problems don't require deep understanding — just clean technical execution. When the problem demands understanding *why* the code is the way it is, the numbers crater.

## The Dictionary and the Historian

Most content about AI and development takes for granted that "understanding code" is something models already do well. And in a sense, that's true. Ask Claude to explain what a function does and it'll give you a precise answer. Ask it to trace the data flow across three modules and it won't break a sweat. The problem is that this is only one type of comprehension: local semantics. What this code does, how it connects to that other module, what values it expects and returns.

But there's another layer AI doesn't touch: historical intent. Why this code exists. What team decision led to this architecture instead of another. What business constraint gave that module its odd shape. What was tried before and didn't work.

The difference is the same as between a dictionary and a historian. A dictionary tells you what each word means. A historian tells you why that sentence was written at that moment. AI is an extraordinarily good dictionary. But what you need is a historian.

This distinction matters because the activity of understanding — the first and most important of the five we explore in this series — isn't "comprehending the code." It's comprehending why the code is this way and not another. And that includes understanding the things that aren't written in any file.

## Two Worlds, Two Different Problems

If you read the introductory article in this series, you'll recall that the information asymmetry between you and the AI shifts radically depending on whether you're in a greenfield or brownfield project. When it comes to understanding, that gap widens further.

In brownfield — which is where most professional development lives — the problem is straightforward: AI has no memory. Every time you open a new conversation, the model arrives with zero knowledge of what was discussed before, what decisions were made, what dead ends were already explored. Anthropic's team documented this in November 2025 when they published their article on harnesses for long-running agents: even a frontier model like Opus 4.5, running in a loop with the Claude Agent SDK, fails when trying to build a complete application from a high-level prompt alone. The problem wasn't the model's capability — it was that each new session starts with no memory of what came before. Like a team of engineers working in shifts where every new person arrives without remembering anything from the previous shift.

This means that in brownfield, understanding is fundamentally your job. AI can help you analyze what's there — read unfamiliar code, trace dependencies, generate technical documentation. But it can't tell you why a part of the system is shaped that way. If you delegate "understanding" to AI on a brownfield project, you'll get technically correct analyses that ignore all the context that matters.

In greenfield it seems easier, because in theory there's no history. But the problem here is different and more subtle. Anthropic described in their context engineering article how context isn't infinite — it's a finite resource where every token competes with the rest for the model's attention. Models are optimized to produce the most likely response given the data distribution they were trained on. In practice, this means that when you ask AI to design a solution from scratch, it converges toward the standard solution — the "average answer" from the dataset.

Think about it: if you ask AI to architect a task management app, it's going to propose something that looks a lot like what already exists across the thousand task-app repositories it was trained on. Technically solid, generically correct — and probably wrong for your project's specific needs. Because what makes your project different isn't in the training data. It's in your head, in the conversations with your team, in the business constraints you haven't written down anywhere yet.

And here's the trap: since there's no existing code to analyze in greenfield, it feels like there's nothing to "understand." But there is — what you need to understand is your own problem with enough depth to tell the standard solution apart from the right one. Without that work upfront, the AI doesn't converge toward your solution. It converges toward everyone's.

## Inverse Context Rot

There's a technical concept from Anthropic that deserves a twist. In their September 2025 article on context engineering, the engineering team described what they call "context rot": as the context window grows, the model's attention degrades. The information is there, but it works worse — as tokens pile up, signal gets diluted by noise.

What I find more interesting is that this has a mirror on the human side, and nobody talks about it. I'm going to call it **inverse context rot**: the more plausible and articulate the AI's response, the less the developer questions what's missing from it.

It's a cognitive bias fueled by the model's fluency. When Claude gives you a perfectly structured three-paragraph explanation of how a module works, your brain reads that fluency as deep understanding. But the AI isn't telling you it understands — it's telling you what it can infer from what you gave it. Everything you didn't give it doesn't exist for the model. And when the response sounds that good, you stop asking yourself what's missing.

Inverse context rot is especially dangerous in 2026 because models are better than ever. Opus 4.6 writes more fluently, structures arguments better, and generates more convincing responses than any previous model. That doesn't mean it understands your project better — it means it's easier for it to convince you that it does. And as we saw with SWE-Bench Pro, the difference between an AI with human context and without it isn't marginal — it's three to one.

## Before You Ask, Understand What It Doesn't Know

There's a practical rule you can apply starting with your very next AI session. Before writing a prompt, ask yourself one question: **What does the AI know about this, and what can't it know?**

In brownfield, the answer is almost always: it can read the code but doesn't know why it's that way. Your job before the prompt is to decide what historical context it needs — and provide it explicitly. Not everything. The context relevant to the task.

In greenfield, the answer is different: the AI knows what's standard but doesn't know what makes your project particular. Your job before the prompt is to define the constraints and peculiarities — and make sure the model doesn't converge toward the generic solution.

In both cases, "understanding" isn't something you delegate. It's something you do before you delegate anything else.

## The Invisible Foundation

Of the five activities we explore in this series — understand, plan, design, generate, and verify — understanding is the least visible and the most impactful. A code generation error gets caught by a test. A planning error gets caught in review. But a comprehension error can go undetected for weeks, because the code works perfectly... for the wrong problem.

AI is a dictionary, not a historian. It reads the words, not the story. And the next time it gives you an impeccably articulate response, remember that fluency isn't comprehension — sometimes it's the exact opposite.

In the next article, we cover the second activity: planning. Because once you truly understand what you're dealing with, the immediate temptation is to generate code. And that's where the second mistake begins.

---

*This article is part of the series "The Five Activities AI Won't Do for You" on [Beyond Vibe Coding](https://youtube.com/@BeyondVibeCoding). New article every week.*