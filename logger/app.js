const { Log } = require("./logger");

async function main() {
  await Log("backend", "error", "handler", "received string, expected bool");
  await Log("backend", "fatal", "db", "Critical database connection failure.");
  await Log("frontend", "info", "api", "Fetched user profile successfully.");
}

main();
