# Module 01 Reflection

## 1. Why does microservice architecture exist?

Microservices allow applications to scale independently and improve maintainability by splitting functionality into smaller services.

## 2. What design decision did we make?

We separated authentication into its own service to isolate security responsibilities from business logic.

## 3. What tradeoff exists?

Microservices increase operational complexity because services communicate over networks.

## 4. Why use an API Gateway?

The API Gateway acts as the single entry point and handles authentication, routing, and request validation.

## 5. Why use asynchronous messaging?

Async messaging improves fault tolerance and prevents services from blocking each other.