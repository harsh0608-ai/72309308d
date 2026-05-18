export const getPriorityScore = (
  type
) => {
  if (type === "Placement") {
    return 90;
  }

  if (type === "Result") {
    return 70;
  }

  return 50;
};

export const sortNotificationsByPriority = (
  notifications
) => {
  return notifications.sort(
    (a, b) =>
      getPriorityScore(b.type) -
      getPriorityScore(a.type)
  );
};