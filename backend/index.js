const express = require("express");
const cors = require("cors");
const { connection } = require("./connection");
const { userRouter } = require("./routes/user.routes");
const { taskRouter } = require("./routes/task.routes");
const { projectRouter } = require("./routes/project.routes");

require("dotenv").config();

const PORT = process.env.PORT || 7070;

const app = express();

app.use(express.json());
app.use(cors());


app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/projects", projectRouter);

app.get("/", (req, res) => {
  try {
    res.status(200).send("Server is running");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is connected to PORT: ${PORT}`);
  } catch (error) {
    console.log("Index Error", error.message);
  }
});

