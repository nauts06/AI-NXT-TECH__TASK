require("dotenv").config();

const dbConnectionTs = require("./config/DB");
const cors = require("cors");
const routes = require("./routes/routes");
const express = require("express");
const app = express();
const helmet = require("helmet");
const path = require("path");

// database start
dbConnectionTs();

//middleware
app.use(express.json());
//  app.use(cors())

app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));
//routes
app.use("/api", routes);
app.get("/*", (req: any, res: { sendFile: (arg0: any) => void }) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT || 4000, () => {
  console.log("server is running on ", process.env.PORT);
});
