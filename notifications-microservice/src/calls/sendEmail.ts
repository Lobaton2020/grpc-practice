import axios from "axios";
import { EmailPayload } from "../interfaces/common";

function insertDb(data: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
      console.log("Inserted on DB: ", data.login);
    }, 500);
  });
}

export default async (call: any, callback: any) => {
  const { data } = await axios.get("https://api.github.com/users/Lobaton2020");
  await insertDb(data);
  console.log(call.request as EmailPayload);
  console.log("Loggind sending EMAIL notification to : " + call.request.email);
  callback(null, {
    is_error: false,
  });
};
