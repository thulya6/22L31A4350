const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMmwzMWE0MzUwQHZpZ25hbmlpdC5lZHUuaW4iLCJleHAiOjE3NTY5Njc2MjEsImlhdCI6MTc1Njk2NjcyMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImI1NmU3NDViLTg2ZmQtNDUzNy1hOWM3LWU4Y2YwYWQwNzAxMiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InRodWx5YXNyaSBzYXJhdmFrb3RhIiwic3ViIjoiODM4OTAwNDgtNTU3Mi00OWZlLThiOGMtYmYxOWE5ZGI3ODhjIn0sImVtYWlsIjoiMjJsMzFhNDM1MEB2aWduYW5paXQuZWR1LmluIiwibmFtZSI6InRodWx5YXNyaSBzYXJhdmFrb3RhIiwicm9sbE5vIjoiMjJsMzFhNDM1MCIsImFjY2Vzc0NvZGUiOiJZenVKZVUiLCJjbGllbnRJRCI6IjgzODkwMDQ4LTU1NzItNDlmZS04YjhjLWJmMTlhOWRiNzg4YyIsImNsaWVudFNlY3JldCI6IkVoQ25UdGRUSGRHdkJZZk4ifQ.jKEtmN5Cg2cOKHjAXcGO-kXK6PG4VSZsz0BA-CfjD5M";

const LOG_API = "http://20.244.56.144/evaluation-service/logs";
export async function Log(stack, level, pkg, message) {
  try {
    const res = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
  } catch (err) {
    console.error("log failed", err);
  }
}

export const flog = (level, pkg, msg) => Log("frontend", level, pkg, msg);
