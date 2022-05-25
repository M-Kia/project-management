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
    let { userId, chat_id, user_type } = req.body;
    if (!(userId, chat_id, user_type)) throw new Error("missing argument");

    let cul = new Chat_user_links();

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
