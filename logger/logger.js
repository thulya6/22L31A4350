const axios = require("axios");

const LOG_API = "http://20.244.56.144/evaluation-service/logs";

// Paste your actual access token here
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMmwzMWE0MzUwQHZpZ25hbmlpdC5lZHUuaW4iLCJleHAiOjE3NTY5NjYxNjQsImlhdCI6MTc1Njk2NTI2NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImFkOGVlNDI0LTNhNTEtNDY3Yy1iYzZlLTQ2ZDFiZjQwNDIzNiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InRodWx5YXNyaSBzYXJhdmFrb3RhIiwic3ViIjoiODM4OTAwNDgtNTU3Mi00OWZlLThiOGMtYmYxOWE5ZGI3ODhjIn0sImVtYWlsIjoiMjJsMzFhNDM1MEB2aWduYW5paXQuZWR1LmluIiwibmFtZSI6InRodWx5YXNyaSBzYXJhdmFrb3RhIiwicm9sbE5vIjoiMjJsMzFhNDM1MCIsImFjY2Vzc0NvZGUiOiJZenVKZVUiLCJjbGllbnRJRCI6IjgzODkwMDQ4LTU1NzItNDlmZS04YjhjLWJmMTlhOWRiNzg4YyIsImNsaWVudFNlY3JldCI6IkVoQ25UdGRUSGRHdkJZZk4ifQ.R8na78UrW7ueHqg0MWMcCiHZG_FbrDeAU5LVsQlrMpk";

/**
 * Reusable log function
 * @param {string} stack   - "backend" | "frontend"
 * @param {string} level   - "debug" | "info" | "warn" | "error" | "fatal"
 * @param {string} pkg     - e.g., "db", "handler", "api"
 * @param {string} message - Log message
 */
async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Log sent:", response.data);
  } catch (error) {
    console.error("❌ Failed to send log:", error.response?.data || error.message);
  }
}

module.exports = { Log };
