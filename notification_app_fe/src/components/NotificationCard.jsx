import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

const NotificationCard = ({ notification }) => {
  return (
    <Card
      sx={{
        marginBottom: 2,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {notification.type}
        </Typography>

        <Typography sx={{ marginTop: 1 }}>
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