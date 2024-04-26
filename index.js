const express = require("express");

const app = express();

app.get("/health", (req, res) => {
  res.status(200).send({ message: "auth service" });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
