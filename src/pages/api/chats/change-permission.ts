import type { NextApiRequest, NextApiResponse } from "next";
import { checkInputs, makeResponse } from "../../../Back-End/helpers/functions";
import ChatUserLinks from "../../../Back-End/models/ChatUserLinks";
import { ResponseData } from "../../../Back-End/types/ActionRecordTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  let result: ResponseData;
  try {
    let checker = checkInputs(["userId", "chat_id", "user_type"], req.body);
    if (!checker.status) throw new Error(checker.missings);
    let { userId, chat_id, user_type } = checker.data;

    let cul = new ChatUserLinks();

    await cul.update(
      {
        user_type,
      },
      `user_id/=/${userId}&&chat_id/=/${chat_id}`
    );

    result = makeResponse();
  } catch (err) {
    result = makeResponse(err.message, "error")
  }
  res.status(200).json(result);
}
