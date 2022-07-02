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

  let cul = new ChatUserLinks();

  await cul.update(
    {
      user_type,
    },
    `user_id/=/${userId}&&chat_id/=/${chat_id}`
  );

  return makeResponse();
}
