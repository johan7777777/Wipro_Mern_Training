const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/auth", require("../sprint1/routes/authRoutes"));
apiRouter.use("/search", require("../sprint2/routes/searchRoutes"));
apiRouter.use("/questions", require("../sprint2/routes/questionRoutes"));
apiRouter.use("/answers", require("../sprint2/routes/answerRoutes"));
apiRouter.use("/comments", require("../sprint2/routes/commentRoutes"));

module.exports = apiRouter;
