const express = require("express");
const cors = require("cors");
require("dotenv").config();

const tasksRouter = require("./routes/tasks");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRouter);

app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API работает"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});