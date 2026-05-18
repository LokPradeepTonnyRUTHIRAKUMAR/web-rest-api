# Module 1 — Service Decomposition

**Duration**: 2h in class
**Branch to submit**: `module-01/<team-name>`

---

## Objective

Before writing a single line of code, you need to design the system on paper. Every decision you make here: where to draw service boundaries, who owns what data, how services talk to each other, is hard to reverse once you start coding.

This module is about slowing down and thinking like an architect, not a developer.

Read these two documents before doing anything else:

- `docs/domain.md` — what GameHub is and who uses it
- `docs/specs.md` — the tech stack and key architectural decisions

> The CTO has already laid out the `services/` folder structure. Use it as a starting point, but your job is to **justify** why each folder deserves to be its own service — not just accept it.

---

## Task 1 — Identify bounded contexts _(~40 min)_

A bounded context is a part of the system that has a clear responsibility and owns its data exclusively. No other service should reach into its database.

For each bounded context you identify, fill in the table:
| Bounded Context | Responsibilities                                                            | Owned Entities                                        | Team           |
| --------------- | --------------------------------------------------------------------------- | ----------------------------------------------------- | -------------- |
| Identity        | Registration, login, authentication, session management, profile management | User, Session, Credential, Profile                    | Platform       |
| Game Library    | Stores and manages the catalog of games available on the platform           | Game, Genre, PlatformTag, GameMetadata                | Content        |
| Activity        | Tracks user actions and gameplay-related activity for feeds/recent actions  | ActivityEvent, UserActivityFeed                       | Social         |
| Notification    | Sends emails, push notifications, and real-time alerts                      | Notification, DeliveryAttempt, NotificationPreference | Communications |
| Logging         | Centralized audit and system logging with compliance support                | AuditLog, SystemLog, ConsentRecordReference           | Infrastructure |
| Review & Rating | Allows users to review and rate games                                       | Review, Rating, ReviewVote                            | Community      |
| Recommendation  | Generates personalized game recommendations                                 | RecommendationModel, RecommendationResult             | Data/ML        |

There is no single correct answer: what matters is that you can justify each row.

---

## Task 2 — Define service contracts _(~30 min)_

For each pair of services that need to communicate, define:

- **Direction**: A → B
- **Trigger**: what causes the call
- **Protocol**: REST or event (async)
- **Payload**: key fields exchanged

Example:

## 1. activity-service → logging-service

- **Trigger:** User performs an action
- **Protocol:** RabbitMQ event (async)
- **Reason:** Logging should not block user requests

### Payload

```json
{
  "activity_id": "a123",
  "user_id": "u42",
  "action": "GAME_LAUNCHED",
  "game_id": "g99",
  "timestamp": "2026-05-15T10:21:00Z"
}
```

---

## 2. review-service → notification-service

- **Trigger:** A review receives a reply or like
- **Protocol:** RabbitMQ event (async)
- **Reason:** Notifications can be processed asynchronously

### Payload

```json
{
  "notification_type": "REVIEW_REPLY",
  "recipient_user_id": "u42",
  "review_id": "r88",
  "actor_user_id": "u15",
  "timestamp": "2026-05-15T10:25:00Z"
}
```

---

## 3. gateway → identity-service

- **Trigger:** User login request
- **Protocol:** REST (sync)
- **Reason:** Authentication requires an immediate response

### Request Payload

```json
{
  "email": "user@example.com",
  "password": "hashed-password"
}
```

### Response Payload

```json
{
  "access_token": "jwt-token",
  "user_id": "u42",
  "expires_in": 3600
}
```

---

## 4. activity-service → recommendation-service

- **Trigger:** User activity generated
- **Protocol:** RabbitMQ event (async)
- **Reason:** Recommendations can update eventually

### Payload

```json
{
  "user_id": "u42",
  "activity_type": "PLAYED_GAME",
  "game_id": "g99",
  "playtime_minutes": 120
}
```

---

## 5. gateway → game-library-service

- **Trigger:** Client requests game details
- **Protocol:** REST (sync)

### Request Payload

```json
{
  "game_id": "g99"
}
```

### Response Payload

```json
{
  "title": "CyberQuest",
  "genre": "RPG",
  "rating": 4.7
}
```
Focus on the flows that feel non-obvious. You do not need to document every possible pair.

---

## Task 3 — Draw the service map _(~20 min)_

Draw the full GameHub service map:

- One box per service
- Arrows between services (solid line = synchronous REST, dashed line = async event)
- Label each arrow with its protocol
- One box at the top labelled **gateway** — all client requests enter here, no client ever calls a service directly

This can be a sketch on paper, a whiteboard photo, or ASCII art committed to your branch.
```
                         +------------------+
                         |     gateway      |
                         +------------------+
                            |    |     |
               REST         |    |     | REST
                            v    v     v

                  +-------------+    +----------------+
                  |  identity   |    |  game-library  |
                  +-------------+    +----------------+
                           |                 |
                           |                 |
                           |                 |
                           v                 v

                    +-------------------------------+
                    |        activity-service       |
                    +-------------------------------+
                        - - - - | - - - - - -
                     RabbitMQ   |    RabbitMQ
                                |
                                v

                     +-------------------+
                     | recommendation    |
                     +-------------------+

                        - - - - - - - - ->
                          RabbitMQ

                     +-------------------+
                     | notification      |
                     +-------------------+

                        - - - - - - - - ->
                          RabbitMQ

                     +-------------------+
                     | logging-service   |
                     +-------------------+

                  +-------------------+
                  | review-service    |
                  +-------------------+
                           |
                           | RabbitMQ
                           - - - - - ->
                                notification-service
```
---

## Discussion _(~15 min)_

Three questions to discuss as a team before you leave:

1. Why does `notification-service` use Node.js instead of Python like the rest? What does that tell you about microservices and technology choices?
2. What is the risk of `activity-service` calling `logging-service` synchronously — why might you prefer an async event instead?
3. Why does `logging-service` need a GDPR consent check before recording any activity?

You do not need to write these answers down — they are warm-up for your REFLECTION.md.

---

## Minimum to submit this branch

- [ ] Bounded context table filled in (at least 4 services justified)
- [ ] At least 3 service contracts defined
- [ ] Service map committed (sketch, photo, or ASCII)
- [ ] `REFLECTION.md` completed and committed

The map does not need to be perfect. It needs to be yours.
