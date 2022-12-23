const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Successfully started" });
});

require("./src/routes/userRoutes")(app);
require("./src/routes/authenticationRoutes")(app);
require("./src/routes/employeeRoutes")(app);
require("./src/routes/branchRoutes")(app);
require("./src/routes/customerRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
