import { connect, connection } from "mongoose";

export function createConnection(): void {
  try {
    connect("mongodb://localhost:27017/survey_db", {
      // @ts-expect-error
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.once("open", () => console.log("database rondando"));
  } catch (error) {
    console.log(error);
  }
}

createConnection();
