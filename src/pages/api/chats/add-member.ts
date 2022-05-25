import type { NextApiRequest, NextApiResponse } from "next";
import Chat_user_links from "../../../Back-End/models/Chat_user_links";

type Data = {
  status: boolean;
  errors?: string[];
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let { userId, chat_id } = req.body;
    if (!(userId, chat_id)) throw new Error("missing argument");

    let cul = new Chat_user_links();

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
