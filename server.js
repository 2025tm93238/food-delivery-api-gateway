require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;
const SERVICE_NAME = process.env.SERVICE_NAME || "unknown-service";

app.listen(PORT, () => {
  console.log(`${SERVICE_NAME} running on port ${PORT}`);
});