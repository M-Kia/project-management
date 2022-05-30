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
    let checker = checkInputs(["userId", "chat_id"], req.body);
    if (!checker.status) throw new Error(checker.missings);
    let { userId, chat_id } = checker.data;

    let cul = new ChatUserLinks();

    await cul.insert({
      chat_id,
      user_id: userId,
      type: 1,
    });

    result = {
      status: true,
      result: {
        data: req.body,
      },
    };
  } catch (err) {
    result = { status: false, errors: [err.message] };
  }
  res.status(200).json(result);
}
