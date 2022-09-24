import type { NextApiRequest, NextApiResponse } from "next";
import { checkInputs, makeResponse } from "../../../Back-End/helpers/functions";
import Encryption from "../../../Back-End/library/Encryption";
import ChatUserLinks from "../../../Back-End/models/ChatUserLinks";
import { ResponseData } from "../../../Back-End/types/ActionRecordTypes";

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

async function update(data): Promise<ResponseData> {
  let checker = checkInputs(["userId", "chat_id", "user_type"], data);
  if (!checker.status) throw new Error(checker.missings);
  let { userId, chat_id, user_type } = checker.data;

  userId = Encryption.decode(userId);
  if (userId.length !== 2) {
    throw new Error("Wrong User ID!");
  }
  userId = userId[1];

  chat_id = Encryption.decode(chat_id);
  if (chat_id.length !== 2) {
    throw new Error("Wrong User ID!");
  }
  chat_id = chat_id[1];

  let cul = new ChatUserLinks();

  await cul.update(
    {
      user_type,
    },
    `user_id/=/${userId}&&chat_id/=/${chat_id}`
  );

  return makeResponse();
}
