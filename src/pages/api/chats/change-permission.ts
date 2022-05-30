import type { NextApiRequest, NextApiResponse } from "next";
import { checkInputs } from "../../../Back-End/helpers/functions";
import ChatUserLinks from "../../../Back-End/models/ChatUserLinks";

type Data = {
  status: boolean;
  errors?: string[];
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let result: Data;
  try {
    let checker = checkInputs(["userId", "chat_id", "user_type"], req.body);;
    if (!checker.status) throw new Error(checker.missings);
    let { userId, chat_id, user_type } = checker.data;

    let cul = new ChatUserLinks();

    await cul.update(
      {
        user_type,
      },
      `user_id/=/${userId}&&chat_id/=/${chat_id}`
    );

    result = {
      status: true,
      result: {
        answer,
        data: req.body,
      },
    };
  } catch (err) {
    result = { status: false, errors: [err.message] };
  }
  res.status(200).json(result);
}
