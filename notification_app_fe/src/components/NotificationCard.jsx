import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

const NotificationCard = ({
  notification,
  isRead,
  onClick,
}) => {
  return (
    <Card
        onClick={onClick}
      sx={{
        marginBottom: 2,
        borderRadius: 3,
        cursor: "pointer",
            backgroundColor: isRead
            ? "#f3f3f3"
            : "#ffffff",
            borderLeft: isRead
            ? "4px solid gray"
            : "4px solid #1976d2",
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {notification.type}
        </Typography>

        <Typography sx={{ marginTop: 1,fontWeight: isRead
  ? "normal"
  : "bold", }}>
          {notification.message}
        </Typography>

        <Chip
          label={
            notification.priorityScore >= 80
              ? "High Priority"
              : "Normal"
          }
          color={
            notification.priorityScore >= 80
              ? "error"
              : "primary"
          }
          sx={{ marginTop: 2 }}
        />
      </CardContent>
    </Card>
  );
};

export default NotificationCard;