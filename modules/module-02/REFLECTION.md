# Module 2 — Reflection

**Team name**: _______________
**Branch**: `module-02/<team-name>`
**Submitted**: before Module 3 lesson

---

Answer the three questions below. There are no right or wrong answers — we are looking for your reasoning, not a textbook definition. A few honest sentences are worth more than a long generic paragraph.

---

## 1. The "why"

You built a service with distinct layers: models, schemas, repository, service, and routes — each with a single responsibility.

**Why not just put everything in one file and call it done?**

Think about what happens six months later when someone new joins the team, or when you need to swap SQLite for PostgreSQL. What does the layered structure protect you from?

> *Your answer:*
Putting everything in one file might work for a very small project, but it quickly becomes difficult to maintain as the application grows. The layered structure keeps responsibilities separated, which makes the code easier to understand, test, and modify later.

For example, if we decide to switch from SQLite to PostgreSQL in the future, most of the changes would stay inside the repository or database layer without affecting the routes or business logic. It also helps new developers understand the project faster because each file has a clear purpose.

This structure protects the project from becoming tightly coupled and disorganized over time.
---

## 2. Your choice

Each service owns its data exclusively — no other service is allowed to touch its database directly.

**Pick one entity your service owns (e.g. `User`, `Game`). What would go wrong if another service could write to that table directly?**

Give a concrete scenario, not a general principle.

> *Your answer:*
The `Game` entity should only be modified by the `game-service`.

For example, if the `activity-service` could directly write to the `games` table, it could accidentally insert invalid or incomplete game data. A bug in another service might overwrite a game's title or delete important information without the game-service knowing about it.

This would create inconsistent data and make debugging much harder because multiple services would be changing the same table independently.

By keeping ownership inside the game-service, all validation and business rules stay centralized in one place.

---

## 3. The tradeoff

You now have models, schemas, a repository, a service, and routes — five layers for what is essentially a CRUD service.

**For a system this small, what is the cost of all this structure?**

And at what point does the complexity start to pay off? Where is the tipping point?

> *Your answer:*
The `Game` entity should only be modified by the `game-service`.

For example, if the `activity-service` could directly write to the `games` table, it could accidentally insert invalid or incomplete game data. A bug in another service might overwrite a game's title or delete important information without the game-service knowing about it.

This would create inconsistent data and make debugging much harder because multiple services would be changing the same table independently.

By keeping ownership inside the game-service, all validation and business rules stay centralized in one place.

---

*Keep this file. You will refer back to it during the oral presentation.*
