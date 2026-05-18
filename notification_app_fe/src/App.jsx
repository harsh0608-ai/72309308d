import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  MenuItem,
  Select,
  Box,
} from "@mui/material";

import NotificationCard from "./components/NotificationCard";

import { fetchNotifications } from "./api/notificationApi";

import { Log } from "./utils/logger";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      await Log(
        "frontend",
        "info",
        "api",
        "Fetching notifications"
      );

      const data = await fetchNotifications();

      const sorted = data.sort(
        (a, b) =>
          b.priorityScore - a.priorityScore
      );

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