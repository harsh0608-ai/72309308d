# Campus Notification System

A simple campus notification system built using React and Material UI.

## Features

- View notifications
- Filter notifications
- Priority based notification sorting
- Responsive UI
- Logging middleware integration

## Tech Stack

- React
- JavaScript
- Material UI

## Folder Structure

- logging_middleware
- notification_app_fe
- notification_system_design.md

## Run Frontend

```bash
npm install
npm run dev
```

## Logging Middleware

Reusable logging middleware is used for frontend logging.

Example:

```js
Log("frontend", "info", "component", "notification rendered");
```

## Backend

Simple Express backend server included for full stack structure.

Run backend:

```bash
cd notification_app_be
npm install
npm start
```