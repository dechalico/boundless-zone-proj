import dotenv from "dotenv";
dotenv.config();
import server from "./server";

import { initDatabase } from "./repository/database";

let app: any = undefined;

initDatabase()
  .then(() => {
    const port = process.env.PORT;
    app = server.listen(port, () =>
      console.log(`Server running at port ${port}`)
    );
  })
  .catch((err) => console.log("an error occured", err));

const exitHandler = () => {
  if (app !== undefined) {
    app.close(() => {
      console.log("server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  console.error("An unexpected error occured", error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
