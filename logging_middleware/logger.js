const LOG_API = "http://4.224.186.213/evaluation-service/logs";

export const Log = async (stack, level, packageName, message) => {
  try {
    await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "json",
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message,
      }),
    });
  } catch (error) {
    console.log("Log error", error);
  }
};