import type { NextApiRequest, NextApiResponse } from "next";
import { checkInputs, makeResponse } from "../../../Back-End/helpers/functions";
import ChatUserLinks from "../../../Back-End/models/ChatUserLinks";
import { ResponseData } from "../../../Back-End/types/ActionRecordTypes";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
): Promise<void> {
  let result: ResponseData;
  try {
    switch (request.method.toUpperCase()) {
      case "POST":
        result = await add(request.query);
        break;
      case "DELETE":
        result = await remove(request.body);
        break;
      default:
        throw new Error("Wrong Method!!");
    }
  } catch (err) {
    result = makeResponse(err.message, "error");
  }

  response.status(200).json(result);
}

async function add(data): Promise<ResponseData> {
  let checker = checkInputs(["user_id", "chat_id"], data);
  if (!checker.status) throw new Error(checker.missings);
  let { user_id, chat_id } = checker.data;

  let cul = new ChatUserLinks();

  await cul.insert({
    chat_id,
    user_id: user_id,
    type: 1,
  });

  return makeResponse();
}

async function remove(data): Promise<ResponseData> {
  let checker = checkInputs(["user_id", "chat_id"], req.body);
  if (!checker.status) throw new Error(checker.missings);
  let { user_id, chat_id } = checker.data;

  let cul = new ChatUserLinks();

  await cul.update({ type: 2 }, `user_id/=/${user_id}&&chat_id/=/${chat_id}`);

  return makeResponse();
}
