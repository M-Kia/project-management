import type { NextApiRequest, NextApiResponse } from "next";
import {
  checkInputs,
  makeResponse,
  getData,
} from "../../Back-End/helpers/functions";
import Users from "../../Back-End/models/Users";
import { ResponseData } from "../../Back-End/types/ActionRecordTypes";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
): Promise<void> {
  let result: ResponseData;
  try {
    switch (request.method.toUpperCase()) {
      case "PATCH":
        result = await update(request.query);
        break;
      default:
        throw new Error("Wrong Method!!");
    }
  } catch (err) {
    result = makeResponse(err.message, "error");
  }

  response.status(200).json(result);
}

function update(data) {
  let checker = checkInputs(["userId"], data);
  if (!checker.status) throw new Error(checker.missings);
  let { userId } = checker.data;

  let ul = new Users();

  let d = getData(data, "Users");

  try {
    delete d.id;
  } catch (err) {}

  await ul.update(d, `id/=/${userId}`);

  return makeResponse();
}
