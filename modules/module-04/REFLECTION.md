# Module 4 — Reflection

**Team name**: Tonny
**Branch**: `module-04/tonny`
**Submitted**: before Module 5 lesson

---

## 1. The "why"

In Module 3, services called each other directly over HTTP. Now activity-service drops a message into a broker and moves on — it never waits for a reply.

**What does the activity-service gain by not waiting? And what does the notification-service gain by consuming at its own pace?**

> *Your answer:*

Activity-service gains better performance and reliability because it does not have to wait for notification-service to respond. The activity can be saved immediately even if notification-service is slow or temporarily unavailable. Notification-service gains flexibility because it can process messages at its own pace. If many activities are created at once, messages stay in RabbitMQ until the service is ready to consume them, preventing lost requests and reducing pressure on the system.

---

## 2. Your choice

In Module 3 you already knew how to call another service directly over HTTP — you did it for user validation and game enrichment.

**Why not use the same approach for notifications? What does introducing a broker give you that a direct HTTP call doesn't?**

> *Your answer:*

Notifications are not critical to creating an activity, so there is no need to block the request while waiting for another service. Using RabbitMQ decouples the services and allows activity-service to continue working even if notification-service is down. A broker also provides message persistence and buffering, so messages can be processed later instead of being lost when a service crashes or becomes overloaded.

---

## 3. The tradeoff

With synchronous REST, you get an immediate answer: success or failure. With async messaging, the activity is saved and the message is sent — but you have no idea if the notification was ever delivered.

**How would a user know if their notification was never sent? How would you know as a developer?**

> *Your answer:*

A user may not know immediately that a notification was not delivered because the activity request still succeeds. As a developer, I would need to monitor RabbitMQ queues, application logs, and metrics to detect failed or unprocessed messages. Compared to synchronous communication, asynchronous messaging reduces visibility because there is no immediate confirmation that the notification reached the final destination.

---

*Keep this file. You will refer back to it during the oral presentation.*