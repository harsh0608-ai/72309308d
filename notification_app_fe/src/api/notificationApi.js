const BASE_URL =
  "http://4.224.186.213/evaluation-service/notifications";

const dummyNotifications = [
  {
    id: 1,
    type: "Placement",
    message:
      "Microsoft placement registration started",
    priorityScore: 95,
  },
  {
    id: 2,
    type: "Event",
    message:
      "Annual technical event starts tomorrow",
    priorityScore: 60,
  },
  {
    id: 3,
    type: "Result",
    message:
      "Semester result declared for third year",
    priorityScore: 80,
  },
];

export const fetchNotifications = async () => {
  try {
    const response = await fetch(
  `${BASE_URL}?page=1&limit=10`
);

    const data = await response.json();

    if (
      data.notifications &&
      data.notifications.length > 0
    ) {
      return data.notifications;
    }

    return dummyNotifications;
  } catch (error) {
    console.log(error);

    return dummyNotifications;
  }
};