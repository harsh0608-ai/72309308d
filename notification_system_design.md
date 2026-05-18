# Stage 1

## Notification System REST API Design

The campus notification platform is designed to provide real-time notifications to students regarding placements, events and results.

The system supports:

- Fetching notifications
- Marking notifications as read
- Filtering notifications
- Priority notifications
- Real-time updates

---

# Base URL

```http
/api/v1
```

---

# 1. Get All Notifications

## Endpoint

```http
GET /notifications
```

## Query Parameters

| Parameter | Type | Description |
|----------|------|-------------|
| page | number | Current page number |
| limit | number | Number of notifications per page |
| notification_type | string | Filter by type |

## Request Headers

```json
{
  "Authorization": "Bearer token"
}
```

## Response

```json
{
  "success": true,
  "notifications": [
    {
      "id": "101",
      "type": "Placement",
      "message": "Company hiring update",
      "isRead": false,
      "createdAt": "2026-04-22T17:51:30Z"
    }
  ],
  "page": 1,
  "limit": 10
}
```

---

# 2. Get Priority Notifications

## Endpoint

```http
GET /notifications/priority
```

## Query Parameters

| Parameter | Type | Description |
|----------|------|-------------|
| limit | number | Top priority notifications count |

## Response

```json
{
  "success": true,
  "notifications": [
    {
      "id": "201",
      "type": "Placement",
      "message": "Microsoft hiring drive",
      "priorityScore": 95
    }
  ]
}
```

---

# 3. Mark Notification as Read

## Endpoint

```http
PATCH /notifications/:id/read
```

## Response

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

# 4. Delete Notification

## Endpoint

```http
DELETE /notifications/:id
```

## Response

```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```

---

# Notification Object Structure

```json
{
  "id": "string",
  "type": "Event | Result | Placement",
  "message": "string",
  "isRead": false,
  "createdAt": "timestamp"
}
```

---

# Real-Time Notification Mechanism

The system uses WebSocket based real-time communication for instantly delivering notifications to connected students.

Workflow:

1. Student logs into the application
2. Frontend establishes WebSocket connection
3. New notifications are pushed instantly
4. UI updates without page refresh

---

# Error Response Format

```json
{
  "success": false,
  "message": "Something went wrong"
}
```
---

# Stage 2

## Database Schema Design

The notification system stores notification details, student information and notification read status.

The schema is designed in a simple and scalable way for handling campus notifications.

---

# 1. Students Collection

```json
{
  "_id": "ObjectId",
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "department": "Computer Engineering",
  "year": 3
}
```

---

# 2. Notifications Collection

```json
{
  "_id": "ObjectId",
  "title": "Placement Drive",
  "message": "Company registration started",
  "type": "Placement",
  "priorityScore": 90,
  "createdAt": "timestamp"
}
```

---

# 3. Notification Status Collection

```json
{
  "_id": "ObjectId",
  "studentId": "ObjectId",
  "notificationId": "ObjectId",
  "isRead": false,
  "readAt": "timestamp"
}
```

---

# Relationships

- One student can receive many notifications
- One notification can be received by many students
- Notification status tracks whether a student has read a notification

---

# Scaling Considerations

## 1. Indexing

Indexes can be added on:

- notification type
- createdAt
- studentId

This improves filtering and searching performance.

---

## 2. Pagination

Pagination is used in APIs to avoid loading all notifications at once.

Example:

```http
GET /notifications?page=1&limit=10
```

---

## 3. Caching

Frequently accessed notifications can be cached to reduce database load.

---

## 4. Horizontal Scaling

The backend server can be scaled using multiple instances with load balancing.

---

# Data Consistency

The system maintains consistency by storing notification status separately for each student.

This allows proper tracking of read and unread notifications.

---

# Stage 3

## Low Level Design

The notification system follows a modular architecture where each component has a separate responsibility.

This improves maintainability and readability of the codebase.

---

# Backend Components

## 1. Route Layer

The route layer handles incoming API requests and forwards them to controllers.

Example routes:

