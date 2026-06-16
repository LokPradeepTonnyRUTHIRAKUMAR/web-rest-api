# Module 3 — Reflection

**Team name**: Tonny  
**Branch**: `module-03/tonny`  
**Submitted**: before Module 4 lesson

---

Answer the three questions below. There are no right or wrong answers — we are looking for your reasoning, not a textbook definition. A few honest sentences are worth more than a long generic paragraph.

---

## 1. The "why"

All client requests now go through the gateway. No client ever calls a service directly.

**Why does that single entry point exist? What would the client's life look like without it?**

Think about what the client would need to know and manage if it talked to each service on its own port.

> *Your answer:*

A gateway provides a single entry point for all client requests and hides the complexity of the microservice architecture. Without a gateway, the client would need to know the address and port of every service, handle routing logic, and update configurations whenever a service changes. By using a gateway, the client only communicates with one endpoint while the gateway forwards requests to the appropriate service.

---

## 2. Your choice

The activity-service makes two outbound calls: one to validate the user (with retry logic), one to fetch game data (with a null fallback if it fails).

**Why are these two calls treated differently? Why does one retry and the other just give up gracefully?**

What is the consequence for the user in each case if the downstream service is unavailable?

> *Your answer:*

The two outbound calls are treated differently because they have different levels of importance. User validation is a critical operation because an activity should not be created for a user that does not exist. Therefore, the service retries the request and fails if the user-service is unavailable. On the other hand, fetching game information is only used to enrich the response. If the game-service is unavailable, the activity can still be created successfully, so the service gracefully returns a null value for the game data. This ensures that the main functionality remains available even when a non-essential service fails.

---

## 3. The tradeoff

Every time a client creates an activity, three services are involved synchronously. They all have to be running, healthy, and fast.

**What is the systemic risk of chaining synchronous calls like this?**

What happens to the user experience if the slowest service in the chain takes 3 seconds to respond?

> *Your answer:*

The main risk of chaining synchronous service calls is that the entire request depends on the availability and performance of every service involved. If one service is slow, unavailable, or overloaded, the whole request becomes slower or may fail completely. For example, if the slowest service takes 3 seconds to respond, the user must wait at least 3 seconds before receiving a response, even if all other services respond immediately. As more synchronous dependencies are added, system latency increases and the user experience becomes less reliable.

---

*Keep this file. You will refer back to it during the oral presentation.*