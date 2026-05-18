## YOU NEED TO COMMIT THIS FILE BEFORE MOVING ON TO THE NEXT MODULE ! 🚨

**feel free to delete this comment**

# Module 1 — Reflection

**Team name**: **\*\***\_\_\_**\*\***
**Branch**: `module-01/<team-name>`
**Submitted**: before Module 2 lesson

---

Answer the three questions below. There are no right or wrong answers — we are looking for your reasoning, not a textbook definition. A few honest sentences are worth more than a long generic paragraph.

---

## 1. The "why"

You started from a painful monolith. Now you're splitting it into separate services.

**What concrete problem does that split solve: and for whom?**

Think about it from three angles: the developer who has to change code, the team that has to deploy it, and the user who has to live with its failures. You don't need to cover all three, pick the one that felt most real to you today.

> _Your answer: Notification systems are highly asynchronous and I/O intensive. Node.js handles concurrent connections efficiently using its event loop architecture, making it well suited for real-time notifications, websocket connections, and external API calls.

This demonstrates an important microservices principle: each service can use the technology best suited for its specific responsibilities instead of forcing one language across the entire platform.


---

## 2. Your choice

Look at your service map. Every arrow between two services is a decision someone made.

**Pick one boundary, one place where you decided service A should not be part of service B. Explain why that line exists.**

What would break, slow down, or become harder to manage if you merged those two services back together?

> _Your answer: If activity-service called logging-service synchronously:

user requests would become slower
failures in logging-service could break activity features
services would become tightly coupled

Using asynchronous events improves resilience, scalability, and fault tolerance because activity-service can continue working even if logging-service is unavailable.


---

## 3. The tradeoff

Microservices solve the monolith's problems. But they create new ones.

**Name one thing that was simpler in the monolith and is now harder in your distributed design.**

No need to solve it: just name it honestly. This is exactly the tension the rest of the course is about.

> _Your answer: Activity logs may contain personal user data such as:

user IDs
behavioral activity
timestamps
interaction history

Under GDPR regulations, storing and processing personal data may require explicit user consent. The logging-service must verify consent before persisting data to remain legally compliant.


---

_Keep this file. You will refer back to it during the oral presentation._
