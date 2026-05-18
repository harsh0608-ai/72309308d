export const generateToken = async () => {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/auth",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: import.meta.env.VITE_EMAIL,
          name: import.meta.env.VITE_NAME,
          rollNo: import.meta.env.VITE_ROLLNO,
          accessCode:
            import.meta.env.VITE_ACCESS_CODE,
          clientID:
            import.meta.env.VITE_CLIENT_ID,
          clientSecret:
            import.meta.env.VITE_CLIENT_SECRET,
        }),
      }
    );

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.log(error);
  }
};