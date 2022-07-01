import type { NextApiRequest, NextApiResponse } from "next";
import { checkInputs, makeResponse } from "../../../Back-End/helpers/functions";
import ChatUserLinks from "../../../Back-End/models/ChatUserLinks";
import Messages from "../../../Back-End/models/Messages";
import { ResponseData } from "../../../Back-End/types/ActionRecordTypes";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
): Promise<void> {
  let result: ResponseData;
  try {
    switch (request.method.toUpperCase()) {
      case "POST":
        result = await add(request.body);
        break;
      case "PATCH":
        result = await update(request.body);
        break;
      default:
        throw new Error("Wrong Method!!");
    }
    result = makeResponse(result);
  } catch (err) {
    result = makeResponse(err.message, "error");
  }

  response.status(200).json(result);
}

async function add(data): Promise<ResponseData> {
  let checker = checkInputs(
    ["userId", "chat_id", "text", "type", "reply_id"],
    data
  );
  if (!checker.status) throw new Error(checker.missings);
  let { userId, chat_id, text, type, reply_id } = checker.data;

  let m = new Messages();

  await m.insert({
    chat_id,
    sender_id: userId,
    text,
    type,
    reply_id,
  });
  return makeResponse();
}

async function update(data): Promise<ResponseData> {
  let checker = checkInputs(["userId", "chat_id", "message_id"], req.body);
  if (!checker.status) throw new Error(checker.missings);
  let { userId, chat_id, message_id } = checker.data;

  let cul = new ChatUserLinks();

  await cul.update(
    {
      last_message_saw: message_id,
    },
    `user_id/=/${userId}&&chat_id/=/${chat_id}`
  );

  return makeResponse();
}
