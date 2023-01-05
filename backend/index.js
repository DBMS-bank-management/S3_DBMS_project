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
require("./src/routes/activityLogRoutes")(app);
require("./src/routes/transmodeRoutes")(app);
require("./src/routes/accountRoutes")(app);
require("./src/routes/installmentRoutes")(app);
require("./src/routes/transactionRoutes")(app);
require("./src/routes/normalApplicationRoutes")(app);
require("./src/routes/onlineApplicationRoutes")(app);
require("./src/routes/LoanRoutes")(app);
require("./src/routes/FDRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
