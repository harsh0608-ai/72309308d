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