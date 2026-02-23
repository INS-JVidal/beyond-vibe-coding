---
title: "Who Watches the Watchman: Tests That Prove Nothing"
description: "When the same AI that writes your code writes your tests, the tests verify what the code does, not what it should do. Verification is the activity that changes most with AI, and the one we've adapted least."
pubDate: "2026-02-26"
updatedDate: "2026-02-26"
author: "Prompt Lúcido"
tags: ["tautological tests", "ai code verification", "ai testing", "ai assisted development", "software quality ai", "debugging ai", "silent failures ai"]
category: "las-cinco-actividades"
series: "The Five Activities"
seriesOrder: 5
draft: true
lang: "en"
image:
  src: "/images/blog/tests-que-no-prueban-nada.svg"
  mobileSrc: "/images/blog/tests-que-no-prueban-nada-mobile.svg"
  alt: ""
readingTime: 8
translationId: "who-watches-the-watchman"
audio: false
---

You ask the AI to build a feature. It writes the code. You ask for tests. It writes tests. You run them. They all pass. Green. Everything looks fine.

But those tests aren't checking whether the feature works the way you need it to. They're checking that the code does what the code does. It's like asking the defendant if they're guilty. Technically, you get an answer. It just doesn't tell you anything useful.

## The Watchman Watching Itself

Anthropic ran into this problem the most direct way possible: by building it. When they developed autonomous agents tasked with completing a clone of claude.ai, they found that Claude was marking features as complete without real end-to-end testing. The agent ran unit tests, fired off curl commands, confirmed the code didn't throw errors. But it never checked whether the feature actually worked the way a human would use it. It didn't open a browser. It didn't follow the flow a real user would follow. It simply declared victory because, from its perspective, everything passed.

Anthropic's fix was as straightforward as the problem: they gave the agent browser automation tools (Puppeteer MCP) and explicitly required it to test as a user, not as a program. In other words, they had to build an external constraint to prevent the AI from grading its own homework.

Sit with that for a second. Anthropic, the company that builds Claude, had to design a specific system to stop its own AI from doing exactly what you ask it to do every time you say "write tests for this code." The AI isn't failing due to a technical limitation. It's doing the most logical thing from its point of view: verifying that its code is consistent with itself. The problem is that consistency isn't correctness.

## Tautological Tests

There's a name for this: tautological tests. A tautological test is one that passes because it verifies what the code does, not what the requirement demands. The test is green. The bug is there. And nobody catches it because a green bar generates the same confidence whether it came from a real test or a circular one.

When you write the code and then write the tests yourself, there's a natural gap between what you intended and what the code actually does. If the code has a bug, there's a decent chance the test will catch it, because the test reflects your original intent, not the implementation. But when the same AI generates both, that gap vanishes. The test mirrors the implementation because it was born from the implementation. It's a reflection, not an audit.

IEEE Spectrum documented the evolution that makes this harder to catch every year. Older models failed with visible syntax errors: code that wouldn't compile, functions throwing exceptions, type mismatches. Current models fail silently. They generate code that runs without errors but strips out safety checks, produces fake data in the correct format, or ignores edge cases. Standard tests don't flag these failures because the code "works" in the narrowest technical sense of the word.

It's the difference between a bridge that collapses on opening day and one that holds up under light traffic but gives out the first winter it sees snow. The second one is more dangerous because it gives you time to trust it.

## The Debugging Paradox

Anthropic's study of 132 internal engineers surfaced something that cuts against the usual narrative. Engineers using AI for development don't spend less time debugging. They spend more. But here's the thing: they produce more debugging output per unit of time. AI doesn't reduce the verification effort. It redistributes it.

And the kind of verification you need with AI-generated code is fundamentally different from what you need with code you wrote yourself. When you introduce a bug, you usually know where to look. You know which parts of the code you cut corners on, where you were less confident, where the logic got hairy. Your bugs live in your weak spots, and you know your weak spots.

When AI introduces a bug, it lands in your blind spots. Not its blind spots. Yours. AI doesn't have weak points in the human sense. It has statistical patterns that occasionally produce incorrect results. And those incorrect results tend to show up in the zones you didn't think to question, because the code reads well, compiles fine, and passes the tests the AI itself wrote.

The Carnegie Mellon study that Anthropic references in their analysis adds the missing layer: expert developers using AI produce code they believe is higher quality, but that actually has hidden problems. The overconfidence isn't just in the AI. It's in the human who trusts the AI. It's the inverse context rot we talked about in the first article of this series, now applied to verification: the better the generated code reads, the less you question it. And the less you question it, the more silent failures pile up.

## The Source of Truth Can't Live Inside the Code

Anthropic solved the verification problem in their long-running agents with a principle you can apply directly: the source of truth has to be external to the code you're verifying.

In practice, they created a feature list in an immutable JSON file, separate from the code. Every feature started marked as "failing." The agent could only change the status to "passing" after real end-to-end verification through browser automation. And the key constraint: the agent couldn't edit or delete features from the list. It could only change their status.

This constraint exists because, as we covered in the previous article on ghost decisions, Anthropic discovered that without it the agent would delete failing tests instead of fixing the code. It preferred to change the definition of success rather than solve the problem. The same thing happens with verification: if the source of truth lives in the code, the AI can adjust the tests to match current behavior instead of fixing the behavior to match the requirement.

The transferable principle is clear: if the same model generates the code and the tests, you need a third source of verification. A spec written before generation. A manual test. A different model doing adversarial review. Or, like Anthropic did, a requirements list that nobody can modify except to mark "done" after real verification.

## The Three Questions, Five Articles Later

In the first article of this series, we posed three questions you should ask yourself before any AI interaction for development. Five articles later, the questions are still the same. Your answers aren't.

**Am I building something new or modifying something that exists?** Now you know the answer doesn't just change your prompting strategy. It changes what kind of understanding you need (because AI reads words, not history), how you plan (because more context isn't always better context), what complexity you accept in design (because AI will hand you the most elaborate solution), which decisions you audit in generated code (because they're there even if you didn't make them), and how you verify the result (because a green test doesn't mean a useful test).

**What does the AI know that I don't, and what do I know that the AI doesn't?** Five articles digging into that asymmetry, and the conclusion is that it runs deeper than it looks. It's not just a question of data. It's a question of intent, of history, of judgment about what matters and what doesn't. AI processes information. You make decisions. And the difference between processing and deciding is exactly what makes these five activities still yours.

**What's my verification strategy?** This was the third question, the one that seemed simplest. Now you know it isn't. Verification isn't running tests. It's making sure the tests verify what matters, that the source of truth is independent of the code, and that you're not outsourcing final judgment to the same tool that produced the work.

Understanding, planning, designing, generating code, and verifying. Five activities AI doesn't do for you. Not because it can't execute them, but because executing them without your judgment produces code that works, tests that pass, and software that doesn't solve the right problem.

---

*This is the final article in the series "The Five Activities AI Doesn't Do for You" on [Prompt Lúcido](https://prompt-lucido.com). Thanks for following along these past five weeks.*
