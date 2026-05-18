import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import {sortNotificationsByPriority,} from "./utils/priorityUtils";

import NotificationCard from "./components/NotificationCard";

import { fetchNotifications } from "./api/notificationApi";

import { Log } from "../../logging_middleware/logger";

import { generateToken } from "../../logging_middleware/generateTokens";

import { setAuthToken } from "../../logging_middleware/auth";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
  initializeApp();
  }, []);

  const initializeApp = async () => {
    const token = await generateToken();

    setAuthToken(token);

    loadNotifications();
  };

  const loadNotifications = async () => {
    try {
      await Log(
        "frontend",
        "info",
        "api",
        "Fetching notifications"
      );

      const data = await fetchNotifications();

      const sorted =
  sortNotificationsByPriority(data);

      setNotifications(sorted);

      await Log(
        "frontend",
        "info",
        "component",
        "Notifications loaded successfully"
      );
    } catch (error) {
      await Log(
        "frontend",
        "error",
        "api",
        "Failed to fetch notifications"
      );
    }
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter(
          (item) => item.type === filter
        );

  const [readNotifications, setReadNotifications] =
  useState([]);

  const handleRead = async (id) => {
  if (!readNotifications.includes(id)) {
    setReadNotifications([
      ...readNotifications,
      id,
    ]);

    await Log(
      "frontend",
      "info",
      "component",
      "Notification marked as read"
    );
  }
};
  return (
  <Box
    sx={{
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      paddingTop: 2,
    }}
  >
    <Container
      maxWidth="md"
      sx={{ marginTop: 4 }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          fontWeight: "bold",
        }}
      >
        Campus Notifications
      </Typography>

      <Typography
        variant="body2"
        sx={{
            marginBottom: 2,
            color: "#666",
          }}
        >
          Stay updated with placement drives,
          results and campus events.
      </Typography>

      <Box sx={{ marginBottom: 3 }}>
        <Select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          size="small"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Placement">
            Placement
          </MenuItem>
          <MenuItem value="Event">
            Event
          </MenuItem>
          <MenuItem value="Result">
            Result
          </MenuItem>
        </Select>
      </Box>

      {filteredNotifications.length > 0 ? (
      filteredNotifications.map((notification) => (
      <NotificationCard
        key={notification.id}
        notification={notification}
        isRead={readNotifications.includes(
          notification.id
        )}
        onClick={() =>
          handleRead(notification.id)
        }
      />
      ))
      ) : (
    <Typography>
      No notifications found
    </Typography>
      )}
    </Container>
  </Box>
  );
}

export default App;