```http
GET /notifications
PATCH /notifications/:id/read
DELETE /notifications/:id
```

---

## 2. Controller Layer

The controller processes request and response handling.

Responsibilities:

- Validate request data
- Call service functions
- Return API response

---

## 3. Service Layer

The service layer contains business logic.

Responsibilities:

- Filter notifications
- Sort priority notifications
- Manage notification status

---

## 4. Database Layer

The database layer interacts with MongoDB collections.

Responsibilities:

- Store notifications
- Store read status
- Fetch filtered data

---

# Frontend Components

## 1. Notification List Component

Displays all notifications in card format.

Features:

- Read/unread status
- Notification type
- Timestamp

---

## 2. Filter Component

Allows filtering notifications by category.

Example filters:

- Placement
- Events
- Results

---

## 3. Priority Notification Section

Displays high priority notifications separately.

---

# Logging Middleware

A reusable logging middleware is used throughout the application.

Purpose:

- Track API activity
- Track frontend events
- Capture errors

Example:

```js
Log("frontend", "info", "component", "notification rendered");
```

---

# Error Handling

The application handles errors using try-catch blocks and centralized logging.

Example scenarios:

- Failed API calls
- Invalid requests
- Server errors

---

# Future Improvements

- Push notifications
- Email notifications
- Role-based access
- Notification scheduling

---

# Stage 4

## Frontend Design

The frontend application is built using React and Material UI.

The UI is designed to be simple, responsive and easy to use for students.

---

# Main Pages

## 1. Home Page

The home page displays all notifications.

Features:

- Notification cards
- Read and unread indication
- Filter options
- Priority notifications section

---

# Component Structure

## NotificationCard Component

Displays:

- Notification title
- Message
- Type
- Time
- Read status

---

## FilterBar Component

Used for filtering notifications based on category.

Available filters:

- Placement
- Event
- Result

---

## PrioritySection Component

Displays important notifications separately.

High priority notifications are shown at the top.

---

# State Management

React useState and useEffect hooks are used for managing application state.

State examples:

- Notifications data
- Filter selection
- Loading state

---

# API Integration

Frontend fetches notification data using REST APIs.

Example:

```js
fetch("/notifications")
```

---

# Responsive Design

The UI supports:

- Desktop view
- Tablet view
- Mobile view

Material UI responsive grid system is used for layout handling.

---

# User Flow

1. User opens application
2. Notifications are fetched from API
3. Notifications are displayed on screen
4. User can filter notifications
5. User can mark notifications as read

---

# Error Handling

Frontend handles:

- API failure
- Empty notification list
- Loading state

Error messages are shown using alerts or snackbar components.

---

# Logging Integration

Frontend events are logged using reusable logging middleware.

Example events:

- Component render
- API request failure
- Filter selection

---

# Stage 5

## Priority Notification Logic

The system identifies important notifications using a priority score.

Notifications with higher scores are displayed first in the application.

---

# Priority Factors

The priority score is calculated using different factors:

| Factor | Description |
|------|-------------|
| Notification Type | Placement notifications get higher priority |
| Recency | Latest notifications are prioritized |
| Urgency | Deadline based notifications are ranked higher |

---

# Example Priority Scores

| Notification Type | Score |
|------|------|
| Placement | 90 |
| Result | 70 |
| Event | 50 |

---

# Algorithm Approach

The system follows these steps:

1. Fetch all notifications
2. Assign priority score
3. Sort notifications in descending order
4. Display top priority notifications first

---

# Example Pseudocode

```js
for each notification:
    calculate priorityScore

sort notifications by priorityScore descending
```

---

# Time Complexity

| Operation | Complexity |
|------|------|
| Assign Priority | O(n) |
| Sorting | O(n log n) |

---

# Real-Time Notification Handling

When a new notification arrives:

1. Notification is added to list
2. Priority score is calculated
3. Notifications are re-sorted
4. UI updates automatically

---

# Advantages

- Important notifications are easily visible
- Students receive urgent updates quickly
- Better user experience

---

# Future Improvements

- AI based ranking
- Personalized notification priority
- User preference based sorting