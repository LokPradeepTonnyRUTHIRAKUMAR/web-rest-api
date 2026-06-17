# Module 5 — Reflection

**Team name**: _______________
**Branch**: `module-05/<team-name>`
**Submitted**: before Module 6 lesson

---

Answer the three questions below. There are no right or wrong answers — we are looking for your reasoning, not a textbook definition. A few honest sentences are worth more than a long generic paragraph.

---

## 1. The "why"

The game-service now has two models for the same data: SQLite for writes, Redis for reads. They store the same games in two different shapes.

**Why go through the trouble of maintaining two representations of the same data?**

Think about what kind of queries each model is optimised for, and what would happen if you tried to use the write model for high-traffic read operations.

> *Your answer:*
>
> Maintaining two representations of the same data allows each model to be optimized for a different purpose. SQLite is the write model and stores the complete, authoritative data with consistency guarantees, while Redis is the read model optimized for fast lookups and high read traffic.
>
> If we used only the write model for every read request, the database could become a bottleneck when many users request the same information. By storing a simplified projection in Redis, we can serve read requests much faster and reduce the load on the primary database.

---

## 2. Your choice

The logging-service checks GDPR consent before recording any activity. If a user has not opted in, the log is silently dropped.

**What does this consent check force you to accept about your data?** It is incomplete by design — some activities will never be recorded.

From a system design perspective: where is the right place to enforce this rule — in the logging-service, in the activity-service, or at the gateway? Why?

> *Your answer:*
>
> The consent check means accepting that the data is intentionally incomplete. Some user activities will never be stored because users have chosen not to allow logging. This prioritizes privacy and legal compliance over collecting complete analytics.
>
> The logging-service is the best place to enforce this rule because it owns the logging data and GDPR responsibilities. If the rule were implemented in activity-service or the gateway, another service could accidentally bypass it. Keeping the consent check inside logging-service ensures that all log entries follow the same policy.

---

## 3. The tradeoff

With CQRS, your write model and read model can drift out of sync — a game is updated in SQLite but the Redis projection still shows the old data.

**In what scenario does this inconsistency matter to the user? In what scenario is it completely acceptable?**

Is there a class of applications where eventual consistency is never acceptable? What are they?

> *Your answer:*
>
> This inconsistency matters when users expect to see the most recent information immediately. For example, if a game's title is updated in SQLite but Redis still contains the old title, users may temporarily see outdated information.
>
> In many applications this delay is acceptable, such as activity feeds, recommendations, analytics dashboards, or cached content where being slightly behind is not critical.
>
> Eventual consistency is usually not acceptable in systems involving financial transactions, banking, payment processing, stock trading, or medical records, where users must always see the latest accurate data and inconsistencies could have serious consequences.

---

*Keep this file. You will refer back to it during the oral presentation.*
